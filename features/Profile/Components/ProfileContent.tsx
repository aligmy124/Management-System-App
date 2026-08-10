"use client";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Clock,
  User,
  CheckCircle,
} from "lucide-react";
import { CurrentUser } from "@/features/Auth/CurrentUser/Context/UserContext";
import Link from "next/link";

interface Props {
  user: CurrentUser | null;
}

export default function ProfileContent({ user }: Props) {
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading profile...</p>
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const infoItems = [
    { icon: Mail, label: "Email", value: user.email || "N/A" },
    { icon: Phone, label: "Phone", value: user.phoneNumber || "N/A" },
    { icon: MapPin, label: "Country", value: user.country ? user.country.charAt(0).toUpperCase() + user.country.slice(1) : "N/A" },
    { icon: Building2, label: "Department", value: user.group?.name || "N/A" },
    { icon: Calendar, label: "Joined", value: formatDate(user.creationDate) },
    { icon: Clock, label: "Last Active", value: formatDate(user.modificationDate) },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Your personal information</p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Dashboard →
        </Link>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-700">
                {getInitials(user.userName)}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-gray-900">{user.userName}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-sm text-gray-500">{user.group?.name || "Employee"}</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  <CheckCircle size={12} />
                  {user.isActivated ? "Active" : "Inactive"}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">ID: #{user.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500">
                <item.icon size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}