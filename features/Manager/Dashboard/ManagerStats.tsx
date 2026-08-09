// features/Manager/Dashboard/ManagerStats.tsx
"use client";

import { Project } from "../Projects/Types/Types";
import { Task } from "../Tasks/Types/Types";
import { 
  FolderKanban, 
  ListTodo, 
  CheckCircle, 
  Clock,
  Users,
  TrendingUp,
  AlertCircle
} from "lucide-react";

interface Props {
  projects: Project[];
  tasks: Task[];
}

export default function ManagerStats({ projects, tasks }: Props) {
  const totalTasks = tasks.length;
  const completed = tasks.filter((t) => t.status === "Done").length;
  const inProgress = tasks.filter((t) => t.status === "InProgress").length;
  const todo = tasks.filter((t) => t.status === "ToDo").length;
  const completionRate = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
  
  // Get unique employees
  const uniqueEmployees = new Set(tasks.map(t => t.employee?.id)).size;
  
  // Projects with tasks
  const activeProjects = projects.filter(p => p.task.length > 0).length;

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "#4F46E5",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      trend: `${activeProjects} active`,
    },
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      color: "#7C3AED",
      bg: "bg-purple-50",
      border: "border-purple-100",
      trend: `${todo} todo • ${inProgress} in progress`,
    },
    {
      label: "Team Members",
      value: uniqueEmployees,
      icon: Users,
      color: "#059669",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      trend: "Active team",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "#D97706",
      bg: "bg-amber-50",
      border: "border-amber-100",
      trend: `${completed} tasks completed`,
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock,
      color: "#2563EB",
      bg: "bg-blue-50",
      border: "border-blue-100",
      trend: `${Math.round((inProgress / totalTasks) * 100) || 0}% of tasks`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border ${stat.border} hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1.5 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-1 truncate">{stat.trend}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.bg} flex-shrink-0 ml-2`}>
                <Icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}