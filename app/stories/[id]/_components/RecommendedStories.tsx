import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Story } from "@prisma/client";
import { ImageOff, Heart } from "lucide-react";

interface StoryWithCount extends Story {
  _count: {
    saves: number;
  };
}

export default function RecommendedStories({ stories }: { stories: StoryWithCount[] }) {
  return (
    <aside className="w-full px-0 md:px-2 ">
      <div className="space-y-4">
        {stories.length > 0 &&
          stories.map((story) => (
            <Link href={`/stories/${story.id}`} key={story.id}>
              <div className="flex gap-3 hover:bg-muted-foreground/10 py-2 rounded-lg transition cursor-pointer">
                <div className="w-24 h-24 relative flex-shrink-0 rounded-md bg-input flex items-center justify-center overflow-hidden">
                  {story.image ? (
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="96px"
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <ImageOff className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-tight line-clamp-1 break-all">
                    {story.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 break-all">
                    {story.descrption}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <span className="truncate">
                      {formatDistanceToNow(new Date(story.createdAt), {
                        locale: enUS,
                        addSuffix: true,
                      })}
                    </span>
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <Heart className="w-3 h-3 text-primary" fill="currentColor" />
                      {story._count.saves}
                    </span>
                  </div>
                  {story.category && (
                    <Badge variant="outline" className="w-fit text-[10px] px-1.5 py-0 h-5">
                      #{story.category}
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