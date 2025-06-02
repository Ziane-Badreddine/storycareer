"use client";

import { Story } from "@/lib/generated/prisma";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import axios from "axios";

import { ImageIcon, Loader2, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StoryCommandDialog() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true); // 👈 loading state
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchAllStories() {
      setLoading(true);
      try {
        const res = await axios.get("/api/story/all");
        if (res.status === 200) {
          setStories(res.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des stories :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllStories();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex justify-center w-full md:w-1/3 lg:w-1/3">
      <Button
        variant="ghost"
        className="flex items-center gap-2 justify-start rounded-full"
        onClick={() => setOpen(true)}
      >
        <Search className="w-5 h-5" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher des stories..." />
        <CommandList>
          {loading ? ( 
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : <>
            <CommandEmpty>
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <Image
                  src="/empty.svg"
                  alt="No stories found"
                  width={120}
                  height={150}
                  className="opacity-80"
                />
                <p className="text-muted-foreground mt-4 text-center">
                  No stories match your filters.
                </p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Stories">
              {stories.map((story) => (
                <CommandItem
                  key={story.id}
                  value={story.title}
                  className="flex items-center gap-3 py-3 px-2"
                  onSelect={() => {
                    setOpen(false);
                    router.push(`/stories/${story.id}`);
                  }}
                >
                  <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    {story.image ? (
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{story.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {story.content}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            </>
          }
        </CommandList>
      </CommandDialog>
    </div>
  );
}
