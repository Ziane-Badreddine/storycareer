"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { Story } from "@prisma/client/edge";
import axios from "axios";
import useSWR from "swr";

import { ImageIcon, Loader2, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function StoryCommandDialog() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const {
    data: stories,
    error,
    isLoading,
    mutate,
  } = useSWR<Story[]>("/api/story/all", fetcher, {
    revalidateOnFocus: false,
  });

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Raccourci clavier Cmd/Ctrl + K
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

  // Revalider les données à l'ouverture
  useEffect(() => {
    if (open) mutate();
  }, [open, mutate]);

  // Contenu partagé entre Dialog et Drawer
  const CommandContent = () => (
    <>
      <CommandInput placeholder="Search stories..." />
      <CommandList className="max-h-[500px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-10 text-red-500">
            Failed to load stories
          </div>
        ) : (
          <>
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
              {stories?.map((story) => (
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
                    <p className="text-sm font-medium truncate">
                      {story.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {story.descrption}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </>
  );

  return (
    <div className="flex justify-center w-full">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => setOpen(true)}
      >
        <Search className="w-5 h-5" />
      </Button>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-[75%] ">
            <div className="overflow-y-auto">
              <Command className="rounded-lg border-none shadow-none">
                <CommandContent />
              </Command>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandContent />
        </CommandDialog>
      )}
    </div>
  );
}