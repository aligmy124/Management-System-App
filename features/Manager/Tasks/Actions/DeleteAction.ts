"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api-error";
import { deleteTaskServices } from "../Services/TasksServices";

export async function deleteTask(
  id: number,
  prevState: any,
) {
  try {
    const result=await deleteTaskServices(id);

    revalidatePath("/dashboard/tasks");

    return {
      success: true,
      message: "Project deleted successfully",
    };

  } catch (error) {
    if (error instanceof ApiError && error.status === 403) {
      return {
        success: false,
        message: "Access denied",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}