// features/Manager/Dashboard/RecentTasks.tsx
"use client";

import Link from "next/link";
import { Task } from "../Tasks/Types/Types";
import { ChevronRight, Clock } from "lucide-react";

interface Props {
  tasks: Task[];
}

export default function RecentTasks({ tasks }: Props) {
  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.modificationDate).getTime() -
        new Date(a.modificationDate).getTime()
    )
    .slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "InProgress":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getTimeAgo = (date: string) => {
    const diff = new Date().getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Recent Tasks</h3>
            <p className="text-xs text-gray-500 mt-0.5">Latest task updates</p>
          </div>
          <Link
            href="/dashboard/tasks"
            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-2">📋</div>
            <p className="text-sm text-gray-400">No tasks found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500 truncate">
                      {task.project?.title || "No Project"}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500 truncate">
                      {task.employee?.userName || "Unassigned"}
                    </span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{getTimeAgo(task.modificationDate)}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusColor(
                    task.status
                  )} whitespace-nowrap`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}