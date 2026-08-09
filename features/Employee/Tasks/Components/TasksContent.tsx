// TasksContent.tsx - Updated with Action integration
"use client";
import {
  Search,
  Filter,
  Plus,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  GripVertical,
  CheckCircle,
  Circle,
  Clock as ClockIcon,
} from "lucide-react";
import { useState } from "react";
import { Task } from "../Types/Types";
import { toast } from "sonner";
import { updateTaskStatusAction } from "../Actions/TaskAction";

interface Props {
  tasks: Task[];
  onTaskUpdate?: () => void;
}

export default function TasksContent({
  tasks: initialTasks,
  onTaskUpdate,
}: Props) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const columns = [
    { id: "ToDo", title: "To Do", icon: Circle, color: "gray" },
    { id: "InProgress", title: "In Progress", icon: ClockIcon, color: "blue" },

    { id: "Done", title: "Done", icon: CheckCircle, color: "green" },
  ];

  const statusColors = {
    ToDo: "bg-gray-100 text-gray-700 border-gray-200",
    InProgress: "bg-blue-100 text-blue-700 border-blue-200",

    Done: "bg-green-100 text-green-700 border-green-200",
  };

  const progressColors = {
    ToDo: "from-gray-400 to-gray-300",
    InProgress: "from-blue-500 to-blue-400",

    Done: "from-green-500 to-green-400",
  };

  const statusIcons = {
    ToDo: Circle,
    InProgress: ClockIcon,
    Done: CheckCircle,
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

  const getProgressFromTasks = (task: Task) => {
    const statusMap: Record<string, number> = {
      ToDo: 0,
      InProgress: 50,
      Done: 100,
    };
    return statusMap[task.status] || 0;
  };

  const getLastUpdated = (task: Task) => {
    const date = new Date(task.modificationDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // Filter tasks based on status and search
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      activeFilter === "All" || task.status === activeFilter;
    const matchesSearch =
      task?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task?.project?.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Drag and Drop state
  const [draggedTask, setDraggedTask] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = async (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(null);

    if (draggedTask === null) return;

    const taskIndex = tasks.findIndex((t) => t.id === draggedTask);
    if (taskIndex === -1) return;

    const currentTask = tasks[taskIndex];

    // Don't update if status is the same
    if (currentTask.status === columnId) {
      setDraggedTask(null);
      return;
    }

    // Optimistically update UI
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      status: columnId,
    };
    setTasks(updatedTasks);
    setIsUpdating(draggedTask);

    try {
      // Call the server action
      const result = await updateTaskStatusAction(draggedTask, columnId);

      if (result.success) {
        toast.success(
          result.message || `Task moved to ${getStatusLabel(columnId)}`,
        );
        // Refresh data from server
        if (onTaskUpdate) {
          onTaskUpdate();
        }
      } else {
        // Revert on error
        const revertedTasks = [...tasks];
        revertedTasks[taskIndex] = currentTask;
        setTasks(revertedTasks);
        toast.error(result.message || "Failed to update task status");
      }
    } catch (error) {
      // Revert on error
      const revertedTasks = [...tasks];
      revertedTasks[taskIndex] = currentTask;
      setTasks(revertedTasks);
      toast.error("Failed to update task status");
    } finally {
      setDraggedTask(null);
      setIsUpdating(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#191C1E]">My Tasks</h1>
          <p className="mt-1 text-sm text-[#565E74]">
            Manage and track your active task items across all workspace
            projects.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-[#8E95A9]" />
          <span className="text-sm font-medium text-[#565E74]">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
          ria-label="More options"
            onClick={() => setActiveFilter("All")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              activeFilter === "All"
                ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-600/20"
                : "text-[#565E74] hover:bg-[#f2f4f6]"
            }`}
          >
            All
          </button>
          {columns.map((column) => (
            <button
            ria-label="More options"
              key={column.id}
              onClick={() => setActiveFilter(column.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                activeFilter === column.id
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-600/20"
                  : "text-[#565E74] hover:bg-[#f2f4f6]"
              }`}
            >
              {column.title}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E95A9]"
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border border-[#EFF0F4] py-1.5 pl-9 pr-3 text-sm text-[#191C1E] placeholder:text-[#8E95A9] focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          const isDragOver = dragOverColumn === column.id;
          const Icon = column.icon;

          return (
            <div
              key={column.id}
              className={`rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all ${
                isDragOver
                  ? "ring-2 ring-blue-500 ring-offset-2 bg-blue-50/50"
                  : ""
              }`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon
                    size={18}
                    className={`${
                      column.color === "gray"
                        ? "text-gray-500"
                        : column.color === "blue"
                          ? "text-blue-500"
                          : column.color === "purple"
                            ? "text-purple-500"
                            : "text-green-500"
                    }`}
                  />
                  <h2 className="font-semibold text-[#191C1E]">
                    {column.title}
                  </h2>
                  <span className="rounded-full bg-[#F0F1F5] px-2 py-0.5 text-xs font-medium text-[#8E95A9]">
                    {columnTasks.length}
                  </span>
                </div>
                <button ria-label="More options" className="rounded-lg p-1 text-[#8E95A9] hover:bg-[#f2f4f6]">
                  <Plus size={16} />
                </button>
              </div>

              {/* Column Tasks */}
              <div className="space-y-2 min-h-[200px]">
                {columnTasks.length === 0 ? (
                  <div className="flex h-20 items-center justify-center rounded-xl border-2 border-dashed border-[#EFF0F4] text-sm text-[#8E95A9]">
                    Drop tasks here
                  </div>
                ) : (
                  columnTasks.map((task) => {
                    const StatusIcon =
                      statusIcons[task.status as keyof typeof statusIcons] ||
                      Circle;
                    const isDragging = draggedTask === task.id;
                    const progress = getProgressFromTasks(task);
                    const isUpdatingTask = isUpdating === task.id;

                    return (
                      <div
                        key={task.id}
                        draggable={!isUpdatingTask}
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragEnd={handleDragEnd}
                        className={`group rounded-xl border p-3 transition-all ${
                          isUpdatingTask
                            ? "opacity-50 cursor-wait"
                            : "cursor-grab active:cursor-grabbing"
                        } ${
                          isDragging
                            ? "opacity-50 scale-95"
                            : "hover:shadow-md hover:border-blue-200 bg-white border-[#EFF0F4]"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-start gap-2">
                              <GripVertical
                                size={14}
                                className="mt-0.5 text-[#D0D5DD] group-hover:text-[#8E95A9] transition-colors flex-shrink-0"
                              />
                              <div>
                                <p className="text-sm font-semibold text-[#191C1E] line-clamp-1">
                                  {task.title}
                                </p>
                                <p className="mt-0.5 text-xs text-[#8E95A9] line-clamp-2">
                                  {task.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          <button ria-label="More options" className="rounded-lg p-1 text-[#8E95A9] hover:bg-[#f2f4f6] flex-shrink-0">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              statusColors[
                                task.status as keyof typeof statusColors
                              ]
                            }`}
                          >
                            <StatusIcon size={10} />
                            {getStatusLabel(task.status)}
                          </span>
                          <span className="text-xs text-[#8E95A9]">• project: </span>
                          <span className="text-sm text-[#191C1E] font-bold">
                            {task.project?.title}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-linear-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-medium">
                              {task.employee.userName.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-xs text-[#8E95A9]">
                              {task.employee.userName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#8E95A9]">
                            <button ria-label="More options" className="hover:text-blue-600 transition-colors">
                              <MessageSquare size={12} />
                            </button>
                            <button ria-label="More options" className="hover:text-blue-600 transition-colors">
                              <Paperclip size={12} />
                            </button>
                            <span className="text-xs">
                              {getLastUpdated(task)}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-[#8E95A9]">Progress</span>
                            <span className="font-medium text-[#191C1E]">
                              {progress}%
                            </span>
                          </div>
                          <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-[#EFF0F4]">
                            <div
                              className={`h-full rounded-full bg-linear-to-r ${progressColors[task.status as keyof typeof progressColors]}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Drag & Drop Instructions */}
      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-center">
        <p className="text-sm text-[#565E74]">
          <span className="font-medium text-blue-600">💡 Tip:</span> Drag and
          drop tasks between columns to update their status (To Do → In Progress
          → Done).
        </p>
      </div>
    </div>
  );
}
