"use client";
import {
  FolderKanban,
  Clock,
  Hourglass,
  Filter,
  Plus,
  CheckCircle,
  Clock as ClockIcon,
  Eye,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Project } from "../Types/Types";
import { Task } from "../Types/Types";
import Link from "next/link";

const DialogDemo = dynamic(() => import("@/features/Manager/Projects/Components/Dialog/DialogDemo"));
const EditDialogDemo = dynamic(() => import("@/features/Manager/Projects/Components/Dialog/EditDialog"));

interface Props {
  Projects: Project[];
  search?: string;
}

export default function ManagerProjectsContent({ Projects, search }: Props) {
  // modals
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // For client-side search fallback
  const [clientSearchTerm, setClientSearchTerm] = useState(search || "");
  const [localSearch, setLocalSearch] = useState(search || "");

  // Sync client search with URL search param
  useEffect(() => {
    setClientSearchTerm(search || "");
    setLocalSearch(search || "");
  }, [search]);

  // Calculate stats from projects data
  const totalProjects = Projects.length;
  const totalTasks = Projects.reduce(
    (acc, project) => acc + project.task.length,
    0
  );
  const totalHours = Projects.reduce(
    (acc, project) => acc + project.task.length * 4,
    0
  );

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects.toString(),
      icon: FolderKanban,
      color: "blue",
    },
    {
      label: "Ongoing Tasks",
      value: totalTasks.toString(),
      icon: Clock,
      color: "green",
    },
    {
      label: "Hours Logged",
      value: totalHours.toLocaleString(),
      icon: Hourglass,
      color: "orange",
    },
  ];

  const statusColors = {
    ToDo: "bg-gray-100 text-gray-700",
    InProgress: "bg-blue-100 text-blue-700",
    Done: "bg-green-100 text-green-700",
  };

  const statusIcons = {
    ToDo: ClockIcon,
    InProgress: ClockIcon,
    Done: CheckCircle,
  };

  const filters = ["All", "ToDo", "InProgress", "Done"];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ToDo":
        return "To Do";
      case "InProgress":
        return "In Progress";
      case "Done":
        return "Completed";
      default:
        return status;
    }
  };

  const getProgressFromTasks = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const doneTasks = tasks.filter((t) => t.status === "Done").length;
    return Math.round((doneTasks / tasks.length) * 100);
  };

  const getProjectStatus = (tasks: Task[]) => {
    if (tasks.length === 0) return "ToDo";
    const allDone = tasks.every((t) => t.status === "Done");
    if (allDone) return "Done";
    const hasInProgress = tasks.some((t) => t.status === "InProgress");
    if (hasInProgress) return "InProgress";
    return "ToDo";
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "from-green-500 to-green-400";
    if (progress >= 40) return "from-blue-500 to-blue-400";
    return "from-orange-500 to-orange-400";
  };

  // Filter projects based on status AND search
  const filteredProjects = Projects.filter((project) => {
    const projectStatus = getProjectStatus(project.task);
    const matchesFilter = activeFilter === "All" || projectStatus === activeFilter;

    const searchTerm = localSearch || clientSearchTerm || search || "";
    const matchesSearch =
      !searchTerm ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#191C1E]">My Projects</h1>
          <p className="text-xs sm:text-sm text-[#565E74] mt-0.5 sm:mt-1">
            Manage and monitor the progress of your active workflows.
          </p>
        </div>
        <Link
          href="/dashboard/projects/create-project"
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] self-start sm:self-auto"
        >
          <Plus size={16} className="sm:h-[18px] sm:w-[18px]" />
          Create Project
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-[#8E95A9]">
                  {stat.label}
                </p>
                <p className="mt-0.5 sm:mt-1 text-xl sm:text-2xl font-bold text-[#191C1E] truncate">
                  {stat.value}
                </p>
              </div>
              <div
                className={`rounded-lg sm:rounded-xl p-2 sm:p-2.5 flex-shrink-0 ${
                  stat.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : stat.color === "green"
                    ? "bg-green-50 text-green-600"
                    : stat.color === "purple"
                    ? "bg-purple-50 text-purple-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                <stat.icon size={18} className="sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Filter size={16} className="sm:h-[18px] sm:w-[18px] text-[#8E95A9]" />
          <span className="text-xs sm:text-sm font-medium text-[#565E74]">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-600/20"
                  : "text-[#565E74] hover:bg-[#f2f4f6]"
              }`}
            >
              {filter === "ToDo"
                ? "To Do"
                : filter === "InProgress"
                ? "In Progress"
                : filter}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative w-full sm:w-48">
            <Search size={16} className="sm:h-[18px] sm:w-[18px] absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-[#8E95A9]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full sm:w-48 rounded-lg border border-[#EFF0F4] py-1.5 pl-8 sm:pl-9 pr-3 text-xs sm:text-sm text-[#191C1E] placeholder:text-[#8E95A9] focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <DialogDemo
        project={selectedProject}
        open={openDelete}
        onOpenChange={setOpenDelete}
      />
      <EditDialogDemo
        project={selectedProject}
        open={openEdit}
        onOpenChange={setOpenEdit}
      />

      {/* Projects Table */}
      <div className="rounded-xl sm:rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#EFF0F4] overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-fixed min-w-[640px] sm:min-w-[768px]">
            <thead>
              <tr className="border-b border-[#EFF0F4] bg-[#F8F9FC]">
                <th className="w-[22%] sm:w-[25%] px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  Project
                </th>
                <th className="w-[8%] sm:w-[10%] px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  ID
                </th>
                <th className="w-[13%] sm:w-[15%] px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  Status
                </th>
                <th className="w-[16%] sm:w-[18%] px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  Progress
                </th>
                <th className="w-[8%] sm:w-[10%] px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  Tasks
                </th>
                <th className="w-[20%] sm:w-[22%] px-3 sm:px-6 py-2.5 sm:py-3.5 text-right text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8E95A9]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFF0F4]">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                    <div className="flex flex-col items-center">
                      <FolderKanban size={36} className="sm:h-12 sm:w-12 text-[#D0D5DD]" />
                      <p className="mt-3 sm:mt-4 text-sm font-medium text-[#191C1E]">
                        No projects found
                      </p>
                      <p className="text-xs sm:text-sm text-[#565E74]">
                        {localSearch ? `No results for "${localSearch}"` : "Try adjusting your filters."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const projectStatus = getProjectStatus(project.task);
                  const progress = getProgressFromTasks(project.task);
                  const StatusIcon =
                    statusIcons[projectStatus as keyof typeof statusIcons] ||
                    ClockIcon;

                  return (
                    <tr
                      key={project.id}
                      className="group transition-colors hover:bg-[#F8F9FC]"
                    >
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-[#191C1E] truncate">
                            {project.title}
                          </p>
                          <p className="hidden xs:block text-[10px] sm:text-xs text-[#565E74] truncate">
                            {project.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span className="text-xs sm:text-sm font-medium text-[#565E74]">
                          #{String(project.id).padStart(4, "0")}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span
                          className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-xs font-medium ${
                            statusColors[
                              projectStatus as keyof typeof statusColors
                            ]
                          }`}
                        >
                          <StatusIcon size={12} />
                          {getStatusLabel(projectStatus)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="flex-1 max-w-[50px] sm:max-w-[100px]">
                            <div className="h-1 sm:h-1.5 w-full overflow-hidden rounded-full bg-[#EFF0F4]">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(progress)} transition-all duration-500`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-[#191C1E] min-w-[30px] sm:min-w-[40px]">
                            {progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-[#F8F9FC] px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-medium text-[#565E74]">
                          {project.task.length}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center justify-end gap-0.5">
                          <button
                            aria-label="Edit project"
                            onClick={() => {
                              setSelectedProject(project);
                              setOpenEdit(true);
                            }}
                            className="rounded-lg p-1 sm:p-1.5 text-[#8E95A9] transition-all hover:bg-blue-50 hover:text-blue-600"
                            title="Edit"
                          >
                            <Pencil size={14} className="sm:h-4 sm:w-4" />
                          </button>
                          <button
                            aria-label="Delete project"
                            onClick={() => {
                              setSelectedProject(project);
                              setOpenDelete(true);
                            }}
                            className="rounded-lg p-1 sm:p-1.5 text-[#8E95A9] transition-all hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 size={14} className="sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}