import Navbar from "@/app/_components/navbar";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const story = await prisma.story.findUnique({
    where: { id: id },
  });

  if (!story) {
    return {
      title: "Story introuvable | StoryCareer",
      description: "Cette story n'existe pas ou a été supprimée.",
    };
  }

  return {
    title: `${story.title} | StoryCareer`,
    description: story.content.slice(0, 160), // Limite la description à 160 caractères
    openGraph: {
      title: story.title,
      description: story.content.slice(0, 160),
      images: story.image ? [story.image] : [],
    },
  };
}

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-screen  overflow-hidden  py-24 border-x dark:bg-stone-950">
      <Navbar />
      {children}
    </main>
  );
}
