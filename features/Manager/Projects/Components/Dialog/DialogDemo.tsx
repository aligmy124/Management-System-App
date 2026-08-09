"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Project } from "../../Types/Types";
import { useActionState } from "react";
import { deleteProjectAction } from "../../Actions/DeleteProject";
import { Trash2, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteProjectDialog({ project, open, onOpenChange }: Props) {
  const [state, action, isPending] = useActionState(
    deleteProjectAction.bind(null, project?.id ?? 0),
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Project deleted successfully");
      onOpenChange(false);
    }
    if (state?.success === false) {
      toast.error(state.message || "Failed to delete project");
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden">
        <form action={action} className="p-6">
          {/* Header */}
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <DialogTitle className="text-xl font-bold">Delete Project</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {project?.title || "this project"}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {/* Project Info */}
          <div className="rounded-lg bg-muted/50 p-4 my-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-background text-sm font-semibold border">
                {project?.title?.charAt(0)?.toUpperCase() || "P"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {project?.title || "Untitled Project"}
                </p>
                {/* <p className="text-xs text-muted-foreground truncate">
                  {project?.description || "No description"}
                </p> */}
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                #{String(project?.id).padStart(4, "0")}
              </span>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200/50 p-3 my-4">
            <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Warning</p>
              <p className="text-xs text-amber-700">
                This will permanently delete the project and all associated data.
              </p>
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="gap-2 sm:gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={isPending}
              className="flex-1"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}