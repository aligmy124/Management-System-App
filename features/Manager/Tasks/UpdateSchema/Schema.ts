import { z } from "zod";

export const UpdateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),

  employeeId: z
    .number({
      error: "Employee is required",
    })
    .int("Employee ID must be an integer")
    .positive("Please select an employee"),
});

export type UpdateTaskFormData = z.infer<typeof UpdateTaskSchema>;