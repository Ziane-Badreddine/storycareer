

export const metadata = {
  title: "My Categories/tags | StoryCareer",
  description: "Write and publish your own story on our platform.",
};
 
export default function CategoriesTagsLayout({ children }: { children: React.ReactNode }) {
  return (
      <main className="w-full">
        {children}
      </main>
  )
}