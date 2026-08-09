// Actions/ToggleUserAction.ts
"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api-error";
import { toggleUserActivation } from "../Services/UsersServices";

export async function toggleUserAction(
  id: number,
  prevState: any
) {
  try {
    const result = await toggleUserActivation(id);

    revalidatePath("/dashboard/users");

    return {
      success: true,
      message: `User ${result.isActivated ? 'activated' : 'deactivated'} successfully`,
      data: result,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 403) {
      return {
        success: false,
        message: "Access denied. You don't have permission to manage users.",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}