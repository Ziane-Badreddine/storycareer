"use client";


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Utilitaire pour rendre les segments plus lisibles
const formatSegment = (segment: string) => {
  const mappings: Record<string, string> = {
    stories: "Stories",
    edit: "Edit Story",
    new: "New Story",
    profile: "Profile",
    settings: "Settings",
  };

  if (mappings[segment]) return mappings[segment];
  if (segment.length > 20) return `${segment.slice(0, 6)}...`;
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();

  const segments = pathname.split("/").filter(Boolean).slice(1); // remove "dashboard"
  const lastSegment = segments[segments.length - 1];
  const readableLast = formatSegment(lastSegment || "");

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2 h-16">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {isMobile ? (
          <p className="text-sm font-medium truncate max-w-[150px]">{readableLast}</p>
        ) : (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => router.back()}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              {segments.map((segment, index) => {
                const isLast = index === segments.length - 1;
                const href = `/dashboard/${segments.slice(0, index + 1).join("/")}`;
                const label = formatSegment(segment);

                return (
                  <div key={index} className="flex items-center">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      <div className={cn("flex items-center h-16", isMobile ? "gap-0" : "gap-2")}>
        <Link href={"/"}>
          <Button
            size={isMobile ? "icon" : "default"}
            variant={isMobile ? "ghost" : "default"}
          >
            <ArrowLeft className="h-4 w-4" />
            {!isMobile && <span className="ml-2">Home</span>}
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}
