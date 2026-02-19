import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import {
  sendEmail,
  contactNotificationEmail,
  contactConfirmationEmail,
} from "@/lib/email";
import { config } from "@/lib/config";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

/**
 * Helper: Check if origin is allowed
 */
function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // Allow requests without origin (e.g., mobile apps)
  return config.allowedOrigins.includes(origin);
}

/**
 * Helper: Build CORS headers for allowed origin
 */
function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = isOriginAllowed(origin) ? origin || "*" : "";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

/**
 * Helper: Escape HTML to prevent XSS in emails
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Helper: Parse Zod validation errors into user-friendly format
 */
function parseValidationError(errorString: string): Record<string, string> {
  try {
    const parsed = JSON.parse(errorString.slice(errorString.indexOf("[")));
    const fieldErrors: Record<string, string> = {};
    
    parsed.forEach((err: any) => {
      const field = err.path?.[0] || "unknown";
      const message = err.message || "Invalid input";
      fieldErrors[field] = message;
    });
    
    return fieldErrors;
  } catch {
    return { message: "Validation failed. Please check your input." };
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  
  if (!isOriginAllowed(origin)) {
    return new NextResponse(null, { status: 403 });
  }
  
  return NextResponse.json({}, { headers: getCorsHeaders(origin) });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const clientIP = getClientIP(request.headers);
  const corsHeaders = getCorsHeaders(origin);

  try {
    // CORS Check
    if (!isOriginAllowed(origin)) {
      console.warn(`🚫 CORS rejected from origin: ${origin}`);
      return NextResponse.json(
        { success: false, error: "Origin not allowed" },
        { status: 403, headers: corsHeaders }
      );
    }

    // Rate Limit Check (5 requests per minute per IP)
    const rateLimitWindow = 60000; // 1 minute
    const maxRequests = config.rateLimits?.contactForm || 5;
    
    if (checkRateLimit(clientIP, maxRequests, rateLimitWindow)) {
      console.warn(`⚠️ Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429, headers: corsHeaders }
      );
    }

    // Validate environment
    if (!config.adminEmail || !config.gmailUser || !config.gmailAppPassword) {
      console.error("❌ Missing env vars: adminEmail, gmailUser, or gmailAppPassword");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500, headers: corsHeaders }
      );
    }

    const body = await request.json();

    // Validate data
    const validatedData = contactFormSchema.parse(body);

    // Escape HTML in message to prevent XSS
    const escapedMessage = escapeHtml(validatedData.message);

    // Send notification email to admin
    const adminNotification = contactNotificationEmail(
      validatedData.name,
      validatedData.email,
      escapedMessage,
      validatedData.phone
    );
    
    if (!adminNotification?.subject || !adminNotification?.html) {
      throw new Error("Failed to generate admin email template");
    }
    
    await sendEmail({
      to: config.adminEmail,
      subject: adminNotification.subject,
      html: adminNotification.html,
    });

    // Send confirmation email to guest
    const guestConfirmation = contactConfirmationEmail(validatedData.name);
    
    if (!guestConfirmation?.subject || !guestConfirmation?.html) {
      throw new Error("Failed to generate guest email template");
    }
    
    await sendEmail({
      to: validatedData.email,
      subject: guestConfirmation.subject,
      html: guestConfirmation.html,
    });

    console.log(`✅ Contact email sent successfully from ${clientIP}`);
    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error(`❌ Contact form error [${clientIP}]:`, error);

    const corsHeaders = getCorsHeaders(origin);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid request format. Please send valid JSON." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Handle Zod validation errors
    if (error instanceof Error && error.message.includes("[")) {
      const fieldErrors = parseValidationError(error.message);
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check your input.",
          details: fieldErrors,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Handle Gmail SMTP errors
    if (error instanceof Error) {
      const msg = error.message.toLowerCase();
      
      if (msg.includes("invalid login") || msg.includes("authentication failed") || msg.includes("invalid credentials")) {
        return NextResponse.json(
          {
            success: false,
            error: "Email service authentication error. Please contact the site owner.",
          },
          { status: 503, headers: corsHeaders }
        );
      }

      if (msg.includes("daily limit") || msg.includes("rate limit")) {
        return NextResponse.json(
          {
            success: false,
            error: "Email service has reached daily limit. Please try again tomorrow.",
          },
          { status: 503, headers: corsHeaders }
        );
      }

      if (msg.includes("invalid email") || msg.includes("invalid recipient")) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid recipient email address.",
          },
          { status: 400, headers: corsHeaders }
        );
      }
      
      if (msg.includes("too many requests") || msg.includes("econnrefused")) {
        return NextResponse.json(
          {
            success: false,
            error: "Email service is temporarily unavailable. Please try again later.",
          },
          { status: 429, headers: corsHeaders }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send email. Please try again in a moment.",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
