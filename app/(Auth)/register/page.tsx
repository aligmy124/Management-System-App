import RegisterForm from "@/features/Auth/Register/Components/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Task Management",
  description:
    "Create a new Task Management account to organize projects, manage tasks, and collaborate with your team.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function Register(){
    return(
        <RegisterForm/>
    )
}