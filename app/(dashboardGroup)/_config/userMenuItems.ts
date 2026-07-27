import { FileText, LayoutDashboard } from "lucide-react";
import { ISidebarItems } from "./sidebarTypes";

export const USER_MENU_ITEMS: ISidebarItems[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My profile",
    href: "/dashboard/my-profile",
    icon: FileText,
  },
];
