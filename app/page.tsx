import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import Footer from "./_components/footer";
import { prisma } from "@/lib/prisma";
import clerkClient from "@/lib/clerk";

async function getStats() {
  const totalStories = await prisma.story.count();
  const totalUsers = await clerkClient.users.getUserList();
  const totalComments = await prisma.comment.count();
  const totalSaves = await prisma.save.count();

  return {
    totalUsers: totalUsers.totalCount,
    totalStories,
    totalComments,
    totalSaves
  };
}

export default async function Home() {
  const stats = await getStats();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <Hero stats={stats} />
      <Footer />
    </div>
  );
}
