import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "./_components/app-sidebar"
import Navbar from "./_components/navbar"

export const metadata = {
  title: "Dashboard | StoryCareer",
  description: "Write and publish your own story on our platform.",
};
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  )
}