"use client";

import { Story } from "@/lib/generated/prisma";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  EllipsisVertical,
  Heart,
  MessageSquareTextIcon,
  Pencil,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface Props {
  story: Story & {
    saves: { id: string }[]; // Adjust type depending on your DB shape
    _count?: { saves: number; comments: number }; // If you're using `include: { _count: { select: { saves: true } } }`
  };
}

export default function CardStory({ story }: Props) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  async function handleDelete() {
    try {
      setOpen(false);
      const res = await axios.delete(`/api/story/${story.id}`);
      if (res.status === 200) {
        toast.success("Story deleted successfully");
        router.refresh();
      }
    } catch {
      toast.error("Failed to deleted story");
    }
  }

  async function handleToggleSave() {
    try {
      if (story.saves.length === 0) {
        const res = await axios.post(`/api/save`, {
          storyId: story.id,
        });

        if (res.status === 201) {
          toast.success("Story saved");
        }
      } else {
        const res = await axios.delete(`/api/save/${story.id}`);

        if (res.status === 200) {
          toast.success("Save removed");
        }
      }

      router.refresh();
    } catch  {
      toast.error("Failed to update save");
    }
  }

  return (
    <Card className=" cursor-pointer overflow-hidden border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative w-full h-52 bg-muted cursor-default">
        {story.image ? (
          <Image
            src={story.image}
            alt={story.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
        {story.category && (
          <Badge className="absolute top-3 left-3 bg-primary text-white shadow-md hover:bg-primary/90">
            {story.category}
          </Badge>
        )}
        <DropdownMenu open={open} onOpenChange={setOpen}>
          {user?.id === story.userId && (
            <DropdownMenuTrigger
              asChild
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 right-3 backdrop-blur-3xl rounded-xl"
            >
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/stories/edit/${story.id}`}
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <Pencil />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full justify-start mr-5"
                    variant={"ghost"}
                  >
                    <Trash />
                    delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your story and remove it from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose asChild>
                    <div className="flex items-center justify-end gap-2 mt-3">
                      <Button
                        variant={"outline"}
                        onClick={() => setOpen(false)}
                      >
                        cancel
                      </Button>
                      <Button variant={"destructive"} onClick={handleDelete}>
                        continue
                      </Button>
                    </div>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardContent className="pt-0 space-y-3 cursor-default">
        <Link href={`/stories/${story.id}`} className="block">
          <h1 className="text-lg font-semibold font-mono">{story.title}</h1>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {story.content}
          </p>
        </Link>
        <div className="flex flex-wrap gap-1">
          {story.tags?.map((tag) => (
            <Badge key={tag} className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-muted-foreground">
            {story.createdAt.toDateString()}
          </span>
          <div>
            <Button
              onClick={handleToggleSave}
              size={"icon"}
              variant={"ghost"}
              className="relative rounded-full hover:bg-rose-100"
            >
              {story.saves.length > 0 ? (
                <Heart className="text-rose-500 fill-rose-500" />
              ) : (
                <Heart className="text-muted-foreground" />
              )}
              <span className="absolute -top-2 -right-2 text-xs bg-rose-500 text-white px-1.5 py-0.5 rounded-full">
                {story._count?.saves ?? 0}
              </span>
            </Button>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="relative rounded-full hover:bg-rose-100"
              disabled
            >
              <MessageSquareTextIcon className="text-muted-foreground" />
              <span className="absolute -top-2 -right-2 text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
                {story._count?.comments ?? 0}
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
