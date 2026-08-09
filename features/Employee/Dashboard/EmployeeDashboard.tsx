"use client";
import dynamic from "next/dynamic";

import { Project } from "../Projects/Types/Types";
import { Task } from "../Tasks/Types/Types";
import DashboardStats from "./DashboardStats";
import {ChartSkeleton} from "@/Shared/Components/ChartSkeleton"
import {CardSkeleton} from "@/Shared/Components/ChartSkeleton"
const ActivityChart = dynamic(() => import("./ActivityChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

const StatusChart = dynamic(() => import("./StatusChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

const ProjectProgressChart = dynamic(
  () => import("./ProjectProgressChart"),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  }
);
const RecentTasks = dynamic(() => import("./RecentTasks"), {
  loading: () => <CardSkeleton />,
});

interface Props {
  projects: Project[];
  tasks: Task[];
}

export default function EmployeeDashboard({ projects, tasks }: Props) {
  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6 md:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
            Real-time overview of your projects and tasks
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-sm border border-gray-100">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] sm:text-xs font-medium text-gray-700">Live</span>
            <span className="text-[10px] sm:text-xs text-gray-400">•</span>
            <span className="text-[10px] sm:text-xs text-gray-400">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats projects={projects} tasks={tasks} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
        <div className="md:col-span-2">
          <ActivityChart tasks={tasks} />
        </div>
        <div>
          <StatusChart tasks={tasks} />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
        <div className="md:col-span-2">
          <RecentTasks tasks={tasks} />
        </div>
        <div>
          <ProjectProgressChart projects={projects} />
        </div>
      </div>
    </div>
  );
}