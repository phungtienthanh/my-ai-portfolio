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
    subject: `[NEW MESSAGE] Liên hệ từ ${name}`,
    html: `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9fafb; padding: 30px; }
            .info-box { background: white; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0; border-radius: 4px; }
            .info-box strong { color: #667eea; }
            .message-box { background: white; border: 1px solid #e5e7eb; padding: 20px; margin: 20px 0; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; }
            .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 Tin nhắn mới từ Portfolio</h1>
            </div>
            <div class="content">
              <p>Bạn vừa nhận được một tin nhắn từ liên hệ form:</p>
              
              <div class="info-box">
                <p><strong>👤 Tên:</strong> ${name}</p>
                <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
                ${phone ? `<p><strong>📱 Điện thoại:</strong> ${phone}</p>` : ""}
              </div>
              
              <p><strong>💬 Nội dung tin nhắn:</strong></p>
              <div class="message-box">
${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                💡 Hãy phản hồi khách hàng sớm nhất có thể để tạo ấn tượng tốt.
              </p>
            </div>
            <div class="footer">
              <p>© 2026 Portfolio Contact Form • Automated Message</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  contactConfirmation: (name: string) => ({
    subject: `✅ Chúng tôi đã nhận được tin nhắn của bạn`,
    html: `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9fafb; padding: 30px; }
            .greeting { font-size: 16px; margin-bottom: 20px; }
            .highlight-box { background: white; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 4px; }
            .highlight-box h3 { color: #10b981; margin: 0 0 10px 0; }
            .footer { background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
            .social-links { margin: 20px 0; text-align: center; }
            .social-links a { margin: 0 10px; color: #667eea; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Cảm ơn bạn!</h1>
            </div>
            <div class="content">
              <p class="greeting">Xin chào <strong>${name}</strong>,</p>
              
              <p>Cảm ơn bạn rất nhiều vì đã gửi tin nhắn cho tôi. Tôi đã nhận được tin nhắn của bạn và sẽ đọc kỹ nó.</p>
              
              <div class="highlight-box">
                <h3>📋 Tiếp theo là gì?</h3>
                <p>Tôi sẽ phản hồi lại tin nhắn của bạn trong <strong>1-2 ngày làm việc</strong>. Nếu cần trả lời gấp, bạn có thể liên hệ trực tiếp với tôi qua các kênh khác.</p>
              </div>
              
              <p>Mình rất vui nhận được tin từ bạn và mong được trao đổi thêm!</p>
              
              <div class="social-links">
                <p style="margin-bottom: 10px; color: #6b7280;"><strong>Kết nối với tôi:</strong></p>
                <a href="https://github.com">GitHub</a>
                <a href="https://linkedin.com">LinkedIn</a>
                <a href="mailto:phungtienthanh2004@gmail.com">Email</a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 25px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                Trân trọng,<br>
                <strong>Phùng Tiến Thành</strong>
              </p>
            </div>
            <div class="footer">
              <p>© 2026 Portfolio • <a href="https://phungtienthanh.com" style="color: #667eea; text-decoration: none;">phungtienthanh.com</a></p>
            </div>
          </div>
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
