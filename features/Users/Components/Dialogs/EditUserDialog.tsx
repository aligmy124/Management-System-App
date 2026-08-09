// // components/Dialogs/EditUserDialog.tsx
// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { UserSchema, UserFormData } from "../../Types/Types";
// import { editUserAction } from "../../Actions/EditUserAction";
// import { User } from "../../Types/Types";
// import { toast } from "sonner";
// import { Loader2, Pencil, Camera, X } from "lucide-react";
// import { useActionState } from "react";

// interface Props {
//   user: User | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function EditUserDialog({ user, open, onOpenChange }: Props) {
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [state, action, isPending] = useActionState(editUserAction, null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//     reset,
//     setValue,
//   } = useForm<UserFormData>({
//     resolver: zodResolver(UserSchema),
//   });

//   useEffect(() => {
//     if (state?.success) {
//       toast.success(state.message || "User updated successfully");
//       onOpenChange(false);
//       reset();
//       setPreviewImage(null);
//     }
//     if (state?.success === false) {
//       toast.error(state.message || "Failed to update user");
//       if (state?.fieldErrors) {
//         Object.entries(state.fieldErrors).forEach(([field, messages]) => {
//           setError(field as keyof UserFormData, {
//             type: "manual",
//             message: messages?.[0],
//           });
//         });
//       }
//     }
//   }, [state, onOpenChange, reset, setError]);

//   useEffect(() => {
//     if (user && open) {
//       reset({
//         userName: user.userName,
//         email: user.email,
//         country: user.country || "",
//         phoneNumber: user.phoneNumber || "",
//       });
//       setPreviewImage(user.profileImage || null);
//     }
//   }, [user, open, reset]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setValue("profileImage", file);
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setPreviewImage(event.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setPreviewImage(null);
//     setValue("profileImage", undefined);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const onSubmit = async (data: UserFormData) => {
//     const formData = new FormData();
    
//     Object.entries(data).forEach(([key, value]) => {
//       if (value !== undefined && value !== null && key !== 'profileImage') {
//         formData.append(key, value as string);
//       }
//     });

//     if (data.profileImage && data.profileImage instanceof File) {
//       formData.append("profileImage", data.profileImage);
//     }

//     await action(formData);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
//         <form onSubmit={handleSubmit(onSubmit)} className="p-6">
//           <DialogHeader className="space-y-3">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
//                 <Pencil className="h-5 w-5 text-blue-600" />
//               </div>
//               <div>
//                 <DialogTitle className="text-xl font-bold">Edit User</DialogTitle>
//                 <DialogDescription className="text-sm text-muted-foreground">
//                   Update user information
//                 </DialogDescription>
//               </div>
//             </div>
//           </DialogHeader>

//           <div className="mt-4 space-y-4">
//             <div className="space-y-2">
//               <Label className="text-sm font-medium">Profile Image</Label>
//               <div className="flex items-center gap-4">
//                 <div className="relative">
//                   <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-[#EFF0F4] bg-[#F8F9FC]">
//                     {previewImage ? (
//                       <img
//                         src={previewImage}
//                         alt="Profile preview"
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#8E95A9]">
//                         {user?.userName?.charAt(0)?.toUpperCase() || "U"}
//                       </div>
//                     )}
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="absolute -bottom-1 -right-1 rounded-full bg-blue-600 p-1.5 text-white shadow-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <Camera size={16} />
//                   </button>
//                   {previewImage && user?.profileImage && (
//                     <button
//                       type="button"
//                       onClick={removeImage}
//                       className="absolute -top-1 -right-1 rounded-full bg-red-500 p-1 text-white shadow-lg hover:bg-red-600 transition-colors"
//                     >
//                       <X size={12} />
//                     </button>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-xs text-[#8E95A9]">JPG, PNG or GIF. Max 2MB</p>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageChange}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="userName" className="text-sm font-medium">
//                 Username <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 id="userName"
//                 placeholder="Enter username"
//                 className={`${errors.userName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
//                 {...register("userName")}
//               />
//               {errors.userName && (
//                 <p className="text-sm text-red-500">{errors.userName.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-sm font-medium">
//                 Email <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter email address"
//                 className={`${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
//                 {...register("email")}
//               />
//               {errors.email && (
//                 <p className="text-sm text-red-500">{errors.email.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword" className="text-sm font-medium">
//                 Confirm Password (if changing password)
//               </Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Confirm new password"
//                 {...register("confirmPassword")}
//               />
//               {errors.confirmPassword && (
//                 <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="phoneNumber" className="text-sm font-medium">
//                 Phone Number
//               </Label>
//               <Input
//                 id="phoneNumber"
//                 type="tel"
//                 placeholder="Enter phone number"
//                 {...register("phoneNumber")}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="country" className="text-sm font-medium">
//                 Country
//               </Label>
//               <Input
//                 id="country"
//                 placeholder="Enter country"
//                 {...register("country")}
//               />
//             </div>
//           </div>

//           <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
//             <div className="flex items-center gap-3">
//               <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background text-xs font-semibold border">
//                 {user?.userName?.charAt(0)?.toUpperCase() || "U"}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs text-muted-foreground">
//                   Editing: <span className="font-medium text-foreground">{user?.userName}</span>
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   ID: #{String(user?.id).padStart(4, "0")}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <DialogFooter className="mt-6 gap-2 sm:gap-2">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               className="flex-1"
//               disabled={isPending}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={isPending}
//               className="flex-1"
//             >
//               {isPending ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 "Save Changes"
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }