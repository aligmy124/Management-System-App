import ProjectForm from "@/features/Manager/Projects/Components/ProjectForm"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Project | Task Management",
  description:
    "Create a new project, define its details, assign team members, and start tracking tasks and progress.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function Create_Project(){
    return(
        <ProjectForm/>
    )
}