import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 rounded-full bg-primary animate-ping opacity-20"></div>
        </div>

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
      </div>
    </div>
  );
}