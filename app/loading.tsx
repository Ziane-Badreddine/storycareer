import React from "react";
import Image from "next/image";
import { Ripple } from "@/components/animation/ripple";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="relative">
       

        <div className="relative animate-pulse">
          <Image
            src={"/logo-white.svg"}
            alt="logo"
            width={300}
            height={300}
            className="hidden dark:block"
          />
          <Image
            src={`/logo-black.svg`}
            alt="logo"
            width={300}
            height={300}
            className="dark:hidden block"
          />
        </div>
        <Ripple color="bg-primary"  />
      </div>
    </div>
  );
}