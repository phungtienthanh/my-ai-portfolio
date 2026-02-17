import { Resend } from "resend";
import { emailTemplates } from "@/lib/messages";
import { config } from "@/lib/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(data: EmailData) {
  try {
    const result = await resend.emails.send({
      from: config.emailFrom,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      success: true,
      id: result.data?.id,
    };
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
}

// Email templates - centralized in lib/messages.ts
export const contactNotificationEmail = emailTemplates.contactNotification;
export const contactConfirmationEmail = emailTemplates.contactConfirmation;
