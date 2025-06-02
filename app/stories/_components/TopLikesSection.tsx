"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Save, Story, Comment } from "@/lib/generated/prisma";
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

export default function TopLikesSection({
  stories,
}: {
  stories: StoryProps[];
}) {
  const { user } = useUser();


  return (
    <section className="w-full">
      <Carousel
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <div className="flex items-center justify-between relative mb-5">
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
              🔥 Stories les plus aimées
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary/90 to-primary rounded-full mt-1 opacity-80"></div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <CarouselPrevious className="hidden md:block" />
            <CarouselNext className="hidden md:block" />
          </div>
        </div>
        <CarouselContent className="-ml-4">
          {stories.map((story) => {
            const isSaved = story.saves.some(
              (save) => save.userId === user?.id
            );

            return (
              <CarouselItem
                key={story.id}
                className="pl-4 basis-11/12 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <CardStory story={story} isSaved={isSaved} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
