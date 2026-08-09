"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, LoginSchema } from "../schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAction } from "../actions/LoginAction";
import { toast } from "sonner";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    const result = await loginAction(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }
    router.replace("/dashboard");
    toast.success("Login successfully");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 font-['Inter']">
      {/* Login card */}
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl border border-white/50 p-10 shadow-[0_20px_60px_rgba(0,0,0,.12)]">
        {/* PMSb badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-700">
            PMS
          </div>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[#191c1e]">
          Welcome Back
        </h1>
        <p className="mt-1.5 text-sm text-[#4a4f52]">
          Enter your credentials to access your workspace.
        </p>

        {/* Form fields */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email with icon */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full rounded-xl border border-[#d0d5d8] bg-white py-3 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                {...register("email")}
              />
              <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599] transition-colors peer-focus:text-blue-600" />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-sm font-medium text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password with icon */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-[#191c1e]">
                Password
              </label>
              <Link
                href="/forget_password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#d0d5d8] bg-white py-3 pl-11 pr-12 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                {...register("password")}
              />
              <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599] transition-colors" />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8e9599] transition-colors hover:text-[#191c1e] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-sm font-medium text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me & Sign In row */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-[#191c1e] cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-[#d0d5d8] text-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:ring-offset-0"
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#004AC6] to-[#003399] font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:shadow-none cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>

          {/* Register link */}
          <p className="text-center text-sm text-[#4a4f52]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 underline-offset-2 hover:text-blue-700 hover:underline transition-colors"
            >
              Register as Employee
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
