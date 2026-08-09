import ResetForm from "@/features/Auth/Reset/Components/ResetForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Task Management",
  description:
    "Reset your password to regain access to your Task Management account securely.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function Reset(){
    return(
        <ResetForm/>
    )
}