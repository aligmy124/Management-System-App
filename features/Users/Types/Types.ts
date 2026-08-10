// ==================== TYPES ====================
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