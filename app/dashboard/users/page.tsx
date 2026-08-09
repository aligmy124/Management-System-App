import { getUsers } from "@/features/Users/Services/UsersServices";
import UsersContent from "@/features/Users/Components/UsersContent";
import Pagination from "@/Shared/Components/Pagination";
import { Suspense } from "react";
import { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{
    pageNumber?: string;
    search?: string;
    email?: string;
    country?: string;
    groups?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Users | Project Management Dashboard",
  description: "Manage and monitor all users in the system. View user details, roles, and activation status.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Users | Project Management Dashboard",
    description: "Manage and monitor all users in the system. View user details, roles, and activation status.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Users | Project Management Dashboard",
    description: "Manage and monitor all users in the system. View user details, roles, and activation status.",
  },
};

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  const pageNumber = parseInt(params.pageNumber || "1");
  const search = params.search || "";
  const email = params.email || "";
  const country = params.country || "";
  const groupsParam = params.groups || "";

  // Parse groups - format "1,2" or "1" or "2"
  let groups: number[] = [];
  if (groupsParam) {
    groups = groupsParam
      .split(",")
      .map((g) => parseInt(g.trim()))
      .filter((g) => !isNaN(g) && g > 0);
  }

  const usersData = await getUsers({
    pageNumber: pageNumber,
    pageSize: 10,
    userName: search || undefined,
    email: email || undefined,
    country: country || undefined,
    groups: groups.length > 0 ? groups : undefined,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-6">
        <UsersContent 
          users={usersData.data}
          totalCount={usersData.totalNumberOfRecords}
          currentPage={usersData.pageNumber}
          totalPages={usersData.totalNumberOfPages}
          search={search}
          email={email}
          country={country}
          groups={groupsParam}
        />
        <Pagination 
          page={usersData.pageNumber} 
          totalPages={usersData.totalNumberOfPages} 
        />
      </div>
    </Suspense>
  );
}