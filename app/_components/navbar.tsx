"use client";

import React from "react";
import Logo from "./Logo";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRightIcon, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import StoryCommandDialog from "@/app/stories/_components/StoryCommandDialog";

const navLinks = [
  { label: "home", href: "/" },
  { label: "stories", href: "/stories" },
  { label: "dashboard", href: "/dashboard" },
  { label: "about", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className=" flex z-50 w-screen fixed backdrop-blur-xl left-0 top-0  py-4 lg:py-1 px-5 md:px-10 items-center justify-between border-b border-muted-foreground/50 shadow-xs ">
      <Logo />
      <nav className="hidden lg:flex justify-center items-center p-4 gap-4 h-16 ">
        <div className="flex items-center justify-center gap-5">
          {navLinks.map(({ label, href }, i) => {
            return (
              <Link
                key={i}
                href={href}
                className={`hover:text-primary  capitalize text-lg ${
                  pathname === href && "text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center justify-center gap-2">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button variant={"outline"}>Log Up</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button>Log In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center h-8 justify-center gap-5">
              <Link href={"/dashboard/stories/new"}>
                <Button>
                  <Plus />
                  create your story
                </Button>
              </Link>
              <Separator orientation="vertical" />
              <StoryCommandDialog />
              <Separator orientation="vertical" />
              <UserButton />
            </div>
          </SignedIn>
        </div>
        <Separator orientation="vertical" />
        <ModeToggle />
      </nav>
      <div className="flex items-center justify-center gap-2 lg:hidden">
        <SignedIn>
          <StoryCommandDialog />
          <Separator orientation="vertical" />

          <UserButton />
        </SignedIn>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" variant={"ghost"}>
              <AlignRightIcon className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col  justify-center gap-5 py-5 px-10 ">
              {navLinks.map(({ label, href }, i) => {
                return (
                  <Link
                    key={i}
                    href={href}
                    className={`hover:text-primary capitalize flex flex-col gap-5 ${
                      pathname === href && "text-primary"
                    }`}
                  >
                    {label}
                    <Separator className="bg-border border" />
                  </Link>
                );
              })}
              <div className="flex flex-col items-center justify-center gap-2 w-full">
                <SignedIn>
                  <div className="flex items-center h-8 justify-center gap-5 w-full ">
                    <Link href={"/dashboard/stories/new"} className="w-full">
                      <Button className="w-full ">
                        <Plus />
                        create your story
                      </Button>
                    </Link>
                  </div>
                </SignedIn>
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button variant={"outline"} className="w-full">
                      Log Up
                    </Button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <Button className="w-full">Log In</Button>
                  </SignInButton>
                </SignedOut>
              </div>

              <div className="flex items-center justify-between py-5 px-5 bg-border rounded-lg mt-3">
                <h1>Appearance</h1>
                <ModeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
