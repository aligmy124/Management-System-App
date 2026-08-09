import {apiFetch} from "@/lib/fetch"
import {UsersResponse} from "../Types/Types"
export async function usersManagerServices(){
    return apiFetch<UsersResponse>('/Users/Manager');
}