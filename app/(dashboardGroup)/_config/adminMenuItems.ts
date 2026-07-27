import { FileText, LayoutDashboard, User } from "lucide-react";
import { ISidebarItems } from "./sidebarTypes";

export const ADMIN_MENU_ITEMS: ISidebarItems[] = [
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My posts",
    href: "/admin-dashboard/my-posts",
    icon: FileText,
  },
];
