"use client";
import { Mail, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { VerifyFormData, VerifySchema } from "../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyAction } from "../Actions/VerifyAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(VerifySchema),
  });

  const router = useRouter();

  const onSubmit = async (data: VerifyFormData) => {
    const result = await verifyAction(data);
    if (!result.success) {
      toast.error(result?.message);
      return;
    }
    router.push("/login");
    toast.success(result.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 font-['Inter']">
      {/* Verify Card */}
      <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl border border-white/50 p-8 shadow-[0_20px_60px_rgba(0,0,0,.12)] sm:p-10">
        {/* Header */}
        <div className="text-center">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-linear-to-r from-blue-500 to-blue-400 p-3 shadow-lg shadow-blue-500/20">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="inline-flex items-center rounded-full bg-linear-to-r from-blue-500 to-blue-400 px-4 py-1.5 text-xs font-semibold tracking-widest text-white">
            Verify Account
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-[#191c1e]">
            Verify Your Email
          </h1>
          <p className="mt-1.5 text-sm text-[#4a4f52]">
            Enter the 4-digit verification code sent to your email
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

          {/* Verification Code */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
              Verification Code
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter 4-digit code"
                maxLength={6}
                className={`w-full rounded-xl border ${
                  errors.code ? "border-red-500" : "border-[#d0d5d8]"
                } bg-white py-3 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                {...register("code")}
              />
              <ShieldCheck className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
            </div>
            {errors.code && (
              <p className="mt-1.5 text-sm text-red-500">{errors.code.message}</p>
            )}
            <p className="mt-2 text-xs text-[#8e9599]">
              We sent a 4-digit code to your email. Please check your inbox.
            </p>
          </div>

          {/* Verify Button */}
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
                Verifying...
              </>
            ) : (
              <>
                Verify Account
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Resend & Login links */}
          <div className="space-y-3 text-center">
            <p className="text-sm text-[#4a4f52]">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="font-medium text-blue-600 underline-offset-2 hover:text-blue-700 hover:underline transition-colors"
              >
                Resend Code
              </button>
            </p>
            <p className="text-sm text-[#4a4f52]">
              <Link
                href="#"
                className="font-medium text-blue-600 underline-offset-2 hover:text-blue-700 hover:underline transition-colors"
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}