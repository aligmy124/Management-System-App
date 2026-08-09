// // Actions/DeleteUserAction.ts
// "use server";

// import { revalidatePath } from "next/cache";
// import { ApiError } from "@/lib/api-error";
// import { deleteUser } from "../services/UsersServices";

// export async function deleteUserAction(
//   id: number,
//   prevState: any
// ) {
//   try {
//     await deleteUser(id);

//     revalidatePath("/dashboard/users");

//     return {
//       success: true,
//       message: "User deleted successfully",
//     };
//   } catch (error) {
//     if (error instanceof ApiError && error.status === 403) {
//       return {
//         success: false,
//         message: "Access denied. You don't have permission to delete users.",
//       };
//     }

//     if (error instanceof ApiError && error.status === 404) {
//       return {
//         success: false,
//         message: "User not found",
//       };
//     }

//     return {
//       success: false,
//       message: "Something went wrong while deleting the user",
//     };
//   }
// }