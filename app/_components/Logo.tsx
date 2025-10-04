"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className, width, height = 80 }: LogoProps) {
  const isMobile = useIsMobile();
  return (
    <Link className={cn(className)} href={"/"}>
      <Image
        src={"/logo-white.svg"}
        alt="logo"
        width={width || isMobile ? "120" : "160"}
        height={height}
        className="hidden dark:block"
      />
      <Image
        src={`/logo-black.svg`}
        alt="logo"
        width={width || isMobile ? "120" : "160"}
        height={height}
        className="dark:hidden block"
      />
    </Link>
  );
}
