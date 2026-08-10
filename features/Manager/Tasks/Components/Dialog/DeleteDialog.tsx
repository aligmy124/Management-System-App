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
      <DialogContent className="sm:max-w-[425px] md:max-w-[500px] w-[95vw] max-w-[95vw] sm:w-full p-0 gap-0 overflow-hidden rounded-lg sm:rounded-2xl">
        <form action={action} className="p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <DialogHeader className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              </div>
              <DialogTitle className="text-lg sm:text-xl font-bold truncate">
                Delete Task
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {task?.title || "this task"}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {/* Task Info */}
          <div className="rounded-lg bg-muted/50 p-3 sm:p-4 my-3 sm:my-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-md bg-background text-[10px] sm:text-sm font-semibold border">
                {task?.title?.charAt(0)?.toUpperCase() || "T"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium truncate">
                  {task?.title || "Untitled Task"}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                  {task?.description || "No description"}
                </p>
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground font-mono flex-shrink-0">
                #{String(task?.id).padStart(4, "0")}
              </span>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200/50 p-2.5 sm:p-3 my-3 sm:my-4">
            <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-amber-800">Warning</p>
              <p className="text-[10px] sm:text-xs text-amber-700">
                This will permanently delete the task and all associated data.
              </p>
            </div>
          </div>

          {/* Actions */}
             <div className="flex flex-col-reverse xs:flex-row gap-2 sm:gap-2 mt-4 sm:mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenChange(false)}
              className="cursor-pointer w-full xs:flex-1 min-h-[44px] sm:min-h-0"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={isPending}
              className="cursor-pointer w-full xs:flex-1 min-h-[44px] sm:min-h-0"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Task"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}