"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, AlertCircle } from "lucide-react";
import { Task } from "../../Types/Types";
import { deleteTask } from "../../Actions/DeleteAction";
import { toast } from "sonner";

interface Props {
  task: Task | null;
  open: boolean;
  setOpenChange: (open: boolean) => void;
}

export default function DeleteTask({ task, open, setOpenChange }: Props) {
  const [state, action, isPending] = useActionState(
    deleteTask.bind(null, task?.id ?? 0),
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Task deleted successfully");
      setOpenChange(false);
    }
    if (state?.success === false) {
      toast.error(state.message || "Failed to delete task");
    }
  }, [state, setOpenChange]);

  return (
    <Dialog open={open} onOpenChange={setOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden">
        <form action={action} className="p-6">
          {/* Header */}
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <DialogTitle className="text-xl font-bold">Delete Task</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {task?.title || "this task"}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {/* Task Info */}
          <div className="rounded-lg bg-muted/50 p-4 my-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-background text-sm font-semibold border">
                {task?.title?.charAt(0)?.toUpperCase() || "T"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {task?.title || "Untitled Task"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {task?.description || "No description"}
                </p>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                #{String(task?.id).padStart(4, "0")}
              </span>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200/50 p-3 my-4">
            <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Warning</p>
              <p className="text-xs text-amber-700">
                This will permanently delete the task and all associated data.
              </p>
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="gap-2 sm:gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenChange(false)}
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
                "Delete Task"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}