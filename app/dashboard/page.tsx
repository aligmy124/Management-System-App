import { getCurrentUser, getUserRole } from "@/lib/auth";
import { projectServices } from "@/features/Employee/Projects/Services/ProjectsServices";
import { projectManagerServices } from "@/features/Manager/Projects/services/ProjectsServices";
import { taskServices } from "@/features/Employee/Tasks/Services/TasksServices";
import { taskManagerServices } from "@/features/Manager/Tasks/Services/TasksServices";
import EmployeeDashboard from "@/features/Employee/Dashboard/EmployeeDashboard";
import ManagerDashboard from "@/features/Manager/Dashboard/ManagerDashboard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | TaskFlow",
  description: "Dashboard for managing projects and tasks.",
  robots: {
    index: false,
    follow: false,
  },
};


export default async function Dashboard() {
  const role = await getUserRole();
  console.log("🔥 DASHBOARD PAGE");

  if (role === "Employee") {
    const [projects, tasks] = await Promise.all([
      projectServices(),
      taskServices(),
    ]);
    return <EmployeeDashboard projects={projects.data} tasks={tasks.data} />;
  } else if (role === "Manager") {
    const [projects, tasks] = await Promise.all([
      projectManagerServices(),
      taskManagerServices(),
    ]);
    return <ManagerDashboard projects={projects.data} tasks={tasks.data} />;
  }

  return null;
}

