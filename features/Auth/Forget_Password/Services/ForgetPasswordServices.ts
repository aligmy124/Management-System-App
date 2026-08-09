import { apiFetch } from "@/lib/fetch";
import { ForgetPasswordRequest, ForgetPasswordResponse } from "../Types/Types";

export async function forgetPasswordServices(data: ForgetPasswordRequest): Promise<ForgetPasswordResponse> {
  return apiFetch<ForgetPasswordResponse>("/Users/Reset/Request", {
    method: "POST",
    body: JSON.stringify(data),
  });
}