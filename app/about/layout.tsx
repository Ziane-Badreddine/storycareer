import { Metadata } from "next";
import Navbar from "../_components/navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | StoryCareer",
  description:
    "Learn about StoryCareer, a platform where professionals share their career stories and experiences. Created by Ziane Bader Eddine, inspired by Ayman.",
  keywords: [
    "StoryCareer",
    "Professional Stories",
    "Career Journey",
    "Career Experiences",
    "Professional Network",
    "ESI SBA",
    "Ziane Bader Eddine",
  ],
  authors: [
    {
      name: "Ziane Bader Eddine",
      url: "https://github.com/zianebader",
    },
  ],
  openGraph: {
    title: "About StoryCareer",
    description:
      "A platform where professionals share their career stories and experiences",
    type: "website",
    siteName: "StoryCareer",
    locale: "en_US",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-background">
      <Navbar />
      {children}
      <footer className="border-t border-muted-foreground/50 shadow-xs w-full  py-5 flex justify-center lg:justify-start items-center px-10">
        <p className="text-xs md:text-base lg:text-lg max-w-xl md:max-w-3xl">
          Built by{" "}
          <Link href={"/"} className="underline underline-offset-2">
            StoryCareer
          </Link>
          . The source code is available on{" "}
          <Link href={"/#"} className="underline underline-offset-2">
            Github
          </Link>
          .
        </p>
      </footer>
    </section>
  );
}
