// import { cache } from "react";
// import { getToken } from "./cookies";
// import { currentUserServices } from "@/features/Auth/CurrentUser/Services/CurrentUserServices";

// export const getCurrentUser = cache(async () => {
//     console.log("🔥 GET CURRENT USER");

//   const token = await getToken();

//   if (!token) {
//     console.log("NO TOKEN");
//     return null;
//   }

//   return currentUserServices();
// });

// export async function getUserRole() {
//   const token = await getToken();

//   if (!token) {
//     return null;
//   }

//   try {
//     const payload = JSON.parse(
//       Buffer.from(token.split(".")[1], "base64url").toString()
//     );

//     return payload.userGroup ?? null;
//   } catch {
//     return null;
//   }
// }

import { cache } from "react";
import { getToken } from "./cookies";
import { currentUserServices } from "@/features/Auth/CurrentUser/Services/CurrentUserServices";

export const getCurrentUser = cache(async () => {
  console.log("🔥 GET CURRENT USER");

  const token = await getToken();

  if (!token) {
    console.log("NO TOKEN");
    return null;
  }

  return currentUserServices();
});

export const getUserRole = cache(async () => {
  console.log("🔥 GET USER ROLE");

  const token = await getToken();

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString()
    );

    return payload.userGroup ?? null;
  } catch {
    return null;
  }
});