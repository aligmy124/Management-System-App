"use client";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Key,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ResetFormData, ResetSchema } from "../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetAction } from "../Actions/ResetActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetFormData>({
    resolver: zodResolver(ResetSchema),
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: ResetFormData) => {
    const result = await resetAction(data);
    if (!result.success) {
      toast.error(result?.message);
      
      // Set field-specific errors
      if (result?.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof ResetFormData, {
            type: "manual",
            message: message as string,
          });
        });
      }
      return;
    }
    router.push("/login");
    toast.success(result.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 font-['Inter']">
      {/* Reset Card */}
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl border border-white/50 p-8 shadow-[0_20px_60px_rgba(0,0,0,.12)] sm:p-10">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-linear-to-r from-blue-500 to-blue-400 px-4 py-1.5 text-xs font-semibold tracking-widest text-white">
            <Key size={14} className="mr-1.5" />
            Reset Password
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-[#191c1e]">
            Set New Password
          </h1>
          <p className="mt-1.5 text-sm text-[#4a4f52]">
            Enter the verification seed and your new password
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@company.com"
                className={`w-full rounded-xl border ${
                  errors.email ? "border-red-500" : "border-[#d0d5d8]"
                } bg-white py-3 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                {...register("email")}
              />
              <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Seed / Verification Code */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
              Verification Seed
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter 6-digit seed code"
                className={`w-full rounded-xl border ${
                  errors.seed ? "border-red-500" : "border-[#d0d5d8]"
                } bg-white py-3 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                {...register("seed")}
              />
              <ShieldCheck className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
            </div>
            {errors.seed && (
              <p className="mt-1.5 text-sm text-red-500">{errors.seed.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className={`w-full rounded-xl border ${
                  errors.password ? "border-red-500" : "border-[#d0d5d8]"
                } bg-white py-3 pl-11 pr-12 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                {...register("password")}
              />
              <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
              <button
              ria-label="More options"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8e9599] transition-colors hover:text-[#191c1e] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                className={`w-full rounded-xl border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#d0d5d8]"
                } bg-white py-3 pl-11 pr-12 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                {...register("confirmPassword")}
              />
              <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
              <button
              ria-label="More options"
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8e9599] transition-colors hover:text-[#191c1e] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Reset Button */}
          <button
          ria-label="More options"
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-blue-400 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
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
                Resetting...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Back to Login link */}
          <p className="text-center text-sm text-[#4a4f52]">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 underline-offset-2 hover:text-blue-700 hover:underline transition-colors"
            >
              Back to Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}