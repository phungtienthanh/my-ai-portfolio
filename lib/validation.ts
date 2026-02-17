import { z } from "zod";
import { validationMessages } from "@/lib/messages";

// Contact Form Validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, validationMessages.name.minLength)
    .max(50, validationMessages.name.maxLength),
  email: z.string().email(validationMessages.email.invalid),
  message: z
    .string()
    // .min(10, validationMessages.message.minLength)
    .max(1000, validationMessages.message.maxLength),
  phone: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
