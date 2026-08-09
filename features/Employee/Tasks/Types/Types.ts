export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
}

export interface Employee {
  id: number;
  userName: string;
  imagePath: string | null;
  email: string;
  country: string;
  phoneNumber: string;
  isVerified: boolean;
  isActivated: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  project: Project | null;
  employee: Employee;
}

export interface TaskResponse {
  pageNumber: number;
  pageSize: number;
  data: Task[];
}
export interface TaskQuery {
  pageNumber?: number;
  pageSize?: number;
  title?:string
  status?:string;
}
