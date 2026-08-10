"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api-error";
import { CreateUserSchema } from "../Schema/Schema";
import { createUser } from "../Services/UsersServices";

export async function createUserAction(prevState: any, formData: FormData) {
  try {
    // Extract all fields from formData
    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const country = formData.get("country") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    // Validate with Zod (including confirmPassword)
    const validationResult = CreateUserSchema.safeParse({
      userName,
      email,
      password,
      confirmPassword,
      country,
      phoneNumber,
    });

    if (!validationResult.success) {
      return {
        success: false,
        message: "Invalid form data",
        fieldErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Create new FormData for API (only include fields that API expects)
    const apiFormData = new FormData();
    apiFormData.append("userName", userName);
    apiFormData.append("email", email);
    apiFormData.append("password", password);
    apiFormData.append("confirmPassword", confirmPassword);
    apiFormData.append("country", country);
    apiFormData.append("phoneNumber", phoneNumber);

    // Create user with FormData
    const result = await createUser(apiFormData);

    revalidatePath("/dashboard/users");

    return {
      success: true,
      message: "User created successfully",
      data: result,
    };
  } catch (error) {
    console.error("Create user error:", error);
    
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to create user",
        fieldErrors: error.fieldErrors,
      };
    }
    
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}