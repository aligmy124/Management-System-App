"use client";
import {
  Bell,
  Search,
  Plus,
  Menu,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useSidebar } from "./SidebarProvider";
import Link from "next/link";
import { logOut } from "../../Actions/logoutAction";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/Auth/CurrentUser/Context/UserContext";
import { toast } from "sonner";

export default function Navbar() {
  const { setIsMobileMenuOpen } = useSidebar();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsProfileOpen(false);
    try {
      await logOut();
      toast.success("Logged out successfully");
      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout");
      setIsLoggingOut(false);
    }
  };

  // Get user initials
  const getInitials = () => {
    if (!user?.userName) return "U";
    return user.userName.charAt(0).toUpperCase();
  };

  // Get display name
  const getDisplayName = () => {
    if (user?.userName) return user.userName;
    return "User";
  };

  // Get display email
  const getDisplayEmail = () => {
    if (user?.email) return user.email;
    return "user@company.com";
  };
  let manager;
  let employee;
  const getRole = () => {
    if (user?.group.name === "Manager") {
      manager = user?.group.name;
    } else {
      employee = user?.group.name;
    }
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-[#eef0f2] bg-white/80 backdrop-blur-sm px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
        ria-label="More options"
          onClick={() => setIsMobileMenuOpen(true)}
          className="rounded-xl p-2 hover:bg-[#f2f4f6] transition-all duration-200 lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={22} className="text-[#4a4f52]" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* Add Button */}
        {manager && (
          <button ria-label="More options" className="hidden sm:flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]">
            <Plus size={18} />
            <span>New Project</span>
          </button>
        )}

        {/* Profile Dropdown */}
        <div className="relative">
          <button
          ria-label="More options"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-2 rounded-xl p-1.5 transition-all duration-200 hover:bg-[#f2f4f6] ${
              isProfileOpen ? "bg-[#f2f4f6]" : ""
            }`}
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-linear-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-blue-500/20">
              {getInitials()}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-[#191c1e] leading-tight">
                {getDisplayName()}
              </p>
              <p className="text-xs text-[#8e9599] leading-tight">
                {getDisplayEmail()}
              </p>
            </div>
            <ChevronDown
              size={16}
              className={`text-[#8e9599] transition-transform duration-300 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <>
              {/* Click outside overlay */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
              />

              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl shadow-black/10 border border-[#eef0f2] py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                {/* User Info */}
                <div className="px-4 py-4 border-b border-[#eef0f2]">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-linear-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-lg shadow-md shadow-blue-500/20">
                      {getInitials()}
                      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#191c1e] truncate">
                        {getDisplayName()}
                      </p>
                      <p className="text-xs text-[#8e9599] truncate">
                        {getDisplayEmail()}
                      </p>
                      <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                        <Sparkles size={10} />
                        Pro
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#4a4f52] transition-all duration-200 hover:bg-[#f2f4f6] hover:text-[#191c1e] group"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <div className="rounded-lg bg-[#f2f4f6] p-1.5 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <User
                        size={16}
                        className="text-[#8e9599] group-hover:text-blue-600"
                      />
                    </div>
                    <span>My Profile</span>
                  </Link>
                </div>

                <div className="border-t border-[#eef0f2] py-1">
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-all duration-200 hover:bg-red-50 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="rounded-lg bg-red-50 p-1.5 group-hover:bg-red-100 transition-colors ">
                      <LogOut
                        size={16}
                        className="text-red-500 cursor-pointer"
                      />
                    </div>
                    <span className="cursor-pointer">
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </span>
                    {isLoggingOut && (
                      <svg
                        className="ml-auto h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
