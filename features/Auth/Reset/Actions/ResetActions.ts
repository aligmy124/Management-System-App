"use server";
import { ResetFormData, ResetSchema } from "../Schema/Schema";
import { ApiError } from "@/lib/api-error";
import { resetServices } from "../Services/Resetservices";

export async function resetAction(data: ResetFormData) {
  const result = ResetSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: "Invalid form data",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await resetServices(result.data);
    return {
      success: true,
      message: "Password reset successfully. Please login with your new password.",
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