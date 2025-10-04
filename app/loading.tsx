import React from "react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
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
  );
}
