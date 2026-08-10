"use server";
import { UpdateTaskSchema, UpdateTaskFormData   } from "../UpdateSchema/Schema";
import { ApiError } from "@/lib/api-error";
import { updateTaskService } from "../Services/TasksServices";
import { revalidatePath } from "next/cache";

export async function updateTaskAction(data: UpdateTaskFormData , id: number) {
  const result = UpdateTaskSchema .safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: "Invalid form data",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await updateTaskService(result.data, id);
    revalidatePath("/dashboard/tasks");
    return {
      success: true,
      message: "Task updated successfully",
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