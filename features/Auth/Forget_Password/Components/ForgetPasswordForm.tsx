"use client";
import { Mail, ArrowRight, Send, KeyRound } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ForgetPasswordFormData, ForgetPasswordSchema } from "../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordAction } from "../Actions/ForgetPasswordAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(ForgetPasswordSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: ForgetPasswordFormData) => {
    const result = await forgetPasswordAction(data);
    if (!result.success) {
      toast.error(result?.message);
      // Set field-specific errors
      if (result?.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, message]) => {
          setError(field as keyof ForgetPasswordFormData, {
            type: "manual",
            message: message as string,
          });
        });
      }
      return;
    }
    router.push("/reset");
    toast.success(result.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 font-['Inter']">
      {/* Forget Password Card */}
      <div className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-xl border border-white/20 p-8 shadow-[0_20px_60px_rgba(0,0,0,.3)] sm:p-10">
        {/* Header */}
        <div className="text-center">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-linear-to-r from-[#004AC6] to-[#003399] p-3 shadow-lg shadow-[#004AC6]/30">
              <KeyRound className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="inline-flex items-center rounded-full bg-linear-to-r from-[#004AC6] to-[#003399] px-4 py-1.5 text-xs font-semibold tracking-widest text-white">
            <Send size={14} className="mr-1.5" />
            Forgot Password
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-[#191c1e]">
            Reset Your Password
          </h1>
          <p className="mt-1.5 text-sm text-[#4a4f52]">
            Enter your email address and we'll send you a verification code
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
                } bg-white py-3 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-[#004AC6] focus:outline-none focus:ring-2 focus:ring-[#004AC6]/20`}
                {...register("email")}
              />
              <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Info Message */}
          <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
            <p className="text-sm text-[#4a4f52]">
              <span className="font-semibold text-[#004AC6]">Note:</span> A 4-digit verification code will be sent to your email address.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#004AC6] to-[#003399] font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#004AC6]/30 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
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
                Sending...
              </>
            ) : (
              <>
                Send Reset Link
                <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Back to Login link */}
          <p className="text-center text-sm text-[#4a4f52]">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-[#004AC6] underline-offset-2 hover:text-[#003399] hover:underline transition-colors"
            >
              Back to Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}