// // Actions/EditUserAction.ts
// "use server";

// import { revalidatePath } from "next/cache";
// import { ApiError } from "@/lib/api-error";
// import { UserSchema } from "../Types/Types";
// import { updateUserProfile } from "../services/UsersServices";

// export async function editUserAction(prevState: any, formData: FormData) {
//   try {
//     const userName = formData.get("userName") as string;
//     const email = formData.get("email") as string;
//     const country = formData.get("country") as string || undefined;
//     const phoneNumber = formData.get("phoneNumber") as string || undefined;
//     const profileImage = formData.get("profileImage") as File | null;
//     const confirmPassword = formData.get("confirmPassword") as string || undefined;

//     const validationResult = UserSchema.safeParse({
//       userName,
//       email,
//       country,
//       phoneNumber,
//       profileImage: profileImage || undefined,
//       confirmPassword,
//     });

//     if (!validationResult.success) {
//       return {
//         success: false,
//         message: "Invalid form data",
//         fieldErrors: validationResult.error.flatten().fieldErrors,
//       };
//     }

//     if (!profileImage || profileImage.size === 0) {
//       formData.delete("profileImage");
//     }

//     if (!confirmPassword) {
//       formData.delete("confirmPassword");
//     }

//     const result = await updateUserProfile(formData);

//     revalidatePath("/dashboard/users");
//     revalidatePath("/dashboard/profile");

//     return {
//       success: true,
//       message: "User updated successfully",
//       data: result,
//     };
//   } catch (error) {
//     if (error instanceof ApiError) {
//       return {
//         success: false,
//         message: error.message,
//         fieldErrors: error.fieldErrors,
//       };
//     }
//     return {
//       success: false,
//       message: "Unexpected error occurred",
//     };
//   }
// }