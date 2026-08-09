import VerifyForm from "@/features/Auth/Verify/Components/VerifyForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Account | Task Management",
  description:
    "Verify your account to activate access to your Task Management dashboard and features.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function Verify(){
    return(
        <VerifyForm/>
    )
}