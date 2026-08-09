import { z } from "zod";

// ==================== ZOD SCHEMAS ====================

export const CreateUserSchema = z.object({
  userName: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  
  country: z.string()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must be less than 100 characters"),
  
  phoneNumber: z.string()
    .min(5, "Phone number must be at least 5 characters")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
  
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const UpdateUserSchema = z.object({
  userName: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .optional(),
  
  email: z.string()
    .email("Please enter a valid email address")
    .optional(),
  
  country: z.string()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must be less than 100 characters")
    .optional(),
  
  phoneNumber: z.string()
    .min(5, "Phone number must be at least 5 characters")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
    .optional(),
  
  isActivated: z.boolean().optional(),
});

// ==================== TYPES ====================

export type CreateUserFormData = z.infer<typeof CreateUserSchema>;
export type UpdateUserFormData = z.infer<typeof UpdateUserSchema>;

export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}

export interface UserResponse {
  pageNumber: number;
  pageSize: number;
  data: User[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}

export interface UserQuery {
  userName?: string;
  email?: string;
  country?: string;
  groups?: number[];
  pageNumber?: number;
  pageSize?: number;
}

export enum UserGroup {
  Manager = 1,
  Employee = 2,
}