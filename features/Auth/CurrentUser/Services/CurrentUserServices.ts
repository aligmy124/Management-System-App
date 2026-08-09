import {apiFetch} from "@/lib/fetch"
import type { CurrentUser } from "../Context/UserContext";
export async function currentUserServices(){
    return apiFetch<CurrentUser>("/Users/currentUser",{
        method:'GET'
    })
}