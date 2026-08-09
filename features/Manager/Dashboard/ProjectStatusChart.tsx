// features/Manager/Dashboard/ProjectStatusChart.tsx
"use client";

import { Project } from "../Projects/Types/Types";
import { Progress } from "@radix-ui/react-progress";

interface Props {
  projects: Project[];
}

export default function ProjectStatusChart({ projects }: Props) {
  const projectData = projects.slice(0, 6).map((project) => {
    const total = project.task.length;
    const completed = project.task.filter((t) => t.status === "Done").length;
    const inProgress = project.task.filter((t) => t.status === "InProgress").length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    return {
      name: project.title,
      progress,
      total,
      completed,
      inProgress,
    };
  });

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-emerald-500";
    if (progress >= 70) return "bg-indigo-500";
    if (progress >= 40) return "bg-amber-500";
    return "bg-gray-400";
  };

  const getStatusBadge = (progress: number) => {
    if (progress === 100) return { label: "Complete", color: "bg-emerald-100 text-emerald-700" };
    if (progress >= 70) return { label: "On Track", color: "bg-indigo-100 text-indigo-700" };
    if (progress >= 40) return { label: "In Progress", color: "bg-amber-100 text-amber-700" };
    return { label: "At Risk", color: "bg-red-100 text-red-700" };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Project Progress</h3>
            <p className="text-xs text-gray-500 mt-0.5">Task completion status</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-gray-600">Complete</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-xs text-gray-600">Active</span>
            </div>
          </div>
        </div>

        <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {projectData.map((item, index) => {
            const status = getStatusBadge(item.progress);
            return (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors truncate block">
                      {item.name.length > 30 ? item.name.substring(0, 30) + "..." : item.name}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">
                        {item.completed}/{item.total} tasks
                      </span>
                      {item.inProgress > 0 && (
                        <span className="text-xs text-blue-500">• {item.inProgress} in progress</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="text-sm font-bold text-gray-700 min-w-[40px] text-right">
                      {item.progress}%
                    </span>
                  </div>
                </div>
                <div className="relative w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(item.progress)}`}
                    style={{
                      width: `${item.progress}%`,
                      boxShadow: `0 2px 8px ${item.progress >= 70 ? 'rgba(79, 70, 229, 0.2)' : 'rgba(0,0,0,0.05)'}`,
                    }}
                  >
                    {item.progress > 0 && item.progress < 100 && (
                      <div className="absolute inset-0 overflow-hidden rounded-full">
                        <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}