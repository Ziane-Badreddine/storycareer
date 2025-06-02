import { ReactNode } from "react"
import { Metadata } from "next"
import clerkClient from "@/lib/clerk"
import { currentUser } from "@clerk/nextjs/server";

interface Props {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log(params);
  const { id } = await params;
  const user = await currentUser();
  if (user && user.id != id) {
    return {
        title: `${user.username} - Profil StoryCareer`,
        description: `Découvrez le profil et les stories de ${user.username} sur StoryCareer`,
        openGraph: {
          title: `${user.username} - Profil StoryCareer`,
          description: `Découvrez le profil et les stories de ${user.username} sur StoryCareer`,
          images: [user.imageUrl],
        },
      }
  }
  const userData = await clerkClient.users.getUser(id);

  return {
    title: `${userData.username} - Profil StoryCareer`,
    description: `Découvrez le profil et les stories de ${userData.username} sur StoryCareer`,
    openGraph: {
      title: `${userData.username} - Profil StoryCareer`,
      description: `Découvrez le profil et les stories de ${userData.username} sur StoryCareer`,
      images: [userData.imageUrl],
    },
  }
}

export default function UserLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="container mx-auto p-4 lg:p-8 min-h-[calc(100vh-4rem)]">
      {children}
    </div>
  )
}
