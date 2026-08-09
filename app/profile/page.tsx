import ProfileContent from "@/features/Profile/Components/ProfileContent"
import { currentUserServices } from "@/features/Auth/CurrentUser/Services/CurrentUserServices";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Task Management",
  description:
    "View and update your personal information, manage your account settings, and keep your profile up to date.",
};

export default async function Profile(){
    const currentUser= await currentUserServices();
    return(
        <ProfileContent user={currentUser}/>
    )
}