// Task interface
export interface Task {
  id: number;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done"; // enum-like constraint
  creationDate: string; // ISO date string
  modificationDate: string; // ISO date string
}

// Project interface
export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string; // ISO date string
  modificationDate: string; // ISO date string
  task: Task[]; // array of tasks
}

// Response wrapper interface
export interface ProjectResponse {
  pageNumber: number;
  pageSize: number;
  data: Project[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}
// create project
export interface ProjectCreation{
  title:string,
  description:string
}

export interface ProjectQuery {
  pageNumber?: number;
  pageSize?: number;
  title?: string;
}

export interface ResponseCreateProduct {
  id: number;
  title: string;
  description: string;
  manager: {
    id: number;
  };
  creationDate: string;       // ISO 8601 date string
  modificationDate: string;   // ISO 8601 date string
}
