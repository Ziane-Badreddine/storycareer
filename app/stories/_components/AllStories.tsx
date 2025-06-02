"use client";

import { Comment, Save, Story } from "@/lib/generated/prisma";
import React from "react";
import CardStory from "./CardStory";
import { useUser } from "@clerk/nextjs";

type StoryProps = Story & {
  saves: Save[];
  comments: Comment[];
  _count: {
    saves: number;
    comments: number;
  };
  user: {
    id: string | undefined;
    username: string;
    avatar: string | undefined;
  };
};

export default function AllStories({ stories }: { stories: StoryProps[] }) {
  const { user } = useUser();
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-start md:justify-between relative mb-5 w-full  ">
        <div className="relative w-1/2">
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
            🔥 All Stories 
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary/90 to-primary rounded-full mt-1 opacity-80"></div>
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-26">
        {stories.map((story, i) => {
          const isSaved = story.saves.some((save) => save.userId === user?.id);

          return <CardStory key={i} story={story} isSaved={isSaved} />;
        })}
      </div>
    </section>
  );
}
