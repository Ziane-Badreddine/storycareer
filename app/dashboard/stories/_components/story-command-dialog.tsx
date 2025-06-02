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
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StoryCommandDialog() {
  const [stories, setStories] = useState<Story[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchStories() {
      const { data, status } = await axios.get("/api/story");
      if (status === 200) {
        setStories(data);
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    fetchStories();

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2 justify-start w-full lg:w-1/4"
        onClick={() => setOpen(true)}
      >
        <Search size={16} /> Search stories...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search stories..." />
        <CommandList>
          <CommandEmpty>No stories found.</CommandEmpty>
          <CommandGroup heading="Stories">
            {stories.map((story) => (
              <CommandItem
                key={story.id}
                value={story.title}
                onSelect={() => {
                  setOpen(false);
                  router.push(`/stories/${story.id}`);
                }}
              >
                {story.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}