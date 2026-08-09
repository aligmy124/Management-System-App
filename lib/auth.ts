import {getToken} from "./cookies"
import {currentUserServices} from "@/features/Auth/CurrentUser/Services/CurrentUserServices"

export async function getCurrentUser() {
  const token = await getToken();
  if (!token) {
    return null;
  }

  return await currentUserServices();
}


