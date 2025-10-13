"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import { useDebouncedCallback } from "use-debounce";

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
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Story } from "@prisma/client/edge";
import {
  Loader2,
  Search,
  ImageIcon,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function StoryCommandDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const isMobile = useIsMobile();

  // SWR dynamique selon debouncedQuery
  const {
    data: stories,
    error,
    isLoading,
    mutate,
  } = useSWR<Story[]>(
    `/api/story/search?query=${encodeURIComponent(query)}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      mutate();
      const input = document.querySelector("[cmdk-input]") as HTMLInputElement;
      if (input) {
        input.focus();
        
      }
    }
  }, [open, stories, mutate, isMobile]);
    useEffect(() => {
    if (!open) {
      setQuery("")
    }
  }, [open]);

  const handleInputChange = useDebouncedCallback((term) => {
    setQuery(term);
  }, 300);

  const CommandContent = () => (
    <>
      <CommandInput
        placeholder="Search stories..."
        onValueChange={(search) => handleInputChange(search)}
      />
      <CommandList
        className={cn(
          "max-h-[450px] h-[450px] ",
          (isLoading ||
            error ||
            query.trim() === "" ||
            (stories && stories.length === 0)) &&
            "flex items-center justify-center"
        )}
      >
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-10 text-red-500">
            Failed to load stories
          </div>
        ) : query.trim() === "" ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Search className="w-10 h-10 opacity-50 mb-4" />
            <p className="text-center text-sm">
              Type something to search for stories
            </p>
          </div>
        ) : stories?.length === 0 ? (
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
        ) : (
          <CommandGroup>
            {stories?.map((story) => (
              <CommandItem
                key={story.id}
                value={story.title}
                className="flex items-center gap-3 py-3 px-2 relative group"
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
                    {story.descrption}
                  </p>
                </div>
                <CornerDownLeft className="hidden w-4 h-4 text-foreground group-data-[selected=true]:block group-hover:data-[selected=false]:block" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>

      {!isMobile && (
        <div className="flex items-center bg-background justify-between py-5 px-4 border-t text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Kbd className="bg-secondary text-foreground">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </Kbd>
            <span>to select</span>
          </div>
          <div className="flex items-center gap-2">
            <KbdGroup>
              <Kbd className="bg-secondary text-foreground p-1">
                <ArrowUp className="w-3.5 h-3.5" />
              </Kbd>
              <Kbd className="bg-secondary text-foreground p-1">
                <ArrowDown className="w-3.5 h-3.5" />
              </Kbd>
            </KbdGroup>
            <span>to navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd className="bg-secondary text-foreground">Esc</Kbd>
            <span>to close</span>
          </div>
        </div>
      )}
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
          <DrawerContent className="h-[75%]">
            <div className="overflow-y-auto">
              <Command
                className="rounded-lg border-none shadow-none"
                shouldFilter={false}
              >
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
