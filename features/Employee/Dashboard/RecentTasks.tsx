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
          icon: <CheckCircle2 className="h-4 w-4" />,
        };

      case "InProgress":
        return {
          text: "In Progress",
          badge: "bg-indigo-50 text-indigo-700",
          dot: "bg-indigo-500",
          icon: <Clock3 className="h-4 w-4" />,
        };

      default:
        return {
          text: "To Do",
          badge: "bg-slate-100 text-slate-600",
          dot: "bg-slate-400",
          icon: <CircleDashed className="h-4 w-4" />,
        };
    }
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
    }).format(new Date(date));

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 p-6">

        <div>

          <h2 className="text-lg font-semibold text-slate-900">
            Recent Tasks
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest activity across your projects
          </p>

        </div>

        <Link
          href="/dashboard/tasks"
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>

      </div>

      {recentTasks.length === 0 ? (
        <div className="flex h-72 flex-col items-center justify-center">

          <ListTodo className="mb-3 h-10 w-10 text-slate-300" />

          <p className="text-sm text-slate-400">
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
                  items-center
                  justify-between
                  p-5
                  transition-all
                  duration-300
                  hover:bg-slate-50
                "
              >
                {/* Left */}

                <div className="flex items-start gap-4">

                  {/* Avatar */}

                  <div
                    className={`
                      mt-1
                      h-3
                      w-3
                      rounded-full
                      ${status.dot}
                    `}
                  />

                  <div>

                    <h3 className="font-medium text-slate-900 transition group-hover:text-indigo-600">
                      {task.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-3">

                      {/* Project */}

                      <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">

                        <FolderKanban className="h-3.5 w-3.5" />

                        {task.project?.title ?? "No Project"}

                      </div>

                      {/* Date */}

                      <div className="flex items-center gap-1 text-xs text-slate-400">

                        <CalendarDays className="h-3.5 w-3.5" />

                        {formatDate(task.modificationDate)}

                      </div>

                    </div>

                  </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-3">

                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      ${status.badge}
                    `}
                  >
                    {status.icon}
                    {status.text}
                  </span>

                  <ArrowUpRight
                    className="
                      h-5
                      w-5
                      text-slate-300
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                      group-hover:opacity-100
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