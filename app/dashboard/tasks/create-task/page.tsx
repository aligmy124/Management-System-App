import TaskForm from "@/features/Manager/Tasks/Components/TaskForm";
import { projectManagerServices } from "@/features/Manager/Projects/services/ProjectsServices";
import { getUsers } from "@/features/Users/Services/UsersServices";

export default async function CreateTask() {
  const [projects, users] = await Promise.all([
    projectManagerServices(),
    getUsers()
  ]);

  return (
    <TaskForm
      projects={projects.data}
      users={users.data}
    />
  );
}