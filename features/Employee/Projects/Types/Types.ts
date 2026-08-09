// Employee interface
interface Employee {
  country: string;
  creationDate: string; // ISO date string
  email: string;
}

// Task interface
export interface Task {
  id: number;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done"; // enum-like constraint
  creationDate: string;
  modificationDate: string;
  employee: Employee; // nested employee object
}

// Project interface
export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  task: Task[]; // array of tasks
}
export interface ProjectResponse {
  pageNumber: number;
  pageSize: number;
  data: Project[];
  totalNumberOfPages:number,
  totalNumberOfRecords:number
}
export interface ProjectQuery {
  pageNumber?: number;
  pageSize?: number;
  title?: string;
}