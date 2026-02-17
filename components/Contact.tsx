"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, Loader2, AlertCircle, CheckCircle, X } from "lucide-react";
import { apiClient } from "@/lib/api";
import { validationMessages, formMessages } from "@/lib/messages";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface Toast {
  type: "success" | "error";
  message: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [charCount, setCharCount] = useState({ subject: 0, message: 0 });
  const abortControllerRef = useRef<AbortController | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Email validation regex (RFC 5322 simplified)
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    // Additional strict checks
    if (email.length > 254) return false;
    if (!regex.test(email)) return false;
    if (email.includes("..")) return false;
    if (email.startsWith(".") || email.endsWith(".")) return false;
    if (email.startsWith("-") || email.endsWith("-")) return false;
    const [localPart] = email.split("@");
    if (!localPart || localPart.length > 64) return false;
    if (localPart.startsWith(".") || localPart.endsWith(".")) return false;
    return true;
  };

  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return validationMessages.name.required;
        // // Check character validity FIRST (before length checks)
        // if (!/^[\p{L}\p{M}\s.]+$/u.test(value)) return validationMessages.name.invalidChars;
        if (value.trim().length < 2) return validationMessages.name.minLength;
        if (value.trim().length > 50) return validationMessages.name.maxLength;
        return undefined;

      case "email":
        if (!value.trim()) return validationMessages.email.required;
        if (!validateEmail(value)) return validationMessages.email.invalid;
        return undefined;

      case "subject":
        if (!value.trim()) return validationMessages.subject.required;
        // if (value.trim().length < 5) return validationMessages.subject.minLength;
        if (value.trim().length > 100) return validationMessages.subject.maxLength;
        return undefined;

      case "message":
        if (!value.trim()) return validationMessages.message.required;
        // if (value.trim().length < 10) return validationMessages.message.minLength;
        if (value.trim().length > 5000) return validationMessages.message.maxLength;
        return undefined;

      default:
        return undefined;
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof FormData] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change with real-time validation
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update character count for subject and message
    if (name === "subject" || name === "message") {
      setCharCount((prev) => ({ ...prev, [name]: value.length }));
    }

    // Real-time validation only for touched fields
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[name as keyof FormErrors] = error;
        } else {
          delete newErrors[name as keyof FormErrors];
        }
        return newErrors;
      });
    }
  };

  // Handle blur to mark field as touched and trim whitespace
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Trim value to prevent leading/trailing spaces being stored
    const trimmedValue = value.trim();
    
    // Update formData with trimmed value
    setFormData((prev) => ({ ...prev, [name]: trimmedValue }));
    
    // Update character count with trimmed value for subject and message
    if (name === "subject" || name === "message") {
      setCharCount((prev) => ({ ...prev, [name]: trimmedValue.length }));
    }
    
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate the field when it loses focus
    const error = validateField(name, trimmedValue);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[name as keyof FormErrors] = error;
      } else {
        delete newErrors[name as keyof FormErrors];
      }
      return newErrors;
    });
  };

  const formRef = useRef<HTMLFormElement>(null);

  // Toast auto-dismiss with cleanup and race condition prevention
  useEffect(() => {
    if (!toast) return;
    
    // Clear any existing timeout
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    
    // Set new timeout
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 4000);
    
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [toast]);

  // Show toast notification
  const showToast = (type: "success" | "error", message: string) => {
    // Clear any pending dismissal
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToast({ type, message });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    // Validate form
    if (!validateForm()) {
      showToast("error", formMessages.validationError);
      
      // Scroll to first error field
      setTimeout(() => {
        const firstErrorElement = formRef.current?.querySelector("[aria-invalid='true']");
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          (firstErrorElement as HTMLInputElement | HTMLTextAreaElement).focus();
        }
      }, 100);
      return;
    }

    setIsSubmitting(true);
    abortControllerRef.current = new AbortController();

    try {
      // Call the actual API
      const response = await apiClient.submitContactForm({
        name: formData.name,
        email: formData.email,
        message: `**Tiêu đề:** ${formData.subject}\n\n${formData.message}`,
        phone: "",
      });

      if (!response.success) {
        throw new Error(response.error || "Failed to submit form");
      }

      showToast("success", formMessages.success);

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      setCharCount({ subject: 0, message: 0 });
      setErrors({});
      setTouched({});
      formRef.current?.reset(); // Reset browser state
    } catch (error) {
      console.error("Submit error:", error);
      if (error instanceof Error) {
        if (error.message.includes("timeout") || error.message.includes("Request")) {
          showToast("error", "Yêu cầu hết thời gian. Vui lòng thử lại.");
        } else if (error.message.includes("validation")) {
          showToast("error", formMessages.validationError);
        } else {
          showToast("error", error.message || formMessages.error);
        }
      } else {
        showToast("error", formMessages.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject.trim() &&
    formData.message.trim();

  return (
    <section id="contact" className="py-40 scroll-mt-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        
        {/* Cột 1: Thông tin & Social Logos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter uppercase italic">
            Sẵn sàng <br /> kết nối?
          </h2>
          <p className="text-gray-500 mb-10 italic max-w-sm">
            Tôi luôn tìm kiếm những cơ hội đột phá trong lĩnh vực AI. Đừng ngần ngại liên hệ.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 text-gray-600 group">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                <Phone size={18} className="group-hover:text-emerald-600" />
              </div>
              <span className="font-mono font-bold text-sm">+84 389 589 068</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600 group">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                <MapPin size={18} className="group-hover:text-emerald-600" />
              </div>
              <span className="font-mono font-bold text-sm">Hà Nội, Việt Nam</span>
            </div>
          </div>

          <div className="flex gap-4">
            {[
              { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/phungtienthanh232/" },
              { icon: <Github size={20} />, href: "https://github.com/phungtienthanh" },
              { icon: <Mail size={20} />, href: "mailto:phungtienthanh2004@gmail.com" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-emerald-500/50 hover:text-emerald-600 hover:bg-emerald-500/5 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Cột 2: Form với Validation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-emerald-500/[0.02] border-2 border-gray-400 p-8 rounded-3xl"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Họ tên <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nhập họ tên của bạn"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={50}
                  disabled={isSubmitting}
                  aria-invalid={!!(errors.name && touched.name)}
                  aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                  className={`w-full bg-gray-100/5 border rounded-xl px-4 py-3 text-sm outline-none transition-all disabled:opacity-50 ${
                    errors.name && touched.name
                      ? "border-red-500/50 focus:border-red-500/70 bg-red-500/5"
                      : "border-gray-200 focus:border-emerald-500/50 focus:bg-emerald-500/5"
                  }`}
                />
                {errors.name && touched.name && (
                  <div id="name-error" className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={254}
                  disabled={isSubmitting}
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                  className={`w-full bg-gray-100/5 border rounded-xl px-4 py-3 text-sm outline-none transition-all disabled:opacity-50 ${
                    errors.email && touched.email
                      ? "border-red-500/50 focus:border-red-500/70 bg-red-500/5"
                      : "border-gray-200 focus:border-emerald-500/50 focus:bg-emerald-500/5"
                  }`}
                />
                {errors.email && touched.email && (
                  <div id="email-error" className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề <span className="text-red-400">*</span>
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="Nhập tiêu đề của bạn"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={100}
                disabled={isSubmitting}
                aria-invalid={!!(errors.subject && touched.subject)}
                aria-describedby={errors.subject && touched.subject ? "subject-error" : undefined}
                className={`w-full bg-gray-100/5 border rounded-xl px-4 py-3 text-sm outline-none transition-all disabled:opacity-50 ${
                  errors.subject && touched.subject
                    ? "border-red-500/50 focus:border-red-500/70 bg-red-500/5"
                    : "border-gray-200 focus:border-emerald-500/50 focus:bg-emerald-500/5"
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs text-gray-500">{charCount.subject}/100</div>
              </div>
              {errors.subject && touched.subject && (
                <div id="subject-error" className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{errors.subject}</span>
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Tin nhắn <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Nhập tin nhắn của bạn"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={5000}
                disabled={isSubmitting}
                aria-invalid={!!(errors.message && touched.message)}
                aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                className={`w-full bg-gray-100/5 border rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none disabled:opacity-50 ${
                    errors.message && touched.message
                      ? "border-red-500/50 focus:border-red-500/70 bg-red-500/5"
                      : "border-gray-200 focus:border-emerald-500/50 focus:bg-emerald-500/5"
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs text-gray-500">{charCount.message}/5000</div>
              </div>
              {errors.message && touched.message && (
                <div id="message-error" className="flex items-center gap-1 mt-1 text-red-400 text-sm">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{errors.message}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              aria-busy={isSubmitting}
              className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${
                isSubmitting || !isFormValid
                  ? "bg-blue-500/50 text-white/70 cursor-not-allowed shadow-lg shadow-blue-500/10"
                  : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                  <span className="text-sm">Gửi...</span>
                </>
              ) : (
                <span>Gửi tin nhắn</span>
              )}
            </button>
          </form>
        </motion.div>

      </div>

      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 100 }}
          className="fixed bottom-6 right-6 left-6 sm:right-6 sm:left-auto z-50 w-auto sm:max-w-sm"
        >
          <div
            className={`flex items-center gap-3 px-4 sm:px-6 py-4 rounded-xl backdrop-blur-md border ${
              toast.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle size={20} className="flex-shrink-0" />
            ) : (
              <AlertCircle size={20} className="flex-shrink-0" />
            )}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button
              onClick={() => {
                // Clear pending timeout to prevent race condition
                if (toastTimeoutRef.current) {
                  clearTimeout(toastTimeoutRef.current);
                  toastTimeoutRef.current = null;
                }
                setToast(null);
              }}
              className="ml-2 hover:opacity-70 transition-opacity flex-shrink-0"
              aria-label="Đóng thông báo"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};