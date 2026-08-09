"use client";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Building2,
  Briefcase,
  CheckCircle,
  Clock,
  User,
  Award,
  TrendingUp,
} from "lucide-react";
import { CurrentUser } from "@/features/Auth/CurrentUser/Context/UserContext";
import Image from "next/image";
import Link from "next/link"
interface Props {
  user: CurrentUser | null;
}

export default function ProfileContent({ user }: Props) {
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-[#8E95A9]">Loading profile...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = () => {
    if (!user?.userName) return "U";
    return user.userName.charAt(0).toUpperCase();
  };

  const getFullImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `https://upskilling-egypt.com:3003/${path}`;
  };

  // const imageUrl = getFullImageUrl(user.imagePath);

  return (
    <div className="max-w-5xl mx-auto my-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#191C1E]">Personal Information</h1>
        <Link href="/dashboard" className="btn-primary">Dashboard</Link>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-[#EFF0F4] overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-20 w-20 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
                {user?.userName?.charAt(0) || "U"}
              </div>
            </div>

            {/* Name & Title */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-[#191C1E]">{user.userName}</h2>
              <p className="text-sm text-[#565E74]">{user.group?.name || "Employee"}</p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1.5 text-[#565E74]">
                  <User size={14} className="text-[#8E95A9]" />
                  <span className="text-xs text-[#8E95A9]">ID:</span>
                  #{user.id}
                </span>
                <span className="flex items-center gap-1.5 text-[#565E74]">
                  <Building2 size={14} className="text-[#8E95A9]" />
                  {user.group?.name || "Employee"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  {user.isActivated ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="px-6 pt-4">
          <p className="text-sm text-[#565E74] leading-relaxed">
            Product designer with 8+ years of experience focused on design systems and enterprise user experiences. Leading the internal tools team at ProjectFlow.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div className="flex items-center gap-3 rounded-lg border border-[#F0F1F5] p-3">
            <div className="rounded-lg bg-[#F8F9FC] p-2 text-[#8E95A9]">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-xs text-[#8E95A9]">Email</p>
              <p className="text-sm font-medium text-[#191C1E]">{user.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-[#F0F1F5] p-3">
            <div className="rounded-lg bg-[#F8F9FC] p-2 text-[#8E95A9]">
              <Phone size={16} />
            </div>
            <div>
              <p className="text-xs text-[#8E95A9]">Phone Number</p>
              <p className="text-sm font-medium text-[#191C1E]">{user.phoneNumber || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-[#F0F1F5] p-3">
            <div className="rounded-lg bg-[#F8F9FC] p-2 text-[#8E95A9]">
              <MapPin size={16} />
            </div>
            <div>
              <p className="text-xs text-[#8E95A9]">Country</p>
              <p className="text-sm font-medium text-[#191C1E]">
                {user.country ? user.country.charAt(0).toUpperCase() + user.country.slice(1) : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-[#F0F1F5] p-3">
            <div className="rounded-lg bg-[#F8F9FC] p-2 text-[#8E95A9]">
              <Calendar size={16} />
            </div>
            <div>
              <p className="text-xs text-[#8E95A9]">Joined</p>
              <p className="text-sm font-medium text-[#191C1E]">{formatDate(user.creationDate)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-[#F0F1F5] p-3">
            <div className="rounded-lg bg-[#F8F9FC] p-2 text-[#8E95A9]">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-xs text-[#8E95A9]">Last Active</p>
              <p className="text-sm font-medium text-[#191C1E]">{formatDate(user.modificationDate)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-[#F0F1F5] p-3">
            <div className="rounded-lg bg-[#F8F9FC] p-2 text-[#8E95A9]">
              <Briefcase size={16} />
            </div>
            <div>
              <p className="text-xs text-[#8E95A9]">Department</p>
              <p className="text-sm font-medium text-[#191C1E]">{user.group?.name || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1">
        <button className="btn-primary">
          Change Password
        </button>
      </div>
    </div>
  );
}