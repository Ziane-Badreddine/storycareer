"use client";

import {
  Bookmark,
  FileText,
  LayoutDashboard,
  MessageSquare,
  PlusSquare,
  Tags,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "New Story",
    url: "/dashboard/stories/new",
    icon: PlusSquare,
  },
  {
    title: "My Stories",
    url: "/dashboard/stories",
    icon: FileText,
  },
  {
    title: "Saved Stories",
    url: "/dashboard/saves",
    icon: Bookmark,
  },
    {
    title: "Comments",
    url: "/dashboard/comments",
    icon: MessageSquare,
  },
  {
    title: "Categories/tags",
    url: "/dashboard/categories-tags",
    icon: Tags,
  },
];

export default function AppSidebar() {
  const { setOpenMobile, isMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  function handleSidebar(href: string) {
    if (isMobile) {
      setOpenMobile(false);
    }
    router.push(href);
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button
                      className={`justify-start`}
                      variant={pathname === item.url ? "default" : "ghost"}
                      onClick={() => handleSidebar(item.url)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="w-full flex items-center px-1 py-5 gap-3">
          <UserButton />
          <div className="max-w-[80%]">
            <h1>{user?.username}</h1>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
