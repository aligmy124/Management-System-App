"use client";
import {
  User,
  Phone,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Check,
  Camera,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterFormData, RegisterSchema } from "../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "../Actions/RegisterAction";
import { toast } from "sonner";
import {useRouter} from "next/navigation"
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const router=useRouter();

  const onSubmit = async (data: RegisterFormData) => {

    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }
    const result = await registerAction(formData);
    if (!result.success) {
      toast.error(result?.message);
      
      // Set field-specific errors
      if (result.fieldErrors) {
  Object.entries(result.fieldErrors).forEach(([field, messages]) => {
    if (!messages?.length) return;

    setError(field as keyof RegisterFormData, {
      type: "manual",
      message: messages.join(", "),
    });
  });
}
      return;
    }
    router.push("/verify")
    toast.success(result.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 font-['Inter']">
      {/* Register Card */}
      <div className="w-full max-w-2xl rounded-3xl bg-white/90 backdrop-blur-xl border border-white/50 p-8 shadow-[0_20px_60px_rgba(0,0,0,.12)] sm:p-10">
        {/* Header with Profile Image */}
        <div className="text-center">
          {/* Profile Image - Top Center */}
          <div className="mb-6 flex justify-center">
  <div className="relative">
    <label
      htmlFor="profileImage"
      className="relative block h-24 w-24 cursor-pointer rounded-full border-4 border-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
    >
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-purple-100 transition-all duration-300 group-hover:from-blue-200 group-hover:to-purple-200">
        <Camera className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
        <span className="mt-1 text-[10px] font-medium text-blue-600">Upload</span>
      </div>
    </label>
    <input
      type="file"
      accept="image/*"
      className="hidden"
      id="profileImage"
      onChange={(e) => {
        setValue("profileImage", e.target.files?.[0], {
          shouldValidate: true,
        });
      }}
    />
  </div>
</div>

          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-700">
            PMS
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-[#191c1e]">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-[#4a4f52]">
            Join Kinetic Enterprise to manage your projects efficiently.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="johndoe"
                className={`w-full rounded-xl border ${
                  errors.userName ? "border-red-500" : "border-[#d0d5d8]"
                } bg-white py-3 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20`}
                {...register("userName")}
              />
              <User className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
            </div>
            {errors.userName && (
              <p className="mt-1.5 text-sm text-red-500">{errors.userName.message}</p>
            )}
          </div>

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
                } bg-white py-3 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20`}
                {...register("email")}
              />
              <User className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Country + Phone Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
                Country
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="United States"
                  className={`w-full rounded-xl border ${
                    errors.country ? "border-red-500" : "border-[#d0d5d8]"
                  } bg-white py-3 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20`}
                  {...register("country")}
                />
                <MapPin className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
              </div>
              {errors.country && (
                <p className="mt-1.5 text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className={`w-full rounded-xl border ${
                    errors.phoneNumber ? "border-red-500" : "border-[#d0d5d8]"
                  } bg-white py-3 pl-11 pr-4 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20`}
                  {...register("phoneNumber")}
                />
                <Phone className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1.5 text-sm text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="********"
                className={`w-full rounded-xl border ${
                  errors.password ? "border-red-500" : "border-[#d0d5d8]"
                } bg-white py-3 pl-11 pr-12 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20`}
                {...register("password")}
              />
              <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8e9599] transition-colors hover:text-[#191c1e] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              >
                <EyeOff size={20} />
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
                type="password"
                placeholder="********"
                className={`w-full rounded-xl border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#d0d5d8]"
                } bg-white py-3 pl-11 pr-12 text-sm text-[#191c1e] placeholder:text-[#8e9599] transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20`}
                {...register("confirmPassword")}
              />
              <Check className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8e9599]" />
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8e9599] transition-colors hover:text-[#191c1e] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              >
                <EyeOff size={20} />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>


          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#004AC6] to-[#003399] font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-600/25 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
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
                Creating account...
              </>
            ) : (
              "Register Account →"
            )}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-[#4a4f52]">
            Already have an account?{" "}
            <Link
              href="/"
              className="font-medium text-blue-600 underline-offset-2 hover:text-blue-700 hover:underline transition-colors"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}