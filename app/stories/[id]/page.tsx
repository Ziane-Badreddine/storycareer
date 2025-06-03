import { prisma } from "@/lib/prisma";
import clerkClient from "@/lib/clerk";
import StoryClient, { StoryProps } from "./_components/story-client";
import { currentUser } from "@clerk/nextjs/server";
import RecommendedStories from "./_components/RecommendedStories";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await currentUser();
  const story = await prisma.story.findUnique({
    where: { id: (await params).id },
    include: { comments: true, saves: true },
  });

  if (!story) return <div>Story introuvable</div>;

  // Récupérer l’auteur de la story dans Clerk
  const userStory = await clerkClient.users.getUser(story.userId);

  // Récupérer les infos utilisateurs des commentaires
  const commentsWithUser = await Promise.all(
    story.comments.map(async (comment) => {
      const user = await clerkClient.users.getUser(comment.userId);
      return {
        ...comment,
        user: {
          id: user.id,
          username: user.username ?? "Inconnu",
          avatar: user.imageUrl ?? undefined,
        },
      };
    })
  );

  const storyWithUser: StoryProps & {
    user: { id: string; username: string; avatar?: string };
  } = {
    ...story,
    comments: commentsWithUser,
    user: {
      id: userStory.id,
      username: userStory.username ?? "Inconnu",
      avatar: userStory.imageUrl ?? undefined,
      email: userStory.emailAddresses[0]?.emailAddress ?? undefined,
    },
  };

  // Suggestions par même catégorie (ou random fallback)
  const recommended = await prisma.story.findMany({
    where: {
      NOT: { id: story.id }, 
    },
    orderBy: { createdAt: "desc" },
    include:{
      _count:{
        select:{
          saves: true
        }
      }
    },
    take: 6,
  });



return (
  <div className="w-full mx-auto flex flex-col lg:flex-row  px-4 pt-6 overflow-hidden">
    <div className="flex-1 lg:w-[77%]">
      <StoryClient
        story={storyWithUser}
        isSaved={story.saves.some((save) => save.userId === user?.id)}
      />
    </div>

    <div className="w-full lg:w-[25%] flex-shrink-0">
      <RecommendedStories stories={recommended}  />
    </div>
  </div>
);
}
