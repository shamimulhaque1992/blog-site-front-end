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

export function SiteNavbar() {
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
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}

function ProfileMenu() {
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
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="flex flex-col gap-0.5">
              <span>Alex Smith</span>
              <span className="text-xs font-normal text-muted-foreground">
                alex@example.com
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
                  >
                    <Link href={item.href}>
                      <Icon />
                      {item.label}
                    </Link>
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
