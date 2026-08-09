import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 letters"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
