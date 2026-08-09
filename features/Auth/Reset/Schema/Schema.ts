import * as z from "zod";

export const ResetSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  seed: z.string().nonempty("Verification seed is required").min(4, "Seed must be at least 6 characters"),
  password: z.string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().nonempty("Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ResetFormData = z.infer<typeof ResetSchema>;