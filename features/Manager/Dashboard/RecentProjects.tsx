"use client";

import Link from "next/link";
import { Project } from "../Projects/Types/Types";
import { ChevronRight, FolderOpen, Calendar } from "lucide-react";

interface Props {
  projects: Project[];
}

export default function RecentProjects({ projects }: Props) {
  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.modificationDate).getTime() -
        new Date(a.modificationDate).getTime()
    )
    .slice(0, 4);

  const getProjectStatus = (project: Project) => {
    const total = project.task.length;
    const completed = project.task.filter((t) => t.status === "Done").length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    if (progress === 100) return { label: "Complete", color: "bg-emerald-100 text-emerald-700" };
    if (progress >= 70) return { label: "On Track", color: "bg-indigo-100 text-indigo-700" };
    if (progress >= 40) return { label: "In Progress", color: "bg-amber-100 text-amber-700" };
    return { label: "At Risk", color: "bg-red-100 text-red-700" };
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Recent Projects</h3>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Latest project updates</p>
          </div>
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All
            <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <div className="text-2xl sm:text-3xl mb-2">📁</div>
            <p className="text-xs sm:text-sm text-gray-400">No projects found</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {recentProjects.map((project) => {
              const status = getProjectStatus(project);
              const total = project.task.length;
              const completed = project.task.filter((t) => t.status === "Done").length;
              const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

              return (
                <div key={project.id} className="group flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-indigo-50 flex-shrink-0">
                    <FolderOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                        {project.title}
                      </h4>
                      <span className={`text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full ${status.color} self-start sm:self-center whitespace-nowrap`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mt-0.5 sm:mt-1">
                      <span className="text-[10px] sm:text-xs text-gray-500">
                        {total} {total === 1 ? 'task' : 'tasks'}
                      </span>
                      <span className="text-gray-300 text-[10px] sm:text-xs">•</span>
                      <span className="text-[10px] sm:text-xs text-gray-500">
                        {progress}% complete
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}