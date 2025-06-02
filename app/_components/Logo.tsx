"use client"

import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  const isMobile = useIsMobile();
  return (
    <Link href={"/"}>
      <Image
        src={"/logo-white.svg"}
        alt="logo"
        width={isMobile ? "120" : "160"}
        height={80}
        className="hidden dark:block"
      />
      <Image
        src={`/logo-black.svg`}
        alt="logo"
        width={isMobile ? "120" : "160"}
        height={80}
        className="dark:hidden block"
      />
    </Link>
  );
}
