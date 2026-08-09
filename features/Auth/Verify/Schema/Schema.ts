import * as z from "zod";

export const VerifySchema=z.object({
    email:z.string().nonempty("Email is required").email("Invalid Email Address "),
    code: z.string().nonempty("Code is required"),
});
export type VerifyFormData=z.infer<typeof VerifySchema>