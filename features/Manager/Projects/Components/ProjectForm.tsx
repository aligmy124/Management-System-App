"use client";
import { useForm } from "react-hook-form";
import { ProjectSchema, ProjectFormData } from "../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { projectAction } from "../Actions/ProjectAction";
import {
  FolderKanban,
  FileText,
  X,
  Check,
  Loader2,
  ArrowLeft,
  Sparkles,
  Briefcase,
  Calendar,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const router = useRouter();
  const [characterCount, setCharacterCount] = useState(0);
  const titleValue = watch("title");
  const descriptionValue = watch("description");

  const onSubmit = async (data: ProjectFormData) => {
    const result = await projectAction(data);
    if (!result.success) {
      toast.error(result.message);

      if (result?.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof ProjectFormData, {
            type: "manual",
            message: messages?.[0],
          });
        });
      }
      return;
    }

    router.push("/dashboard/projects");
    toast.success(result?.message);
  };

  return (
    <div className="w-full max-w-7xl px-3 sm:px-4 md:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-2 sm:p-2.5 shadow-lg shadow-blue-600/20">
            <Sparkles size={16} className="sm:h-5 sm:w-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#191C1E]">New Project</h1>
        </div>
        <p className="text-xs sm:text-sm text-[#565E74] ml-[44px] sm:ml-[52px]">
          Create a new project and start collaborating with your team
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EFF0F4] shadow-xl shadow-black/5 overflow-hidden">
        {/* Form Progress */}
        <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-8 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-[#EFF0F4] overflow-x-auto">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-600 text-[10px] sm:text-sm font-semibold text-white">
              1
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#191C1E] whitespace-nowrap">Details</span>
          </div>
          <div className="h-px flex-1 min-w-[20px] bg-[#EFF0F4]" />
          <div className="flex items-center gap-1.5 sm:gap-2 opacity-50 flex-shrink-0">
            <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#F8F9FC] text-[10px] sm:text-sm font-semibold text-[#8E95A9]">
              2
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#8E95A9] whitespace-nowrap">Team</span>
          </div>
          <div className="h-px flex-1 min-w-[20px] bg-[#EFF0F4]" />
          <div className="flex items-center gap-1.5 sm:gap-2 opacity-50 flex-shrink-0">
            <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#F8F9FC] text-[10px] sm:text-sm font-semibold text-[#8E95A9]">
              3
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#8E95A9] whitespace-nowrap">Review</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          {/* Title Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="title"
                className="text-xs sm:text-sm font-semibold text-[#191C1E]"
              >
                Project Title <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] sm:text-xs text-[#8E95A9]">
                {titleValue?.length || 0}/100
              </span>
            </div>
            <div className="relative group">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#8E95A9] group-focus-within:text-blue-600 transition-colors">
                <FolderKanban size={16} className="sm:h-5 sm:w-5" />
              </div>
              <input
                id="title"
                type="text"
                placeholder="e.g. Mobile App Redesign"
                maxLength={100}
                className={`w-full rounded-xl sm:rounded-2xl border-2 ${
                  errors.title ? "border-red-500" : "border-[#EFF0F4]"
                } bg-[#F8F9FC] py-2.5 sm:py-3.5 pl-9 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm text-[#191C1E] placeholder:text-[#8E95A9] transition-all focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 group-focus-within:shadow-sm`}
                {...register("title")}
              />
            </div>
            {errors.title ? (
              <div className="flex items-center gap-2 rounded-lg sm:rounded-xl bg-red-50 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-red-600 border border-red-100">
                <X size={14} className="sm:h-4 sm:w-4 flex-shrink-0" />
                <span>{errors.title.message}</span>
              </div>
            ) : (
              <p className="text-[10px] sm:text-xs text-[#8E95A9]">
                Choose a clear and descriptive title for your project
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="description"
                className="text-xs sm:text-sm font-semibold text-[#191C1E]"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] sm:text-xs text-[#8E95A9]">
                {descriptionValue?.length || 0}/500
              </span>
            </div>
            <div className="relative group">
              <div className="absolute left-3 sm:left-4 top-3 sm:top-4 text-[#8E95A9] group-focus-within:text-blue-600 transition-colors">
                <FileText size={16} className="sm:h-5 sm:w-5" />
              </div>
              <textarea
                id="description"
                placeholder="Describe the project goals, scope, and key deliverables..."
                rows={4}
                maxLength={500}
                className={`w-full rounded-xl sm:rounded-2xl border-2 ${
                  errors.description ? "border-red-500" : "border-[#EFF0F4]"
                } bg-[#F8F9FC] py-2.5 sm:py-3.5 pl-9 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm text-[#191C1E] placeholder:text-[#8E95A9] transition-all focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 resize-none group-focus-within:shadow-sm`}
                {...register("description")}
              />
            </div>
            {errors.description ? (
              <div className="flex items-center gap-2 rounded-lg sm:rounded-xl bg-red-50 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-red-600 border border-red-100">
                <X size={14} className="sm:h-4 sm:w-4 flex-shrink-0" />
                <span>{errors.description.message}</span>
              </div>
            ) : (
              <p className="text-[10px] sm:text-xs text-[#8E95A9]">
                Provide a detailed description to help your team understand the project
              </p>
            )}
          </div>

          {/* Project Preview */}
          <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-5 border border-blue-100/50">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
              <div className="rounded-lg sm:rounded-xl bg-white p-2 sm:p-2.5 shadow-sm self-start">
                <Briefcase size={16} className="sm:h-5 sm:w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-[#191C1E]">
                  Project Preview
                </p>
                <p className="text-xs sm:text-sm text-[#565E74] mt-0.5 truncate">
                  {titleValue || "Untitled Project"}
                </p>
                <p className="text-[10px] sm:text-xs text-[#8E95A9] mt-1 line-clamp-2">
                  {descriptionValue || "No description provided yet"}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/80 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-[#565E74]">
                  <Calendar size={10} className="sm:h-3 sm:w-3" />
                  Today
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/80 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-[#565E74]">
                  <Users size={10} className="sm:h-3 sm:w-3" />0
                </span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-2 sm:gap-3 pt-4 sm:pt-6 sm:flex-row sm:items-center sm:justify-end border-t border-[#EFF0F4]">
            <Link
              href="/dashboard/projects"
              className="flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl border-2 border-[#EFF0F4] px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#565E74] transition-all hover:border-[#D0D5DD] hover:bg-[#F8F9FC] hover:text-[#191C1E] w-full sm:w-auto"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="sm:h-[18px] sm:w-[18px] animate-spin" />
                  Creating Project...
                </>
              ) : (
                <>
                  <Check size={16} className="sm:h-[18px] sm:w-[18px]" />
                  Create Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}