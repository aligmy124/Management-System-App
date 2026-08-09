"use server";
import { RegisterSchema } from "../Schema/Schema";
import { registerServices } from "../Services/RegisterServices";
import { ApiError } from "@/lib/api-error";
// import { setToken } from "@/lib/cookies";
import { RegisterActionResult } from "../Types/Types";
export async function registerAction(
  formData: FormData,
): Promise<RegisterActionResult> {
  const data = Object.fromEntries(formData);

  const result = RegisterSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: "Invalid form data",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }
  try {
    const res = await registerServices(formData);
    //  await setToken(res.token);

    return {
      success: true,
      message: "Register successfully.",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        fieldErrors: Object.fromEntries(
          Object.entries(error.fieldErrors ?? {}).map(([key, value]) => [
            key,
            [value],
          ]),
        ),
      };
    }
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}
