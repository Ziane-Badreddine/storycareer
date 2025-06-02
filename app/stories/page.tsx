import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React, { Suspense } from "react";
import clerkClient from "@/lib/clerk";
import Navbar from "../_components/navbar";
import TopLikesSection from "./_components/TopLikesSection";
import TopCommentsSection from "./_components/TopCommentsSection";
import AllStories from "./_components/AllStories";
import Link from "next/link";


// Loading component
function StoriesLoading() {
  return (
    <div className="w-full overflow-hidden">
      <Navbar />
      <div className="mt-24 w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center gap-8 px-4">
        {/* Top Likes Section Loading */}
        <div className="w-full space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded-md w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>

        {/* Top Comments Section Loading */}
        <div className="w-full space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded-md w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>

        {/* All Stories Loading */}
        <div className="w-full space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded-md w-32" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main content component
async function StoriesContent() {
  const user = await currentUser();

  const stories = await prisma.story.findMany({
    include: {
      saves: true,
      comments: true,
      _count: {
        select: {
          saves: true,
          comments: true,
        },
      },
    },
    where: {
      userId: {
        not: user?.id,
      },
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const users = await clerkClient.users.getUserList();

  const storiesWithUser = stories.map((story) => {
    const author = users.data?.find((u) => u.id === story.userId);
    return {
      ...story,
      user: {
        id: author?.id,
        username: author?.username ?? "unknown",
        avatar: author?.imageUrl,
      },
    };
  });

  // Safe sorting with null checks
  const storiesTopLikes = [...storiesWithUser].sort(
    (a, b) => (b._count?.saves ?? 0) - (a._count?.saves ?? 0)
  );
  
  const storiesTopComments = [...storiesWithUser].sort(
    (a, b) => (b._count?.comments ?? 0) - (a._count?.comments ?? 0)
  );

  const allstories = [...storiesWithUser].sort(
    (a, b) => {
      const timeA = a.createdAt?.getTime() ?? 0;
      const timeB = b.createdAt?.getTime() ?? 0;
      return timeB - timeA;
    }
  );

  // Handle empty states
  if (!stories || stories.length === 0) {
    return (
      <div className="w-full overflow-hidden">
        <Navbar />
        <div className="mt-24 w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center gap-8 px-4 min-h-[60vh]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-muted-foreground">No Stories Yet</h2>
            <p className="text-muted-foreground">
              Be the first to share your story with the community!
            </p>
            <Link 
              href="/dashboard/stories/new"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Create Your First Story
            </Link>
          </div>
        </div>
        <footer className="border-t border-muted-foreground/50 shadow-xs w-screen pb-8 pt-5 flex justify-center lg:justify-start items-center px-10">
          <p className="text-xs md:text-base lg:text-lg max-w-xl md:max-w-3xl">
            Built by{" "}
            <Link href={"/"} className="underline underline-offset-2">
              StoryCareer
            </Link>
            . The source code is available on{" "}
            <Link href={"/#"} className="underline underline-offset-2">
              Github
            </Link>
            .
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <Navbar />
      <div className="mt-24 w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center gap-8 px-4">
        <TopLikesSection stories={storiesTopLikes || []} />
        <TopCommentsSection stories={storiesTopComments || []} />
        <AllStories stories={allstories || []} />
      </div>
      <footer className="border-t border-muted-foreground/50 shadow-xs w-screen pb-8 pt-5 flex justify-center lg:justify-start items-center px-10">
        <p className="text-xs md:text-base lg:text-lg max-w-xl md:max-w-3xl">
          Built by{" "}
          <Link href={"/"} className="underline underline-offset-2">
            StoryCareer
          </Link>
          . The source code is available on{" "}
          <Link href={"/#"} className="underline underline-offset-2">
            Github
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}

// Main page component with Suspense
export default function Page() {
  return (
    <Suspense fallback={<StoriesLoading />}>
      <StoriesContent />
    </Suspense>
  );
}