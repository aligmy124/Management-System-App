import { apiFetch } from "@/lib/fetch"
import {VerifyRequset, VerifyResponse} from "../Types/Types"
export async function verifyServices(data:VerifyRequset):Promise<VerifyResponse>{
    return apiFetch<VerifyResponse>("/Users/verify",{
        method:"PUT",
         body: JSON.stringify(data), 
    })
}