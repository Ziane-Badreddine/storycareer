import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories | StoryCareer",
  description: "Write and publish your own story on our platform.",
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return (
        <main className="w-full min-h-screen bg-background text-foreground">
          {children}
        </main>
  );
}
