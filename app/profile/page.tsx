import ProfileContent from "@/features/Profile/Components/ProfileContent"
import { getCurrentUser } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Task Management",
  description:
    "View and update your personal information, manage your account settings, and keep your profile up to date.",
};

export default async function Profile(){
    const currentUser= await getCurrentUser();
    return(
        <ProfileContent user={currentUser}/>
    )
}