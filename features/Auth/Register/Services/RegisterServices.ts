import { apiFetch } from "@/lib/fetch";
import { RegisterResponse } from "../Types/Types";

export async function registerServices(
  formData: FormData
): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>("/Users/Register", {
    method: "POST",
    body: formData,
  });
}