import type { ReactNode } from "react";

export  const metadata = {
    title: "Create Story | StoryCareer",
    description: "Write and publish your own story on our platform.",
  };

export default function NewLayout({ children }: { children: ReactNode }) {
  return (
        <main>{children}</main>
  );
}
