"use server"
import {removeToken} from "@/lib/cookies"
export async function logOut(){
    return removeToken();
}