import { FileText, LayoutDashboard } from "lucide-react";
import { ISidebarItems } from "./sidebarTypes";

export const AUTHOR_MENU_ITEMS: ISidebarItems[] = [
  {
    label: "Dashboard",
    href: "/author-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My profile",
    href: "/author-dashboard/my-posts",
    icon: FileText,
  },
];
