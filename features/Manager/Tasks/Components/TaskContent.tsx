"use client";
import React, { useState, Suspense } from "react";
import { Task } from "../Types/Types";
import { 
  Pencil, 
  Trash2, 
  Search, 
  Filter, 
  Plus,
  CheckCircle,
  Clock,
  Circle,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load dialogs with dynamic imports
const DeleteTask = dynamic(
  () => import("@/features/Manager/Tasks/Components/Dialog/DeleteDialog"),
  {
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <span className="text-sm font-medium text-gray-700">Loading...</span>
          </div>
        </div>
      </div>
    ),
  }
);

const EditTaskDialog = dynamic(
  () => import("@/features/Manager/Tasks/Components/Dialog/EditTaskDialog"),
  {
    loading: () => (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <span className="text-sm font-medium text-gray-700">Loading...</span>
          </div>
        </div>
      </div>
    ),
  }
);

interface Props {
  tasks: Task[];
  search: string;
  statusFilter: string;
  totalTasks?: number;
}

export default function TaskManagerContent({
  tasks,
  search,
  statusFilter,
  totalTasks = 0,
}: Props) {
  // Get unique employees from tasks
  const employees = tasks.map((task) => task.employee).filter(Boolean);
  const uniqueEmployees = Array.from(
    new Map(employees.map((employee) => [employee?.id, employee])).values()
  );

  // Dialog states
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [onDelete, setOnDelete] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  
  // Task states
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [localSearch, setLocalSearch] = useState(search);
  const [localStatusFilter, setLocalStatusFilter] = useState(statusFilter || "All");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ToDo":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "InProgress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Done":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ToDo":
        return Circle;
      case "InProgress":
        return PlayCircle;
      case "Done":
        return CheckCircle;
      default:
        return Circle;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ToDo":
        return "To Do";
      case "InProgress":
        return "In Progress";
      case "Done":
        return "Done";
      default:
        return status;
    }
  };

  const toggleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(t => t.id));
    }
  };

  const toggleSelectTask = (id: number) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter(t => t !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const statusColors = {
    ToDo: "bg-gray-100 text-gray-700",
    InProgress: "bg-blue-100 text-blue-700",
    Done: "bg-green-100 text-green-700",
  };

  const statusIcons = {
    ToDo: Circle,
    InProgress: PlayCircle,
    Done: CheckCircle,
  };

  const filters = ["All", "ToDo", "InProgress", "Done"];

  // Filter tasks based on search and status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(localSearch.toLowerCase()) ||
                          task.description.toLowerCase().includes(localSearch.toLowerCase());
    const matchesStatus = localStatusFilter === "All" || task.status === localStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
            Manage and monitor all tasks across your projects
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
          <Link href="/dashboard/tasks/create-task" className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]">
            <Plus size={16} className="sm:h-[18px] sm:w-[18px]" />
            New Task
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-4">
        <div className="rounded-lg sm:rounded-xl bg-white p-3 sm:p-4 shadow-sm border border-gray-100">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-400">Total</p>
          <p className="mt-0.5 sm:mt-1 text-xl sm:text-2xl font-bold text-gray-900">{totalTasks || tasks.length}</p>
        </div>
        <div className="rounded-lg sm:rounded-xl bg-white p-3 sm:p-4 shadow-sm border border-gray-100">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-400">To Do</p>
          <p className="mt-0.5 sm:mt-1 text-xl sm:text-2xl font-bold text-gray-700">{tasks.filter(t => t.status === "ToDo").length}</p>
        </div>
        <div className="rounded-lg sm:rounded-xl bg-white p-3 sm:p-4 shadow-sm border border-gray-100">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-400">In Progress</p>
          <p className="mt-0.5 sm:mt-1 text-xl sm:text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === "InProgress").length}</p>
        </div>
        <div className="rounded-lg sm:rounded-xl bg-white p-3 sm:p-4 shadow-sm border border-gray-100">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-gray-400">Done</p>
          <p className="mt-0.5 sm:mt-1 text-xl sm:text-2xl font-bold text-green-600">{tasks.filter(t => t.status === "Done").length}</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Filter size={16} className="sm:h-[18px] sm:w-[18px] text-gray-400" />
          <span className="text-xs sm:text-sm font-medium text-gray-600">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setLocalStatusFilter(filter)}
              className={`rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-sm font-medium transition-all ${
                localStatusFilter === filter
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-600/20"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter === "ToDo" ? "To Do" : filter === "InProgress" ? "In Progress" : filter}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="relative w-full sm:w-48">
            <Search size={16} className="sm:h-[18px] sm:w-[18px] absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full sm:w-48 rounded-lg border border-gray-200 py-1.5 pl-8 sm:pl-9 pr-3 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Dialogs - Lazy loaded */}
      <Suspense fallback={null}>
        <DeleteTask
          task={selectedTask}
          open={onDelete}
          setOpenChange={setOnDelete}
        />
        <EditTaskDialog
          task={selectedTask}
          open={onEdit}
          onOpenChange={setOnEdit}
          employees={uniqueEmployees}
        />
      </Suspense>

      {/* Table */}
      <div className="rounded-xl sm:rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-fixed min-w-[640px] sm:min-w-[768px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-3 sm:px-4 py-2.5 sm:py-3.5 w-10 sm:w-12">
                  <input
                    type="checkbox"
                    checked={selectedTasks.length === tasks.length && tasks.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 w-[18%] sm:w-[20%]">
                  Task
                </th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 w-[13%] sm:w-[15%]">
                  Project
                </th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 w-[15%] sm:w-[17%]">
                  Status
                </th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 w-[13%] sm:w-[15%]">
                  Manager
                </th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 w-[13%] sm:w-[15%]">
                  Employee
                </th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3.5 text-right text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 w-[10%] sm:w-[11%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-gray-100 p-3 sm:p-4 mb-2 sm:mb-3">
                        <Search size={24} className="sm:h-8 sm:w-8 text-gray-400" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-900">No tasks found</p>
                      <p className="text-xs sm:text-sm text-gray-500">Try adjusting your filters or search terms.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => {
                  const StatusIcon = getStatusIcon(task.status);
                  // Get manager from project
                  const manager = task.project?.manager;
                  
                  // Determine icon color based on status
                  const iconColor = 
                    task.status === "ToDo" ? "text-gray-500" :
                    task.status === "InProgress" ? "text-blue-500" :
                    "text-green-500";
                  
                  return (
                    <tr
                      key={task.id}
                      className="group transition-colors hover:bg-gray-50/50"
                    >
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task.id)}
                          onChange={() => toggleSelectTask(task.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{task.title}</p>
                          <p className="hidden xs:block mt-0.5 text-[10px] sm:text-xs text-gray-500 truncate">{task.description}</p>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                        <span className="text-xs sm:text-sm text-gray-600 truncate block">{task.project?.title || "-"}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-xs font-medium ${getStatusColor(task.status)}`}
                        >
                          <StatusIcon 
                            size={12} 
                            className={`sm:h-3.5 sm:w-3.5 ${iconColor}`}
                            fill={
                              task.status === "ToDo" ? "none" :
                              task.status === "InProgress" ? "currentColor" :
                              "currentColor"
                            }
                          />
                          {getStatusLabel(task.status)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-medium flex-shrink-0">
                            {manager?.userName?.charAt(0)?.toUpperCase() || "M"}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600 truncate max-w-[40px] sm:max-w-[80px]">{manager?.userName || "-"}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-medium flex-shrink-0">
                            {task.employee?.userName?.charAt(0)?.toUpperCase() || "E"}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-600 truncate max-w-[40px] sm:max-w-[80px]">{task.employee?.userName || "-"}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3.5">
                        <div className="flex items-center justify-end gap-0.5">
                          <button
                            className="rounded-lg p-1 sm:p-1.5 text-gray-400 transition-all hover:bg-blue-50 hover:text-blue-600"
                            title="Edit"
                            onClick={() => {
                              setSelectedTask(task);
                              setOnEdit(true);
                            }}
                          >
                            <Pencil size={14} className="sm:h-4 sm:w-4" />
                          </button>
                          <button
                            className="rounded-lg p-1 sm:p-1.5 text-gray-400 transition-all hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                            onClick={() => {
                              setSelectedTask(task);
                              setOnDelete(true);
                            }}
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