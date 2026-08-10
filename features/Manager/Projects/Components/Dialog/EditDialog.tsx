"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project } from "../../Types/Types";
import { useForm } from "react-hook-form";
import { ProjectSchema, ProjectFormData } from "../../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProjectAction } from "../../Actions/EditProjectAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, X } from "lucide-react";

interface Props {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProjectDialog({ project, open, onOpenChange }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectSchema),
  });

  useEffect(() => {
    if (project && open) {
      reset({
        title: project.title,
        description: project.description,
      });
    }
  }, [project, open, reset]);

  const onSubmit = async (data: ProjectFormData) => {
    if (!project) return;

    const result = await editProjectAction(data, project.id);
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
    toast.success(result.message);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Header */}
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                <Pencil className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">Edit Project</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Make changes to your project details below.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Form Fields */}
          <div className="mt-4 space-y-4">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter project title"
                className={`${errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-red-500">*</span>
              </Label>
              <Input
                id="description"
                placeholder="Enter project description"
                className={`${errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Project Info */}
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background text-xs font-semibold border">
                {project?.title?.charAt(0)?.toUpperCase() || "P"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">
                  Editing: <span className="font-medium text-foreground">{project?.title}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  ID: #{String(project?.id).padStart(4, "0")}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="mt-6 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}