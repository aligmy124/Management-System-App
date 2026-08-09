export interface Manager {
  id: number;
  userName: string;
  imagePath: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string | null;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  manager: Manager;
}

export interface Employee {
  id: number;
  userName: string;
  imagePath: string | null;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string | null;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}

export enum TaskStatus {
  ToDo = "ToDo",
  InProgress = "InProgress",
  Done = "Done",
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  creationDate: string;
  modificationDate: string;
  project: Project;
  employee: Employee;
}

export interface TaskResponse {
  pageNumber: number;
  pageSize: number;
  data: Task[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}

export interface TaskQuery {
  pageNumber?: number;
  pageSize?: number;
  title?: string;
  status?: TaskStatus;
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}

export interface UpdateTaskActionResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export interface CreateTask {
  title: string;
  description: string;
  employeeId: number;
  projectId: number;
}

export interface TaskUpdateRequest {
  title: string;
  description: string;
  employeeId: number;
  projectId?: number; // optional if reassignment is allowed
}
