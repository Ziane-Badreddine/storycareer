

export const metadata = {
  title: "My Stories | StoryCareer",
};
 
export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return (
      <main className="w-full">
        {children}
      </main>
  )
}