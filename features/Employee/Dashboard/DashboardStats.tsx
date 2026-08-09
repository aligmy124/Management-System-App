"use client";

import { Project } from "../Projects/Types/Types";
import { Task } from "../Tasks/Types/Types";
import { 
  FolderKanban, 
  ListTodo, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface Props {
  projects: Project[];
  tasks: Task[];
}

export default function DashboardStats({ projects, tasks }: Props) {
  const totalTasks = tasks.length;
  const completed = tasks.filter((t) => t.status === "Done").length;
  const inProgress = tasks.filter((t) => t.status === "InProgress").length;
  const completionRate = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
  
  // Calculate trend (mock - would be real data in production)
  const previousCompletionRate = completionRate - 5;

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "#4F46E5",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      trend: "+12%",
      trendUp: true,
    },
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      color: "#7C3AED",
      bg: "bg-purple-50",
      border: "border-purple-100",
      trend: "+8%",
      trendUp: true,
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "#059669",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      trend: `${completionRate - previousCompletionRate > 0 ? '+' : ''}${completionRate - previousCompletionRate}%`,
      trendUp: completionRate >= previousCompletionRate,
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock,
      color: "#D97706",
      bg: "bg-amber-50",
      border: "border-amber-100",
      trend: `${Math.round((inProgress / totalTasks) * 100)}%`,
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border ${stat.border} hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-1 sm:mt-2 tracking-tight truncate">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${stat.bg} flex-shrink-0`}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: stat.color }} />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1 sm:gap-2">
              <span className={`text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                stat.trendUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
              }`}>
                {stat.trendUp ? '↑' : '↓'} {stat.trend}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400 truncate">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}