import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {  Telescope } from "lucide-react"; // icône pour 404

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center space-y-6">
      <Telescope className="size-16 md:size-28 " />
      <h1 className="text-7xl font-bold font-mono">404</h1>
      <p className="text-lg text-muted-foreground max-w-xs">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button size={"lg"}>Go Back Home</Button>
      </Link>
    </div>
  );
}
