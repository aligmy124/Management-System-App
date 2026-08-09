import DashboardClient from "@/features/Dashboard/Shared/Components/DashboardClient";
import UserProvider from "@/features/Auth/CurrentUser/Context/UserContext";
import { getCurrentUser } from "@/lib/auth";
import {SidebarProvider} from "@/features/Dashboard/Shared/Components/SidebarProvider"
export default async function Layout({children}:{children:React.ReactNode}){
    console.log("LAYOUT USER");
    const user = await getCurrentUser();
    return(
    <UserProvider user={user}>
    <SidebarProvider>
       <DashboardClient>{children}</DashboardClient>
    </SidebarProvider>
    </UserProvider>
    )
} 