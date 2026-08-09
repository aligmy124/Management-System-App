import { currentUserServices } from "@/features/Auth/CurrentUser/Services/CurrentUserServices";
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

export async function generateMetadata(): Promise<Metadata> {
  const user = await currentUserServices();
  const role = user?.group?.name ?? "User";
  return {
    title: `${role} Tasks | Project Management Dashboard`,
    description: `Manage, track, and organize your tasks efficiently. View task details, monitor progress, and collaborate with your team through the ${role.toLowerCase()} dashboard.`,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `${role} Tasks | Project Management Dashboard`,
      description: `Manage, track, and organize your tasks efficiently. View task details, monitor progress, and collaborate with your team through the ${role.toLowerCase()} dashboard.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${role} Tasks | Project Management Dashboard`,
      description: `Manage, track, and organize your tasks efficiently. View task details, monitor progress, and collaborate with your team through the ${role.toLowerCase()} dashboard.`,
    },
  };
}

export default async function Tasks({ searchParams }: Props) {
  const { title, status, pageNumber } = await searchParams;

  const page = Number(pageNumber);
  const currentPage =
    Number.isInteger(page) && page > 0 ? page : 1;

  const user = await currentUserServices();

  if (!user) {
    return null;
  }

  if (user.group?.name === "Employee") {
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

  if (user.group?.name === "Manager") {
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