import { LoginRequset, LoginResponse } from "../types/type";
import {apiFetch} from "@/lib/fetch"
export async function loginServices(data: LoginRequset): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/Users/Login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}