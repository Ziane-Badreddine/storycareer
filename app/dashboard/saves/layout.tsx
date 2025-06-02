

export const metadata = {
  title: "My Saves | StoryCareer",
};
 
export default function SavesLayout({ children }: { children: React.ReactNode }) {
  return (
      <main className="w-full">
        {children}
      </main>
  )
}