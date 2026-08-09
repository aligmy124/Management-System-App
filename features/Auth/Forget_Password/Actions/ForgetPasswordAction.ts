"use server";
import { ForgetPasswordFormData, ForgetPasswordSchema } from "../Schema/Schema";
import { ApiError } from "@/lib/api-error";
import { forgetPasswordServices } from "../Services/ForgetPasswordServices";

export async function forgetPasswordAction(data: ForgetPasswordFormData) {
  const result = ForgetPasswordSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: "Invalid form data",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await forgetPasswordServices(result.data);
    return {
      success: true,
      message: "Password reset link has been sent to your email. Please check your inbox.",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        fieldErrors: error.fieldErrors,
      };
    }
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}