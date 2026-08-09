"use client";
import dynamic from "next/dynamic";
import { Project } from "../Projects/Types/Types";
import { Task } from "../Tasks/Types/Types";
import {
  ChartSkeleton,
  CardSkeleton,
} from "@/Shared/Components/ChartSkeleton";
const ManagerStats = dynamic(() => import("./ManagerStats"));

const ProjectStatusChart = dynamic(
  () => import("./ProjectStatusChart"),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  }
);

const TaskStatusChart = dynamic(
  () => import("./TaskStatusChart"),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  }
);

const WeeklyActivity = dynamic(
  () => import("./WeeklyActivity"),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  }
);

const TeamPerformance = dynamic(
  () => import("./TeamPerformance"),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  }
);

const RecentProjects = dynamic(
  () => import("./RecentProjects"),
  {
    loading: () => <CardSkeleton />,
  }
);

const RecentTasks = dynamic(
  () => import("./RecentTasks"),
  {
    loading: () => <CardSkeleton />,
  }
);

interface Props {
  projects: Project[];
  tasks: Task[];
}

export default function ManagerDashboard({ projects, tasks }: Props) {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Manager Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time overview of projects, tasks, and team performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-medium text-gray-700">Live</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <ManagerStats projects={projects} tasks={tasks} />
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <WeeklyActivity tasks={tasks} />
        </div>
        <div>
          <TaskStatusChart tasks={tasks} />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <ProjectStatusChart projects={projects} />
        </div>
        <div>
          <TeamPerformance tasks={tasks} projects={projects} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentProjects projects={projects} />
        <RecentTasks tasks={tasks} />
      </div>
    </div>
  );
}