import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Story } from "@/lib/generated/prisma";
import { ImageOff } from "lucide-react";

interface StoryWithCount extends Story {
  _count: {
    saves: number;
  };
}

import { Heart } from "lucide-react";

export default function RecommendedStories({ stories }: { stories: StoryWithCount[] }) {
  return (
    <aside className="w-full md:w-96 px-2 border-l border-stone-800">
      <div className="space-y-4">
        {stories.length > 0 &&
          stories.map((story) => (
            <Link href={`/stories/${story.id}`} key={story.id}>
              <div className="flex gap-3 hover:bg-muted-foreground/10 p-2 rounded-lg transition cursor-pointer">
                <div className="w-20 h-20 relative flex-shrink-0 rounded-md bg-stone-700 flex items-center justify-center">
                  {story.image ? (
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <ImageOff className="w-10 h-10 text-stone-400" />
                  )}
                </div>
                <div className="flex flex-col text-sm flex-1">
                  <h3 className="font-medium leading-tight line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 whitespace-pre-wrap">
                    {story.content}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-stone-400">
                    <span>
                      {formatDistanceToNow(new Date(story.createdAt), {
                        locale: fr,
                        addSuffix: true,
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      {story._count.saves}
                    </span>
                  </div>
                  {story.category && (
                    <Badge variant="outline" className="mt-1 w-fit text-xs">
                      {story.category}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </aside>
  );
}

