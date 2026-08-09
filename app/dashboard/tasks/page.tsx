import { getCurrentUser, getUserRole } from "@/lib/auth";
import TasksContent from "@/features/Employee/Tasks/Components/TasksContent";
import TaskManagerContent from "@/features/Manager/Tasks/Components/TaskContent";
import { taskServices } from "@/features/Employee/Tasks/Services/TasksServices";
import { taskManagerServices } from "@/features/Manager/Tasks/Services/TasksServices";
import Pagination from "@/Shared/Components/Pagination";
import { Metadata } from "next";
import { TaskStatus } from "@/features/Manager/Tasks/Types/Types";

interface Props {
  searchParams: Promise<{
    title?: string;
    status?: string;
    pageNumber?: string;
  }>;
}

function parseTaskStatus(status?: string): TaskStatus | undefined {
  if (!status) return undefined;

  return Object.values(TaskStatus).includes(status as TaskStatus)
    ? (status as TaskStatus)
    : undefined;
}

export const metadata: Metadata = {
  title: "Tasks | Project Management Dashboard",
  description: "Manage, track, and organize your tasks efficiently. View task details, monitor progress, and collaborate with your team through the dashboard.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Tasks | Project Management Dashboard",
    description: "Manage, track, and organize your tasks efficiently. View task details, monitor progress, and collaborate with your team through the dashboard.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasks | Project Management Dashboard",
    description: "Manage, track, and organize your tasks efficiently. View task details, monitor progress, and collaborate with your team through the dashboard.",
  },
};

export default async function Tasks({ searchParams }: Props) {
  const { title, status, pageNumber } = await searchParams;

  const page = Number(pageNumber);
  const currentPage =
    Number.isInteger(page) && page > 0 ? page : 1;

  const role = await getUserRole();

  if (role === "Employee") {
    const tasks = await taskServices({
      title,
      status,
      pageNumber: currentPage,
    });

    const tasksData = tasks?.data || [];

    return (
      <TasksContent 
        tasks={tasksData}
        // search={title ?? ""}
        // statusFilter={status ?? ""}
        // totalTasks={tasks?.totalNumberOfRecords || tasksData.length}
      />
    );
  }

  if (role  === "Manager") {
    const tasks = await taskManagerServices({
      title,
      status: parseTaskStatus(status),
      pageNumber: currentPage,
    });

    const totalPages = tasks?.totalNumberOfPages || 1;
    const tasksData = tasks?.data || [];

    return (
      <>
        <TaskManagerContent
          tasks={tasksData}
          search={title ?? ""}
          statusFilter={status ?? ""}
          totalTasks={tasks?.totalNumberOfRecords || tasksData.length}
        />
        <Pagination
          page={currentPage}
          totalPages={totalPages}
        />
      </>
    );
  }

  return null;
}