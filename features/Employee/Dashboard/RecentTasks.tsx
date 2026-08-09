"use client";

import Link from "next/link";
import { Task } from "../Tasks/Types/Types";
import {
  ChevronRight,
  CheckCircle2,
  CircleDashed,
  Clock3,
  CalendarDays,
  FolderKanban,
  ArrowUpRight,
  ListTodo,
} from "lucide-react";

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
    .slice(0, 5);

  const getStatus = (status: string) => {
    switch (status) {
      case "Done":
        return {
          text: "Completed",
          badge: "bg-emerald-50 text-emerald-700",
          dot: "bg-emerald-500",
          icon: <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
        };

      case "InProgress":
        return {
          text: "In Progress",
          badge: "bg-indigo-50 text-indigo-700",
          dot: "bg-indigo-500",
          icon: <Clock3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
        };

      default:
        return {
          text: "To Do",
          badge: "bg-slate-100 text-slate-600",
          dot: "bg-slate-400",
          icon: <CircleDashed className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
        };
    }
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
    }).format(new Date(date));

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border-b border-slate-100 p-4 sm:p-5 md:p-6">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">
            Recent Tasks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
            Latest activity across your projects
          </p>
        </div>
        <Link
          href="/dashboard/tasks"
          className="flex items-center gap-1 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 w-fit"
        >
          View All
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </div>

      {recentTasks.length === 0 ? (
        <div className="flex h-48 sm:h-56 md:h-72 flex-col items-center justify-center">
          <ListTodo className="mb-2 sm:mb-3 h-8 w-8 sm:h-10 sm:w-10 text-slate-300" />
          <p className="text-xs sm:text-sm text-slate-400">
            No recent tasks
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {recentTasks.map((task) => {
            const status = getStatus(task.status);

            return (
              <div
                key={task.id}
                className="
                  group
                  flex
                  flex-col sm:flex-row
                  items-start sm:items-center
                  justify-between
                  gap-3 sm:gap-4
                  p-4 sm:p-5
                  transition-all
                  duration-300
                  hover:bg-slate-50
                "
              >
                {/* Left */}
                <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
                  {/* Dot */}
                  <div
                    className={`
                      mt-1
                      h-2.5 w-2.5 sm:h-3 sm:w-3
                      rounded-full
                      flex-shrink-0
                      ${status.dot}
                    `}
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-slate-900 transition group-hover:text-indigo-600 truncate">
                      {task.title}
                    </h3>

                    <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                      {/* Project */}
                      <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-slate-600 whitespace-nowrap">
                        <FolderKanban className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="truncate max-w-[80px] sm:max-w-[120px]">
                          {task.project?.title ?? "No Project"}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400 whitespace-nowrap">
                        <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {formatDate(task.modificationDate)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1 sm:gap-1.5
                      rounded-full
                      px-2 sm:px-3
                      py-1 sm:py-1.5
                      text-[10px] sm:text-xs
                      font-medium
                      whitespace-nowrap
                      ${status.badge}
                    `}
                  >
                    {status.icon}
                    <span className="hidden xs:inline">{status.text}</span>

                  </span>

                  <ArrowUpRight
                    className="
                      h-4 w-4 sm:h-5 sm:w-5
                      text-slate-300
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-0.5 sm:group-hover:translate-x-1
                      group-hover:-translate-y-0.5 sm:group-hover:-translate-y-1
                      group-hover:opacity-100
                      flex-shrink-0
                    "
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}