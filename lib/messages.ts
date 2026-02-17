 /**
 * ⚡ CENTRALIZED MESSAGE MANAGEMENT
 * Tất cả messages, validation strings, email templates đều nằm ở đây
 * Import từ file này ở mọi nơi cần dùng
 */

// ============================================================================
// 📋 VALIDATION MESSAGES (dùng cho client + Zod schema)
// ============================================================================
export const validationMessages = {
  name: {
    required: "Vui lòng nhập họ tên",
    minLength: "Họ tên phải có ít nhất 2 ký tự",
    maxLength: "Họ tên không được vượt quá 50 ký tự",
    invalidChars: "Họ tên chỉ được chứa chữ cái, khoảng trắng và dấu chấm",
  },
  email: {
    required: "Vui lòng nhập email",
    invalid: "Email không hợp lệ",
  },
  subject: {
    required: "Vui lòng nhập tiêu đề",
    minLength: "Tiêu đề phải có ít nhất 5 ký tự",
    maxLength: "Tiêu đề không được vượt quá 100 ký tự",
  },
  message: {
    required: "Vui lòng nhập tin nhắn",
    minLength: "Tin nhắn phải có ít nhất 10 ký tự",
    maxLength: "Tin nhắn không được vượt quá 5000 ký tự",
  },
} as const;

// ============================================================================
// 📬 EMAIL TEMPLATES & SUBJECTS
// ============================================================================
export const emailTemplates = {
  contactNotification: (name: string, email: string, message: string, phone?: string) => ({
    subject: `📧 [ADMIN NOTIFICATION] Tin nhắn mới từ ${name}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
            <strong style="color: #856404;">⚠️ ADMIN NOTIFICATION</strong>
            <p style="color: #856404; margin: 5px 0 0 0; font-size: 12px;">Email này được gửi tới quản trị viên (bạn)</p>
          </div>
          
          <h2 style="color: #333; margin-top: 0;">Bạn có tin nhắn mới từ Portfolio Contact Form!</h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>Từ:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Điện thoại:</strong> ${phone}</p>` : ""}
          </div>
          
          <p><strong style="color: #333;">Nội dung tin nhắn:</strong></p>
          <div style="background-color: #fff; border-left: 4px solid #007bff; padding: 15px; margin: 15px 0;">
            <p style="white-space: pre-wrap; margin: 0;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px; text-align: center;">
            💡 Hãy trả lời khách hàng sớm nhất có thể!<br />
            Email này từ Portfolio Contact Form
          </p>
        </body>
      </html>
    `,
  }),

  contactConfirmation: (name: string) => ({
    subject: `✅ [GUEST CONFIRMATION] Chúng tôi đã nhận tin nhắn của bạn`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #d4edda; border: 1px solid #28a745; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
            <strong style="color: #155724;">✅ GUEST CONFIRMATION EMAIL</strong>
            <p style="color: #155724; margin: 5px 0 0 0; font-size: 12px;">Email này được gửi tới khách hàng (không phải admin)</p>
          </div>
          
          <h2 style="color: #333; margin-top: 0;">Cảm ơn bạn đã liên hệ với tôi!</h2>
          
          <p>Xin chào <strong>${name}</strong>,</p>
          
          <p>Tôi đã nhận được tin nhắn của bạn và sẽ cố gắng phản hồi sớm nhất có thể (thường trong vòng 1-2 ngày làm việc).</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; color: #666;"><strong>Thông tin liên hệ của bạn:</strong></p>
            <p style="margin: 5px 0;"><small>Nếu cần, tôi sẽ liên lạc với bạn qua email này.</small></p>
          </div>
          
          <p>Cảm ơn bạn vì sự quan tâm!</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center;">
            Portfolio Contact Form - https://phungtienthanh.com
          </p>
        </body>
      </html>
    `,
  }),
} as const;

// ============================================================================
// 🎯 FORM & TOAST MESSAGES (Frontend UI)
// ============================================================================
export const formMessages = {
  // Form submission messages
  submitting: "Đang gửi...",
  success: "Tin nhắn đã được gửi thành công!",
  error: "Có lỗi xảy ra. Vui lòng thử lại.",
  validationError: "Vui lòng kiểm tra lại các trường thông tin",
  scrollToError: "Bạn có lỗi, vui lòng cuộn lên để xem",
} as const;

// ============================================================================
// 🌐 API RESPONSE MESSAGES (Backend)
// ============================================================================
export const apiMessages = {
  // Success responses
  contactSubmitSuccess: "Message sent successfully",
  
  // Error responses
  invalidJson: "Invalid JSON format",
  validationFailed: "Validation failed",
  emailTemplateFailed: "Failed to generate email template",
  emailSendFailed: "Failed to send message. Please try again.",
  serverError: "Internal server error",
  unauthorized: "Unauthorized",
  notFound: "Resource not found",
} as const;

// ============================================================================
// 🔍 HELPER: Get validation message by field & error type
// ============================================================================
export const getValidationMessage = (
  field: keyof typeof validationMessages,
  errorType: string
): string => {
  const fieldMessages = validationMessages[field] as Record<string, string>;
  return fieldMessages[errorType] || fieldMessages.required || "Invalid input";
};
