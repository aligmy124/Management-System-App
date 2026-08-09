"use client";
import {
  FolderKanban,
  FileText,
  Users,
  Briefcase,
  Check,
  Sparkles,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TaskSchema, TaskFormData } from "../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TaskProject } from "../Types/FormType";
import { User } from "@/features/Users/Types/Types";
import { taskAction } from "../Actions/TaskAction";

interface Props {
  users: User[];
  projects: TaskProject[];
}

export default function TaskForm({ users, projects }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      employeeId: 0,
      projectId: 0,
    },
  });

  const router = useRouter();
  const title = watch("title");
  const description = watch("description");
  const employeeId = watch("employeeId");
  const projectId = watch("projectId");

  const onSubmit = async (data: TaskFormData) => {
    const result = await taskAction(data);
    if (!result.success) {
      toast.error(result.message);
      if (result?.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof TaskFormData, {
            type: "manual",
            message: messages?.[0],
          });
        });
      }
      return;
    }
    toast.success(result.message);
    router.push("/dashboard/tasks");
  };

  const getSelectedEmployee = () => {
    return users.find((user) => user.id === Number(employeeId));
  };

  const getSelectedProject = () => {
    return projects.find((proj) => proj.id === Number(projectId));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-0">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 shadow-lg shadow-blue-600/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
          </div>
          <p className="text-sm text-gray-500 ml-[52px]">
            Assign tasks to team members and track progress efficiently
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-black/5 overflow-hidden">
          <form className="p-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Title Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="title" className="text-sm font-semibold text-gray-900">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-gray-400">{title?.length || 0}/100</span>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <FolderKanban size={20} />
                </div>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Design Homepage"
                  maxLength={100}
                  className={`w-full rounded-2xl border-2 ${
                    errors.title ? "border-red-500" : "border-gray-100"
                  } bg-gray-50/50 py-3.5 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10`}
                  {...register("title")}
                />
              </div>
              {errors.title ? (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <X size={16} />
                  <span>{errors.title.message}</span>
                </div>
              ) : (
                <p className="text-xs text-gray-400">
                  Choose a clear and descriptive title for your task
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="description" className="text-sm font-semibold text-gray-900">
                  Description <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-gray-400">{description?.length || 0}/500</span>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <FileText size={20} />
                </div>
                <textarea
                  id="description"
                  placeholder="Describe the task goals, requirements, and key deliverables..."
                  rows={4}
                  maxLength={500}
                  className={`w-full rounded-2xl border-2 ${
                    errors.description ? "border-red-500" : "border-gray-100"
                  } bg-gray-50/50 py-3.5 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 resize-none`}
                  {...register("description")}
                />
              </div>
              {errors.description ? (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <X size={16} />
                  <span>{errors.description.message}</span>
                </div>
              ) : (
                <p className="text-xs text-gray-400">
                  Provide a detailed description to help team members understand the task
                </p>
              )}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Assign Employee */}
              <div className="space-y-2">
                <label htmlFor="employeeId" className="text-sm font-semibold text-gray-900">
                  Assign Employee <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <Users size={20} />
                  </div>
                  <select
                    id="employeeId"
                    className={`w-full appearance-none rounded-2xl border-2 ${
                      errors.employeeId ? "border-red-500" : "border-gray-100"
                    } bg-gray-50/50 py-3.5 pl-12 pr-12 text-sm text-gray-900 transition-all focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 cursor-pointer`}
                    {...register("employeeId", {
                      valueAsNumber: true,
                    })}
                  >
                    <option value="">Select employee...</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.userName} ({user.email})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.employeeId ? (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <X size={16} />
                    <span>{errors.employeeId.message}</span>
                  </div>
                ) : (
                  employeeId && (
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <Check size={14} />
                      <span>Employee selected</span>
                    </div>
                  )
                )}
              </div>

              {/* Select Project */}
              <div className="space-y-2">
                <label htmlFor="projectId" className="text-sm font-semibold text-gray-900">
                  Select Project <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <Briefcase size={20} />
                  </div>
                  <select
                    id="projectId"
                    className={`w-full appearance-none rounded-2xl border-2 ${
                      errors.projectId ? "border-red-500" : "border-gray-100"
                    } bg-gray-50/50 py-3.5 pl-12 pr-12 text-sm text-gray-900 transition-all focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/10 cursor-pointer`}
                    {...register("projectId", {
                      valueAsNumber: true,
                    })}
                  >
                    <option value="">Select project...</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.projectId ? (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <X size={16} />
                    <span>{errors.projectId.message}</span>
                  </div>
                ) : (
                  projectId && (
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <Check size={14} />
                      <span>Project selected</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Selected Preview */}
            {(title || description || employeeId || projectId) && (
              <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border border-blue-100/50">
                <p className="text-sm font-medium text-gray-700 mb-3">Task Preview</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white p-1.5 shadow-sm">
                      <FolderKanban size={16} className="text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">
                      {title || "Untitled Task"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {employeeId && getSelectedEmployee() && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Users size={14} className="text-blue-500" />
                        <span>{getSelectedEmployee()?.userName}</span>
                      </div>
                    )}
                    {projectId && getSelectedProject() && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Briefcase size={14} className="text-purple-500" />
                        <span>{getSelectedProject()?.title}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Root Error */}
            {errors.root && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl p-3 border border-red-100">
                <X size={16} />
                <span>{errors.root.message}</span>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:items-center sm:justify-end border-t border-gray-100">
              <Link
                href="/dashboard/tasks"
                className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-100 px-8 py-3 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Create Task
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-blue-700">💡 Tip:</span>{" "}
            Assign tasks to the right team members and link them to relevant projects for better tracking.
          </p>
        </div>
      </div>
    </div>
  );
}