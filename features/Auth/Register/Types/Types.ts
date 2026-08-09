export interface RegisterResponse {
  message: string;
}
export interface RegisterActionResult {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
}