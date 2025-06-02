import { Metadata } from "next"
import Navbar from "../_components/navbar"

export const metadata: Metadata = {
  title: "About | StoryCareer",
  description: "Learn about StoryCareer, a platform where professionals share their career stories and experiences. Created by Ziane Bader Eddine, inspired by Ayman.",
  keywords: [
    "StoryCareer",
    "Professional Stories",
    "Career Journey",
    "Career Experiences",
    "Professional Network",
    "ESI SBA",
    "Ziane Bader Eddine"
  ],
  authors: [
    {
      name: "Ziane Bader Eddine",
      url: "https://github.com/zianebader"
    }
  ],
  openGraph: {
    title: "About StoryCareer",
    description: "A platform where professionals share their career stories and experiences",
    type: "website",
    siteName: "StoryCareer",
    locale: "en_US",
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen bg-background">
        <Navbar />
      {children}
    </section>
  )
} 