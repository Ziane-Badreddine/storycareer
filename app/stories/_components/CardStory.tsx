"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Save, Story, Comment } from "@/lib/generated/prisma";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";

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

interface CardStoryProps {
  story: StoryProps;
  isSaved: boolean;
}

export default function CardStory({ story, isSaved }: CardStoryProps) {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggleSave(story: StoryProps) {
    if (!user?.id) return toast.error("Vous devez être connecté.");

    try {
      setIsLoading(true);
      if (isSaved) {
        await axios.delete(`/api/save/${story.id}`);
        toast.success("Sauvegarde retirée");
      } else {
        await axios.post(`/api/save`, { storyId: story.id });
        toast.success("Story sauvegardée");
      }
      router.refresh();
    } catch  {
      toast.error("Échec lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="group overflow-hidden rounded-xl bg-background border border-border shadow-sm transition-all hover:shadow-md flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-36 sm:h-44 md:h-52 overflow-hidden">
        {story.image ? (
          <Image
            src={story.image}
            alt={story.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/60 text-xs sm:text-sm bg-muted/30">
            Pas d&apos;image
          </div>
        )}

        {/* Catégorie */}
        {story.category && (
          <Badge className="absolute top-2 left-2 bg-primary/90 text-white text-[10px] sm:text-xs px-2 py-0.5 shadow-sm">
            {story.category}
          </Badge>
        )}

        {/* Auteur */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-[10px] sm:text-xs text-white rounded-full px-2 py-0.5 flex items-center gap-1 backdrop-blur-sm">
          {story.user.avatar && (
            <Image
              src={story.user.avatar}
              alt={story.user.username}
              width={16}
              height={16}
              className="rounded-full object-cover w-3 h-3 sm:w-4 sm:h-4"
            />
          )}
          <span className="truncate max-w-[80px] sm:max-w-[100px]">{story.user.username}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex gap-1 flex-wrap h-4 sm:h-5">
          {story.tags.slice(0, 3).map((tag, i) => (
            <Badge
              key={i}
              variant="outline"
              className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0 sm:py-0.5 bg-muted/40"
            >
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Titre */}
        <h3 className="font-semibold text-xs sm:text-sm md:text-base mt-1.5 sm:mt-2 line-clamp-1 group-hover:text-primary transition-colors">
          {story.title}
        </h3>

        {/* Description */}
        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
          {story.content}
        </p>

        {/* Footer actions */}
        <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between">
          <span className="text-[8px] sm:text-[10px] text-muted-foreground">
            {story.createdAt.toDateString()}
          </span>
          <div className="flex items-center gap-2">
            <Button
              className="rounded-full h-7 sm:h-8 px-2 sm:px-3 flex items-center justify-center"
              variant={isSaved ? "default" : "outline"}
              onClick={() => handleToggleSave(story)}
              disabled={isLoading}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              <p className="text-sm sm:text-lg">{story.saves.length}</p>
            </Button>
          </div>
        </div>

        {/* Lire la suite */}
        <Button
          variant="link"
          size="sm"
          asChild
          className="w-full mt-1 text-[10px] sm:text-xs md:text-sm p-0 h-5 sm:h-6"
        >
          <Link href={`/stories/${story.id}`}>Lire la suite</Link>
        </Button>
      </div>
    </Card>
  );
}
