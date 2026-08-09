import React from 'react'
import LoginForm from "@/features/Auth/Login/components/LoginForm"
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account to access your dashboard, projects, and tasks.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function Login() {
  return (
    <LoginForm/>
  )
}
