
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-muted-foreground/50 shadow-xs w-screen pb-5 pt-5  flex justify-center lg:justify-start items-center  px-10 my-auto ">
      <p className="text-xs md:text-base  max-w-xl md:max-w-2xl">Built by <Link href={"/"} className="underline underline-offset-2">StoryCareer</Link>. The source code is available on <Link href={"/#"} className="underline underline-offset-2">Github</Link>.</p>
    </footer>
  );
}
