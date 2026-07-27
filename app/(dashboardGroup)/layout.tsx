import { SiteNavbar } from "@/components/shared/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMyProfile } from "@/service/getMyProfile";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMyProfile();
  return (
    <div>
      <SiteNavbar user={user} />
      <SidebarProvider className="flex-1">
        <DashboardSidebar user={user}/>
        <main className="flex-1 min-w-0">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
