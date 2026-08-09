interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
}

type Status = "ToDo" | "InProgress" | "Done";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  creationDate: string;
  modificationDate: string;
  project: Project;
}

interface Employee {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  isActivated: boolean;
  task: Task[]; 
}

export interface UsersResponse {
  pageNumber: number;
  pageSize: number; 
  data: Employee[]; 
}
