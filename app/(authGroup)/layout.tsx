import { SiteNavbar } from "@/components/shared/navbar";
import { getMyProfile } from "@/service/getMyProfile";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMyProfile();
  return (
    <div>
      <SiteNavbar user={user?.data} />
      {children}
    </div>
  );
};

export default layout;
