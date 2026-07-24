"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getAvatarNameFromFullName } from "@/helpers/appHelper";
import { logout } from "@/service/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
] as const;

const profileMenuSections = [
  {
    id: "account",
    items: [
      { label: "Profile", href: "#profile", icon: UserIcon },
      { label: "Billing", href: "#billing", icon: CreditCardIcon },
      { label: "Settings", href: "#settings", icon: SettingsIcon },
    ],
  },
  {
    id: "session",
    items: [{ label: "Log out", href: "#logout", icon: LogOutIcon }],
  },
] as const;

// "data": {
//         "id": "2760cd9e-acd9-45d7-890d-39b7bafa6b1d",
//         "name": "asdfas sdfs sfsdf",
//         "email": "khandokershamimulhaque@gmail.com",
//         "activeStatus": "ACTIVE",
//         "role": "ADMIN",
//         "createdAt": "2026-06-24T06:05:36.232Z",
//         "updatedAt": "2026-07-01T09:43:20.097Z",
//         "profile": {
//             "id": "481830ac-8048-415e-b76d-a329ebcd7865",
//             "profilePhoto": "https://randomphoto.com",
//             "bio": "sdfs sdfas sdfsdf",
//             "userId": "2760cd9e-acd9-45d7-890d-39b7bafa6b1d",
//             "createAt": "2026-06-24T06:05:36.287Z",
//             "updatedAt": "2026-07-01T09:43:20.097Z"
//         }
//     }

type IUser = {
  id: string;
  name: string;
  email: string;
  activeStatus: string;
  role: string;
  profile: {
    id: string;
    bio: string;
    userId: string;
    profilePhoto: string;
  };
};

export function SiteNavbar({ user }: { user: IUser }) {
  const router = useRouter();
  const handleUserMenuAction = async (action: string) => {
    if (action === "Log out") {
      await logout();
      toast.success("User logged out successfully!");
      router.push("/login");
    }
  };
  return (
    <header className="sticky top-0 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="font-sans text-lg font-semibold tracking-tight"
          aria-label="Northstar home"
        >
          Northstar
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {/* <ProfileMenu user={user} /> */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Open profile menu"
                >
                  <Avatar className="size-8">
                    <AvatarFallback>
                      {user && getAvatarNameFromFullName(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <span className="flex flex-col gap-0.5">
                      <span>{user?.name}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {user?.email}
                      </span>
                    </span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {profileMenuSections.map((section, index) => (
                  <Fragment key={section.id}>
                    {index > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuGroup>
                      {section.items.map((item) => {
                        const Icon = item.icon;

                        return (
                          <DropdownMenuItem
                            key={item.href}
                            variant={
                              section.id === "session"
                                ? "destructive"
                                : "default"
                            }
                            onClick={async () =>
                              await handleUserMenuAction(item.label)
                            }
                          >
                            <Icon />
                            {item.label}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuGroup>
                  </Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button>Log in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function ProfileMenu({ user }: { user: IUser }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Open profile menu"
        >
          <Avatar className="size-8">
            <AvatarFallback>
              {user && getAvatarNameFromFullName(user?.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="flex flex-col gap-0.5">
              <span>{user?.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {user?.email}
              </span>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {profileMenuSections.map((section, index) => (
          <Fragment key={section.id}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuGroup>
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    variant={
                      section.id === "session" ? "destructive" : "default"
                    }
                    // onClick={() => handleUserMenuAction("logout")}
                  >
                    <Icon />
                    {item.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
