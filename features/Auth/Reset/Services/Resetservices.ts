import { apiFetch } from "@/lib/fetch";
import { ResetRequest, ResetResponse } from "../Types/Types";

export async function resetServices(data: ResetRequest): Promise<ResetResponse>{
  return apiFetch<ResetResponse>("/Users/Reset", {
    method: "POST",
    body: JSON.stringify(data),
  });
}