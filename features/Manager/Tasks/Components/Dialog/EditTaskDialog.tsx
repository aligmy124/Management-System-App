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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "../../Types/Types";
import { Employee } from "../../Types/Types";
import { useForm } from "react-hook-form";
import { TaskSchema, TaskFormData } from "../../Schema/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTaskAction } from "../../Actions/UpdateAction";
import { toast } from "sonner";
import { Loader2, Pencil, Users } from "lucide-react";

interface Props {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees?: Employee[];
}

export default function EditTaskDialog({ task, open, onOpenChange, employees = [] }: Props) {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    watch,
    setValue,
  } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      employeeId: 0,
    },
  });

  const title = watch("title");
  const description = watch("description");

  useEffect(() => {
    if (task && open) {
      const employeeId = task.employee?.id || 0;
      reset({
        title: task.title || "",
        description: task.description || "",
        employeeId: employeeId,
      });
      setSelectedEmployee(employeeId.toString());
    }
  }, [task, open, reset]);

  const onSubmit = async (data: TaskFormData) => {
  console.log("1 - SUBMIT:", data);

  if (!task) {
    console.log("NO TASK");
    return;
  }

  console.log("2 - TASK ID:", task.id);

  try {
    console.log("3 - CALLING ACTION");

    const result = await updateTaskAction(data, task.id);

    console.log("4 - ACTION RESULT:", result);

    if (!result.success) {
      toast.error(result.message);

      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof TaskFormData, {
            type: "manual",
            message: messages?.[0],
          });
        });
      }

      return;
    }

    console.log("5 - SUCCESS");

    toast.success(result.message);
    onOpenChange(false);
    reset();
  } catch (error) {
    console.error("6 - SUBMIT ERROR:", error);
    toast.error("Something went wrong");
  }
};

  const getSelectedEmployeeName = () => {
    const employee = employees.find((emp) => emp.id === Number(selectedEmployee));
    return employee?.userName || "";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden">
<form
  onSubmit={handleSubmit(
    onSubmit,
    (errors) => {
      console.log("❌ VALIDATION ERRORS:", errors);
    }
  )}
>
          {/* Header */}
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                <Pencil className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">Edit Task</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Make changes to your task details below.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Form Fields */}
          <div className="mt-4 space-y-4">
            {/* Title Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-red-500">*</span>
                </Label>
                <span className="text-xs text-muted-foreground">{title?.length || 0}/100</span>
              </div>
              <Input
                id="title"
                placeholder="Enter task title"
                maxLength={100}
                className={`${errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </Label>
                <span className="text-xs text-muted-foreground">{description?.length || 0}/500</span>
              </div>
              <Input
                id="description"
                placeholder="Enter task description"
                maxLength={500}
                className={`${errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Assign Employee */}
            <div className="space-y-2">
              <Label htmlFor="employeeId" className="text-sm font-medium">
                Assign Employee <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Users size={16} />
                </div>
                <select
                  id="employeeId"
                  className={`w-full rounded-lg border bg-background py-2.5 pl-10 pr-10 text-sm transition-colors focus:outline-none focus:ring-2 ${
                    errors.employeeId
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input focus-visible:ring-ring"
                  }`}
                  value={selectedEmployee}
                  {...register("employeeId", { 
                    valueAsNumber: true,
                    onChange: (e) => setSelectedEmployee(e.target.value)
                  })}
                >
                  <option value="">Select employee...</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.userName} ({employee.email})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.employeeId && (
                <p className="text-sm text-red-500">{errors.employeeId.message}</p>
              )}
            </div>
          </div>

          {/* Task Info */}
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background text-xs font-semibold border">
                {task?.title?.charAt(0)?.toUpperCase() || "T"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">
                  Editing: <span className="font-medium text-foreground">{task?.title}</span>
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>ID: #{String(task?.id).padStart(4, "0")}</span>
                  {selectedEmployee && selectedEmployee !== "0" && (
                    <>
                      <span>•</span>
                      <span>Assigned to: {getSelectedEmployeeName()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="mt-6 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
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