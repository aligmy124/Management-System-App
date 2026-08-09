import DashboardClient from "@/features/Dashboard/Shared/Components/DashboardClient";
import UserProvider from "@/features/Auth/CurrentUser/Context/UserContext";
import {currentUserServices} from "@/features/Auth/CurrentUser/Services/CurrentUserServices"
import {SidebarProvider} from "@/features/Dashboard/Shared/Components/SidebarProvider"
export default async function Layout({children}:{children:React.ReactNode}){
    const user = await currentUserServices();
    return(
    <UserProvider user={user}>
    <SidebarProvider>
       <DashboardClient>{children}</DashboardClient>
    </SidebarProvider>
    </UserProvider>
    )
} 