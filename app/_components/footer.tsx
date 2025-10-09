import Link from "next/link";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-muted-foreground/50 bg-background">
      <div className=" mx-auto px-4 sm:px-6 lg:px-10 py-4 md:py-6 w-full">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          {/* Main content */}
          <div className="flex-1">
            <p className="text-sm md:text-base text-center md:text-start text-muted-foreground max-w-2xl">
              Built by{" "}
              <Link
                href="/"
                className="font-medium text-foreground underline decoration-dashed  underline-offset-4 hover:text-primary transition-colors"
                aria-label="Visit StoryCareer homepage"
              >
                StoryCareer
              </Link>
              . The source code is available on{" "}
              <Link
                href="https://github.com/yourusername/yourrepo"
                className="font-medium text-foreground underline decoration-dashed underline-offset-4 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source code on GitHub"
              >
                GitHub
              </Link>
              .
            </p>
          </div>

          {/* Copyright */}
          <div className="text-xs md:text-sm text-muted-foreground text-center md:text-start">
            © {currentYear} StoryCareer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}