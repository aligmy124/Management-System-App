// components/Dialogs/ToggleUserDialog.tsx
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
import { User } from "../../Types/Types";
import { useActionState, useEffect } from "react";
import { toggleUserAction } from "../../Actions/ToggleUserAction";
import { toast } from "sonner";
import { Loader2, AlertCircle, Power, PowerOff } from "lucide-react";

interface Props {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ToggleUserDialog({ user, open, onOpenChange }: Props) {
  const [state, action, isPending] = useActionState(
    toggleUserAction.bind(null, user?.id ?? 0),
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "User status updated successfully");
      onOpenChange(false);
    }
    if (state?.success === false) {
      toast.error(state.message || "Failed to update user status");
    }
  }, [state, onOpenChange]);

  const isCurrentlyActive = user?.isActivated;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden">
        <form action={action} className="p-6">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isCurrentlyActive ? 'bg-amber-50' : 'bg-green-50'}`}>
                {isCurrentlyActive ? (
                  <PowerOff className="h-5 w-5 text-amber-600" />
                ) : (
                  <Power className="h-5 w-5 text-green-600" />
                )}
              </div>
              <DialogTitle className="text-xl font-bold">
                {isCurrentlyActive ? 'Deactivate' : 'Activate'} User
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to {isCurrentlyActive ? 'deactivate' : 'activate'}{" "}
              <span className="font-semibold text-foreground">
                {user?.userName || "this user"}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg bg-muted/50 p-4 my-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-background text-sm font-semibold border">
                {user?.userName?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.userName || "Unknown User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || "No email"}
                </p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isCurrentlyActive 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {isCurrentlyActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className={`flex items-start gap-2 rounded-lg p-3 my-4 ${
            isCurrentlyActive 
              ? 'bg-amber-50 border border-amber-200/50' 
              : 'bg-green-50 border border-green-200/50'
          }`}>
            <AlertCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
              isCurrentlyActive ? 'text-amber-600' : 'text-green-600'
            }`} />
            <div>
              <p className={`text-sm font-medium ${
                isCurrentlyActive ? 'text-amber-800' : 'text-green-800'
              }`}>
                {isCurrentlyActive ? 'Warning' : 'Information'}
              </p>
              <p className={`text-xs ${
                isCurrentlyActive ? 'text-amber-700' : 'text-green-700'
              }`}>
                {isCurrentlyActive 
                  ? 'This user will lose access to the system until reactivated.'
                  : 'This user will gain full access to the system.'}
              </p>
            </div>
          </div>

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
              disabled={isPending}
              className={`flex-1 ${
                isCurrentlyActive 
                  ? 'bg-amber-600 hover:bg-amber-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isCurrentlyActive ? 'Deactivating...' : 'Activating...'}
                </>
              ) : (
                <>
                  {isCurrentlyActive ? 'Deactivate User' : 'Activate User'}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}