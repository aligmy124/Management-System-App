import * as z from "zod";

export const TaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters"),

  employeeId: z
    .number()
    .int("Employee ID must be an integer")
    .positive("You must select a valid user"),

  projectId: z
    .number()
    .int("Project ID must be an integer")
    .positive("You must select a valid project")
    .optional(),
});

export type TaskFormData = z.infer<typeof TaskSchema>;