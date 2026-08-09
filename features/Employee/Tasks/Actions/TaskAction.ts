// Actions/TaskAction.ts
"use server";
import { ApiError } from "@/lib/api-error";
import { updateTaskStatusService } from "../Services/TasksServices";
import { revalidatePath } from "next/cache";

export interface UpdateTaskStatusActionResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export async function updateTaskStatusAction(
  taskId: number,
  status: string
): Promise<UpdateTaskStatusActionResponse> {
  try {
    // Validate inputs
    if (!taskId) {
      return {
        success: false,
        message: "Task ID is required",
      };
    }

    if (!status) {
      return {
        success: false,
        message: "Status is required",
      };
    }

    // Validate status
    const validStatuses = ["ToDo", "InProgress", "", "Done"];
    if (!validStatuses.includes(status)) {
      return {
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      };
    }

    // Call service
    const result = await updateTaskStatusService(taskId, { status });

    // Revalidate the tasks page to refresh data
    revalidatePath("/dashboard/tasks");
    revalidatePath("/dashboard/projects");

    return {
      success: true,
      data: result,
      message: `Task status updated to ${status} successfully`,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message || "Failed to update task status",
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}