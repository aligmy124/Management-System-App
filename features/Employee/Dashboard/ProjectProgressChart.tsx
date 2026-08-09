"use client";

import { FolderOpen, Clock3, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Project } from "../Projects/Types/Types";

interface Props {
  projects: Project[];
}

export default function ProjectProgressChart({ projects }: Props) {
  const data = projects.slice(0, 5).map((project) => {
    const total = project.task.length;
    const completed = project.task.filter((t) => t.status === "Done").length;

    const progress =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      id: project.id,
      title: project.title,
      completed,
      total,
      progress,
      updated: project.modificationDate,
    };
  });

  const getStatus = (progress: number) => {
    if (progress === 100)
      return {
        text: "Completed",
        badge: "bg-emerald-50 text-emerald-700",
        color: "#10B981",
      };

    if (progress >= 70)
      return {
        text: "On Track",
        badge: "bg-indigo-50 text-indigo-700",
        color: "#6366F1",
      };

    if (progress >= 40)
      return {
        text: "In Progress",
        badge: "bg-amber-50 text-amber-700",
        color: "#F59E0B",
      };

    return {
      text: "Delayed",
      badge: "bg-rose-50 text-rose-700",
      color: "#F43F5E",
    };
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-7 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Project Progress
          </h2>

          <p className="text-sm text-slate-500">
            Overview of active projects
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {projects.length} Projects
        </span>
      </div>

      <div className="space-y-5">

        {data.map((project) => {
          const status = getStatus(project.progress);

          return (
            <div
              key={project.id}
              className="
                rounded-2xl
                border
                border-slate-200
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-indigo-200
                hover:shadow-lg
              "
            >
              <div className="flex justify-between">

                {/* Left */}

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50">
                    <FolderOpen className="h-6 w-6 text-indigo-600" />
                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-900">
                      {project.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${status.badge}`}
                      >
                        {status.text}
                      </span>

                      <span className="text-xs text-slate-400">
                        {project.completed}/{project.total} Tasks
                      </span>

                    </div>
                  </div>
                </div>

                {/* Progress Circle */}

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full font-bold"
                  style={{
                    background: `${status.color}15`,
                    color: status.color,
                  }}
                >
                  {project.progress}%
                </div>
              </div>

              {/* Progress */}

              <div className="mt-5">

                <div className="mb-2 flex justify-between text-xs">

                  <span className="text-slate-500">
                    Completion
                  </span>

                  <span className="font-medium text-slate-700">
                    {project.completed} of {project.total}
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${project.progress}%`,
                      background: `linear-gradient(90deg, ${status.color}, ${status.color}CC)`,
                    }}
                  />

                </div>

              </div>

              {/* Footer */}

              <div className="mt-4 flex items-center justify-between">

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock3 className="h-4 w-4" />
                  Updated{" "}
                  {formatDistanceToNow(new Date(project.updated), {
                    addSuffix: true,
                  })}
                </div>

                {project.progress === 100 && (
                  <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Finished
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}