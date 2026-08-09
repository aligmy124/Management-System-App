"use server";

import { revalidatePath } from "next/cache";
import { ApiError } from "@/lib/api-error";
import { deleteProject } from "../services/ProjectsServices";

export async function deleteProjectAction(
  id: number,
  prevState: any,
) {
  try {
    await deleteProject(id);

    revalidatePath("/dashboard/projects");

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