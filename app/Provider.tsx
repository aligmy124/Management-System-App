"use client";
import { Toaster } from "@/components/ui/sonner";
export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
