"use server";
import { TaskSchema, TaskFormData } from "../Schema/Schema";
import { ApiError } from "@/lib/api-error";
import { updateTaskService } from "../Services/TasksServices";
import { revalidatePath } from "next/cache";

export async function updateTaskAction(data: TaskFormData, id: number) {
  const result = TaskSchema.safeParse(data);
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