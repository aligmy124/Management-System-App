"use client";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ListTodo,
  X,
  ChevronRight,
} from "lucide-react";
import { useUser } from "@/features/Auth/CurrentUser/Context/UserContext";
import Link from "next/link";
import { useSidebar } from "./SidebarProvider";
import { usePathname } from "next/navigation";
import Image from 'next/image';
export default function Sidebar() {
  const { user } = useUser();
  const imageUrl = user?.imagePath
  ? `${process.env.NEXT_PUBLIC_BASE_IMG_URL}/${user.imagePath}`
  : "/default-avatar.png";

  const { isMobileMenuOpen, setIsMobileMenuOpen } = useSidebar();
  const pathname = usePathname();

  const employeeNavigation = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "My Projects",
      icon: FolderKanban,
      href: "/dashboard/projects",
    },
    {
      name: "My Tasks",
      icon: ListTodo,
      href: "/dashboard/tasks",
    },
  ];

  const managerNavigation = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "MyProjects",
      icon: FolderKanban,
      href: "/dashboard/projects",
    },
    {
      name: "Users",
      icon: FolderKanban,
      href: "/dashboard/users",
    },
    {
      name: "Tasks",
      icon: ListTodo,
      href: "/dashboard/tasks",
    },
  ];

  const navigation = user?.group?.name === "Employee" ? employeeNavigation : managerNavigation;
  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-70 transform bg-white shadow-2xl shadow-black/5 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between border-b border-[#eef0f2] px-6">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20 transition-all duration-300 group-hover:shadow-blue-600/40 group-hover:scale-105">
                <span className="text-lg font-bold text-white">P</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold tracking-tight text-[#191c1e]">
                  PMS
                </span>
                <span className="ml-1.5 rounded-full bg-linear-to-r from-blue-100 to-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                  PRO
                </span>
              </div>
            </Link>
            <button
            ria-label="More options"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg p-1.5 hover:bg-[#f2f4f6] transition-colors lg:hidden"
            >
              <X size={20} className="text-[#4a4f52]" />
            </button>
          </div>

          {/* User Info */}
          <div className="mx-3 mt-3 rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 p-3 border border-blue-100/50">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-md shadow-blue-600/20">
                {/* <Image
                src={imageUrl}
                alt={"U"}
                priority
                fill
                /> */}
                {user?.userName?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#191c1e] truncate">
                  {user?.userName || "User"}
                </p>
                <p className="text-xs text-[#8e9599] truncate">
                  {user?.group?.name || "Employee"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-[#e6e8ea] scrollbar-track-transparent">
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#8e9599]">
              Main Menu
            </p>
            <ul className="space-y-0.5">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25"
                          : "text-[#4a4f52] hover:bg-[#f2f4f6] hover:text-[#191c1e]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          size={20}
                          className={`transition-all duration-200 ${
                            active
                              ? "text-white"
                              : "text-[#8e9599] group-hover:text-[#191c1e]"
                          }`}
                        />
                        <span className="tracking-wide">{item.name}</span>
                      </div>
                      {active && (
                        <ChevronRight size={16} className="text-white/70" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick Stats */}
            <div className="mt-6 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 p-4 shadow-lg shadow-blue-600/20">
              <p className="text-xs font-medium text-blue-100">Today's Progress</p>
              <p className="mt-1 text-2xl font-bold text-white">82%</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[82%] rounded-full bg-white" />
              </div>
              <p className="mt-1.5 text-xs text-blue-100">18 of 22 tasks completed</p>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}