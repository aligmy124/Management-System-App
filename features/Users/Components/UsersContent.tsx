"use client";

import {
  Users,
  UserPlus,
  Search,
  Filter,
  Pencil,
  Trash2,
  Power,
  PowerOff,
  Mail,
  Phone,
  MapPin,
  UserCog,
} from "lucide-react";
import { useState, useEffect, useMemo, Suspense } from "react";
import { User, UserGroup } from "../Types/Types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy load dialogs with dynamic imports
const CreateUserDialog = dynamic(
  () => import("./Dialogs/CreateUserDialog"),
  {
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <span className="text-sm font-medium text-gray-700">Loading...</span>
          </div>
        </div>
      </div>
    ),
  }
);

const ToggleUserDialog = dynamic(
  () => import("./Dialogs/ToggleUserDialog"),
  {
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <span className="text-sm font-medium text-gray-700">Loading...</span>
          </div>
        </div>
      </div>
    ),
  }
);

interface Props {
  users: User[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  search?: string;
  email?: string;
  country?: string;
  groups?: string;
}

export default function UsersContent({ 
  users, 
  totalCount,
  currentPage,
  totalPages,
  search = "",
  email = "",
  country = "",
  groups = "",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [openCreate, setOpenCreate] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Local filter states
  const [localSearch, setLocalSearch] = useState(search);
  const [localEmail, setLocalEmail] = useState(email);
  const [localCountry, setLocalCountry] = useState(country);
  const [localGroups, setLocalGroups] = useState(groups || "all");

  useEffect(() => {
    setLocalSearch(search);
    setLocalEmail(email);
    setLocalCountry(country);
    setLocalGroups(groups || "all");
  }, [search, email, country, groups]);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Search (username)
    if (localSearch) {
      params.set("search", localSearch);
    } else {
      params.delete("search");
    }
    
    // Email
    if (localEmail) {
      params.set("email", localEmail);
    } else {
      params.delete("email");
    }
    
    // Country
    if (localCountry) {
      params.set("country", localCountry);
    } else {
      params.delete("country");
    }
    
    // Groups
    if (localGroups && localGroups !== "all") {
      params.set("groups", localGroups);
    } else {
      params.delete("groups");
    }
    
    params.delete("pageNumber"); // Reset to page 1 when filtering
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };

  const getStatusBadge = (isActivated?: boolean) => {
    return isActivated ? (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
        <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
        Active
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
        <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
        Inactive
      </span>
    );
  };

  const filteredUsers = useMemo(() => {
    return users;
  }, [users]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#191C1E]">Users</h1>
          <p className="mt-1 text-sm text-[#565E74]">
            Manage users and their access permissions
          </p>
        </div>
        <button
          onClick={() => setOpenCreate(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
        >
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#8E95A9]">
                Total Users
              </p>
              <p className="mt-1 text-2xl font-bold text-[#191C1E]">
                {totalCount}
              </p>
            </div>
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
              <Users size={20} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#8E95A9]">
                Active
              </p>
              <p className="mt-1 text-2xl font-bold text-[#191C1E]">
                {users.filter(u => u.isActivated).length}
              </p>
            </div>
            <div className="rounded-xl bg-green-50 p-2.5 text-green-600">
              <Power size={20} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#8E95A9]">
                Inactive
              </p>
              <p className="mt-1 text-2xl font-bold text-[#191C1E]">
                {users.filter(u => !u.isActivated).length}
              </p>
            </div>
            <div className="rounded-xl bg-red-50 p-2.5 text-red-600">
              <PowerOff size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {/* Username Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E95A9]" />
            <input
              type="text"
              placeholder="Username..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-[#EFF0F4] py-2 pl-9 pr-3 text-sm text-[#191C1E] placeholder:text-[#8E95A9] focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          </div>

          {/* Email Search */}
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E95A9]" />
            <input
              type="email"
              placeholder="Email..."
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-[#EFF0F4] py-2 pl-9 pr-3 text-sm text-[#191C1E] placeholder:text-[#8E95A9] focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          </div>

          {/* Country Search */}
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E95A9]" />
            <input
              type="text"
              placeholder="Country..."
              value={localCountry}
              onChange={(e) => setLocalCountry(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-[#EFF0F4] py-2 pl-9 pr-3 text-sm text-[#191C1E] placeholder:text-[#8E95A9] focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          </div>

          {/* Group Filter */}
          <div className="relative">
            <UserCog size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E95A9]" />
            <select
              value={localGroups}
              onChange={(e) => setLocalGroups(e.target.value)}
              className="w-full rounded-lg border border-[#EFF0F4] py-2 pl-9 pr-8 text-sm text-[#191C1E] focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all appearance-none bg-white"
            >
              <option value="all">All Users</option>
              <option value="1">Managers</option>
              <option value="2">Employees</option>
            </select>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Filter size={18} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Dialogs - Lazy loaded */}
      <Suspense fallback={null}>
        <CreateUserDialog
          open={openCreate}
          onOpenChange={setOpenCreate}
        />
        <ToggleUserDialog
          user={selectedUser}
          open={openToggle}
          onOpenChange={setOpenToggle}
        />
      </Suspense>

      {/* Users Table */}
      <div className="rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#EFF0F4] overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-[#EFF0F4] bg-[#F8F9FC]">
                <th className="w-[18%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  User
                </th>
                <th className="w-[15%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  Email
                </th>
                <th className="w-[12%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  Phone
                </th>
                <th className="w-[12%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  Country
                </th>
                <th className="w-[10%] px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  Status
                </th>
                <th className="w-[33%] px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFF0F4]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Users size={48} className="text-[#D0D5DD]" />
                      <p className="mt-4 text-sm font-medium text-[#191C1E]">
                        No users found
                      </p>
                      <p className="text-sm text-[#565E74]">
                        Try adjusting your filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="group transition-colors hover:bg-[#F8F9FC]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {user.userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#191C1E] truncate">
                            {user.userName}
                          </p>
                          <p className="text-xs text-[#8E95A9]">
                            ID: #{String(user.id).padStart(4, "0")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Mail size={14} className="text-[#8E95A9] flex-shrink-0" />
                        <span className="text-sm text-[#565E74] truncate">
                          {user.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Phone size={14} className="text-[#8E95A9] flex-shrink-0" />
                        <span className="text-sm text-[#565E74]">
                          {user.phoneNumber || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#8E95A9] flex-shrink-0" />
                        <span className="text-sm text-[#565E74] capitalize">
                          {user.country || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(user.isActivated)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-0.5">
                        <button
                          aria-label="Toggle user status"
                          onClick={() => {
                            setSelectedUser(user);
                            setOpenToggle(true);
                          }}
                          className={`rounded-lg p-1.5 transition-all ${
                            user.isActivated
                              ? "text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                              : "text-green-600 hover:bg-green-50 hover:text-green-700"
                          }`}
                          title={user.isActivated ? "Deactivate" : "Activate"}
                        >
                          {user.isActivated ? (
                            <PowerOff size={16} />
                          ) : (
                            <Power size={16} />
                          )}
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}