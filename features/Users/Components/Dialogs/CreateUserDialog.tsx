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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema, CreateUserFormData } from "../../Schema/Schema";
import { createUserAction } from "../../Actions/CreateUserActions";
import { toast } from "sonner";
import { Loader2, UserPlus, Lock, Mail, Phone, MapPin, UserIcon } from "lucide-react";
import { useActionState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateUserDialog({ open, onOpenChange }: Props) {
  const [state, action, isPending] = useActionState(createUserAction, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      phoneNumber: "",
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "User created successfully");
      onOpenChange(false);
      reset();
    }
    if (state?.success === false) {
      toast.error(state.message || "Failed to create user");
      if (state?.fieldErrors) {
        Object.entries(state.fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof CreateUserFormData, {
            type: "manual",
            message: messages?.[0],
          });
        });
      }
    }
  }, [state, onOpenChange, reset, setError]);

  // This function creates the FormData and calls the action
  const handleSubmitForm = (data: CreateUserFormData) => {
    const formData = new FormData();
    
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);

    // Pass FormData to action - React will handle it in a transition
    action(formData);
  };

  const handleClose = () => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(handleSubmitForm)} className="p-6">
          <DialogHeader className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <UserPlus className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">Create User</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Add a new manager to the system
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-sm font-medium">
                Username <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="userName"
                  placeholder="Enter username"
                  className={`pl-9 ${errors.userName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("userName")}
                />
              </div>
              {errors.userName && (
                <p className="text-sm text-red-500">{errors.userName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  className={`pl-9 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password (min 6 characters)"
                  className={`pl-9 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className={`pl-9 ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium">
                Country <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="country"
                  placeholder="Enter country"
                  className={`pl-9 ${errors.country ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("country")}
                />
              </div>
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  className={`pl-9 ${errors.phoneNumber ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                  {...register("phoneNumber")}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}