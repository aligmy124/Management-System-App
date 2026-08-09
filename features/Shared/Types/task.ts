import { Employee } from "./employee";
import { Project } from "./project";

export type TaskStatus = "ToDo" | "InProgress" | "Done";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  creationDate: string;
  modificationDate: string;
  project: Project | null;
  employee: Employee;
}