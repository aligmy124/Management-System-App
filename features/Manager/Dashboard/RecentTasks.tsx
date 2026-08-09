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
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Recent Tasks</h3>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Latest task updates</p>
          </div>
          <Link
            href="/dashboard/tasks"
            className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All
            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Link>
        </div>

        {recentTasks.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <div className="text-2xl sm:text-3xl mb-2">📋</div>
            <p className="text-xs sm:text-sm text-gray-400">No tasks found</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100 gap-2 sm:gap-3"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                    {task.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5">
                    <span className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[60px] sm:max-w-[100px]">
                      {task.project?.title || "No Project"}
                    </span>
                    <span className="text-gray-300 text-[10px] sm:text-xs hidden xs:inline">•</span>
                    <span className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[50px] sm:max-w-[80px] hidden xs:inline">
                      {task.employee?.userName || "Unassigned"}
                    </span>
                    <span className="text-gray-300 text-[10px] sm:text-xs hidden sm:inline">•</span>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-gray-400 hidden sm:flex">
                      <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span>{getTimeAgo(task.modificationDate)}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`ml-0 sm:ml-3 rounded-full px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-medium border ${getStatusColor(
                    task.status
                  )} whitespace-nowrap self-start sm:self-center`}
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