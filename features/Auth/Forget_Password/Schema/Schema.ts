import * as z from "zod";

export const ForgetPasswordSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
});

export type ForgetPasswordFormData = z.infer<typeof ForgetPasswordSchema>;