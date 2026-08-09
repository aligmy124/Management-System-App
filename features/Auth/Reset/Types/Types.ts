export interface ResetRequest {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}
export interface ResetResponse {
  message: string
}