import {cookies} from "next/headers"

export async function getToken(){
    return (await cookies()).get("token")?.value;
}

export async function setToken(token: string) {
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}
export async function removeToken(){
  (await cookies()).delete("token");
}