import nodemailer from "nodemailer";
import { emailTemplates } from "@/lib/messages";
import { config } from "@/lib/config";

// Initialize Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(data: EmailData) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error("Gmail credentials not configured");
    }

    const result = await transporter.sendMail({
      from: config.emailFrom,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });

    return {
      success: true,
      id: result.messageId,
    };
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
}

// Email templates - centralized in lib/messages.ts
export const contactNotificationEmail = emailTemplates.contactNotification;
export const contactConfirmationEmail = emailTemplates.contactConfirmation;
