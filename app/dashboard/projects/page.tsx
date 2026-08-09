import { getCurrentUser, getUserRole } from "@/lib/auth";
import ProjectsContent from "@/features/Employee/Projects/Components/ProjectsContent";
import ManagerProjectsContent from "@/features/Manager/Projects/Components/ManagerProjectsContent";
import { projectServices } from "@/features/Employee/Projects/Services/ProjectsServices";
import { projectManagerServices } from "@/features/Manager/Projects/services/ProjectsServices";
import Pagination from "@/Shared/Components/Pagination";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{
    title?: string;
    pageNumber?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Projects | Project Management Dashboard",
  description: "Manage and track your projects.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Projects({ searchParams }: Props) {
  const { title, pageNumber } = await searchParams;
  
  // Fix: Use Number() correctly and set default page
  const page = Number(pageNumber);
  const currentPage = Number.isInteger(page) && page > 0 ? page : 1;
  
  const role = await getUserRole();

  if (role === "Employee") {
    const projects = await projectServices({
      title,
      pageNumber: currentPage
    });
    
    const totalPages = projects.totalNumberOfPages;
    return (
      <>
        <ProjectsContent 
          Projects={projects.data} 
          search={title ?? ""} 
        /> 
        <Pagination page={currentPage} totalPages={totalPages}/>
      </>
    );
  } 
  
  if (role === "Manager") {
    const projects = await projectManagerServices({
      title,
      pageNumber: currentPage
    });
    const totalPages = projects.totalNumberOfPages;
    return (
      <>
        <ManagerProjectsContent 
          Projects={projects.data} 
          search={title ?? ""} 
        />
        <Pagination page={currentPage} totalPages={totalPages}/>
      </>
    );
  }

  // Handle other user groups or fallback
  return null;
}