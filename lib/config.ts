/**
 * SIMPLIFIED ENVIRONMENT CONFIGURATION
 * For Contact Form API only (Phase 2A)
 */

// ============================================================================
// ENVIRONMENT VARIABLES
// ============================================================================
export const config = {
  // Email service (Contact form)
  resendApiKey: process.env.RESEND_API_KEY,
  adminEmail: process.env.ADMIN_EMAIL,
  emailFrom: process.env.NEXT_PUBLIC_EMAIL_FROM || "noreply@resend.dev",

  // API
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",

  // Rate limiting (requests per minute)
  rateLimits: {
    contactForm: parseInt(process.env.RATE_LIMIT_CONTACT_FORM || "5"),
    generalApi: parseInt(process.env.RATE_LIMIT_API_GENERAL || "60"),
  },

  // CORS
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"],

  // Environment flags
  isDevelopment: process.env.NODE_ENV !== "production",
  isProduction: process.env.NODE_ENV === "production",
} as const;

// ============================================================================
// TYPE SAFETY - Export config type
// ============================================================================
export type Config = typeof config;
