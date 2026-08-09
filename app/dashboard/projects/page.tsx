import { currentUserServices } from "@/features/Auth/CurrentUser/Services/CurrentUserServices";
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

export async function generateMetadata(): Promise<Metadata> {
  const user = await currentUserServices();
  const role = user?.group?.name ?? "User";
  return {
    title: `${role} Projects | Project Management Dashboard`,
    description: `Manage, track, and organize your projects efficiently. View project details, monitor progress, and collaborate with your team through the ${role.toLowerCase()} dashboard.`,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `${role} Projects | Project Management Dashboard`,
      description: `Manage, track, and organize your projects efficiently. View project details, monitor progress, and collaborate with your team through the ${role.toLowerCase()} dashboard.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${role} Projects | Project Management Dashboard`,
      description: `Manage, track, and organize your projects efficiently. View project details, monitor progress, and collaborate with your team through the ${role.toLowerCase()} dashboard.`,
    },
  };
}

export default async function Projects({ searchParams }: Props) {
  const { title, pageNumber } = await searchParams;
  
  // Fix: Use Number() correctly and set default page
  const page = Number(pageNumber);
  const currentPage = Number.isInteger(page) && page > 0 ? page : 1;
  
  const user = await currentUserServices();
  if (!user) {
    return null;
  }

  if (user.group?.name === "Employee") {
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
  
  if (user.group?.name === "Manager") {
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