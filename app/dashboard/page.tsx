import { currentUserServices } from "@/features/Auth/CurrentUser/Services/CurrentUserServices";
import { projectServices } from "@/features/Employee/Projects/Services/ProjectsServices";
import { projectManagerServices } from "@/features/Manager/Projects/services/ProjectsServices";
import { taskServices } from "@/features/Employee/Tasks/Services/TasksServices";
import { taskManagerServices } from "@/features/Manager/Tasks/Services/TasksServices";
import EmployeeDashboard from "@/features/Employee/Dashboard/EmployeeDashboard";
import ManagerDashboard from "@/features/Manager/Dashboard/ManagerDashboard";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await currentUserServices();

  const role = user?.group?.name ?? "User";

  return {
    title: `${role} Dashboard | TaskFlow`,
    description: `${role} dashboard for managing projects and tasks.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}


export default async function Dashboard() {
  const user = await currentUserServices();
  if (!user) {
    return null;
  }

  if (user.group?.name === "Employee") {
    const [projects, tasks] = await Promise.all([
      projectServices(),
      taskServices(),
    ]);
    return <EmployeeDashboard projects={projects.data} tasks={tasks.data} />;
  } else if (user.group?.name === "Manager") {
    const [projects, tasks] = await Promise.all([
      projectManagerServices(),
      taskManagerServices(),
    ]);
    return <ManagerDashboard projects={projects.data} tasks={tasks.data} />;
  }

  return null;
}
