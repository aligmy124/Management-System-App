import * as z from "zod";

export const RegisterSchema = z.object({
  userName: z.string().min(5, "Username must be at least 5 letters").max(8,"Username must be at most 8 letters"),
  email: z.string().nonempty("Email is required").email("Invalid Email Address"),
  country: z.string().min(2, "Country is required"),
  phoneNumber: z
      .string()
      .regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
  password: z.string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string().min(8, "Password must be at least 8 letters"),
  profileImage: z.instanceof(File).optional(),

}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;



