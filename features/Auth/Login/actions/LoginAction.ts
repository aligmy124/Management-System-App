"use server"
import { LoginFormData, LoginSchema } from "../schema/Schema";
import { ApiError } from "@/lib/api-error";
import { setToken } from "@/lib/cookies";
import {loginServices} from "../services/LoginServices"
export async function loginAction(data: LoginFormData) {
  // ✅ Validate input
  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message:"Invalid form data"
    };
  }

  try {
  const res=await loginServices(result.data);
  await setToken(res.token);
  return {
    success: true,
  };
} catch (error) {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 404:
        return {
          success: false,
          message: "Invalid email or password",
        };

      case 401:
        return {
          success: false,
          message: "Unauthorized",
        };

      default:
        return {
          success: false,
          message: "Something went wrong",
        };
    }
  }
  
  return {
    success: false,
    message: "Unexpected error occurred",
  };
}
}

