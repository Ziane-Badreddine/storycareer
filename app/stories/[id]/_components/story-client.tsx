"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, MoreHorizontal, Filter, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Story, Save, Comment } from "@/lib/generated/prisma";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Link from "next/link";

export type StoryProps = Story & {
  saves: Save[];
  comments: (Comment & {
    user: {
      id: string;
      username: string;
      avatar: string;
    };
  })[];
  user: {
    id: string | undefined;
    username: string;
    email: string | undefined;
    avatar: string | undefined;
  };
};

export default function StoryClient({
  story,
  isSaved,
}: {
  story: StoryProps;
  isSaved: boolean;
}) {
  const [isLoading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const user = useUser();

  async function handleToggleSave() {
    if (!user?.user?.id) return toast.error("Vous devez être connecté.");

    try {
      if (isSaved) {
        await axios.delete(`/api/save/${story.id}`);
        toast.success("Sauvegarde retirée");
      } else {
        await axios.post(`/api/save`, { storyId: story.id });
        toast.success("Story sauvegardée");
      }
      router.refresh();
    } catch {
      toast.error("Échec lors de la mise à jour");
    }
  }



  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post("/api/comment", {
        content: comment,
        storyId: story.id,
      });

      if (res.status === 201) {
        router.refresh();
      }
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
      setComment("");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-5">


      {/* Main Content Area - similar to YouTube video display */}
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium mr-2">
            {new Date(story.createdAt).toLocaleString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <Badge>{story.category}</Badge>
        </div>
        {/* Media Content */}
        {story.image && (
          <div className="w-full aspect-video bg-black overflow-hidden">
            <Image
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
              width={1000}
              height={200}
              priority
            />
          </div>
        )}

        {/* Title & Main Info */}
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <Link href={`/user/${story.user.id}`} className="hover:opacity-80 transition">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={story.user.avatar} alt="@user" />
                  <AvatarFallback>
                    {story.user.username?.toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex flex-col">
                <Link href={`/user/${story.user.id}`} className="font-medium hover:underline">
                  {story.user.username}
                </Link>
              </div>
            </div>

            <Button
              className="rounded-full  h-9 px-3 flex items-center justify-center"
              variant={isSaved ? "default" : "outline"}
              onClick={handleToggleSave}
            >
              <Heart className="w-5 h-5 mr-1" />
              <p className="text-lg">{story.saves.length}</p>
            </Button>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 py-3 mt-3 border-t border-stone-800">
          <div className={cn("relative")}>
            <h1 className="font-semibold text-xl break-words font-serif">{story.title}</h1>
            <p className="text-muted-foreground whitespace-pre-line break-words max-w-full overflow-hidden font-serif leading-relaxed">
              {story.content}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {story.tags.map((tag, i) => (
              <Badge
                variant="outline"
                key={i}
                className=" hover:bg-background cursor-pointer"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="hidden md:block mt-4 px-4 border-t border-stone-800 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-medium">
              {story.comments.length} commentaire
              {story.comments.length !== 1 ? "s" : ""}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium flex items-center gap-1"
          >
            <Filter className="w-4 h-4" />
            Trier par
          </Button>
        </div>

        <div className="flex items-start gap-3 mb-6">
          <Link href={`/user/${user?.user?.id}`} className="hover:opacity-80 transition">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.user?.imageUrl} />
              <AvatarFallback>
                {user?.user?.username?.slice(0, 2).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
            />
            {comment.trim() && (
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setComment("")}
                  disabled={isLoading}
                >
                  Annuler
                </Button>
                <Button size="sm" onClick={handleComment} disabled={isLoading}>
                  {!isLoading ? (
                    "Commenter"
                  ) : (
                    <Loader className="animate-spin w-4 h-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Comment List */}
        <div className="space-y-6">
          {story.comments.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Aucun commentaire pour le moment.
            </p>
          )}

          {story.comments.map((c) => (
            <div key={c.id} className="flex gap-3 items-start group">
              <Link href={`/user/${c.user.id}`} className="hover:opacity-80 transition">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={c.user.avatar} />
                  <AvatarFallback>
                    {c.user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {c.user.username}
                  </span>
                  <span className="text-xs text-stone-400">
                    il y a{" "}
                    {formatDistanceToNow(new Date(c.createdAt), {
                      addSuffix: false,
                      locale: fr,
                    })}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap mt-1">{c.content}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden mt-4 px-4">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              Voir les commentaires ({story.comments.length})
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[90dvh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle>Commentaires</DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              {/* Ajout de commentaire */}
              <div className="flex items-start gap-3 mb-6">
                <Link href={`/user/${user?.user?.id}`} className="hover:opacity-80 transition">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user?.imageUrl} />
                    <AvatarFallback>
                      {user?.user?.username?.slice(0, 2).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1">
                  <Input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                  />
                  {comment.trim() && (
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setComment("")}
                        disabled={isLoading}
                      >
                        Annuler
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleComment}
                        disabled={isLoading}
                      >
                        {!isLoading ? (
                          "Commenter"
                        ) : (
                          <Loader className="animate-spin w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Liste des commentaires */}
              <div className="space-y-6 pb-4">
                {story.comments.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    Aucun commentaire pour le moment.
                  </p>
                )}
                {story.comments.map((c) => (
                  <div key={c.id} className="flex gap-3 items-start group">
                    <Link href={`/user/${c.user.id}`} className="hover:opacity-80 transition">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={c.user.avatar} />
                        <AvatarFallback>
                          {c.user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {c.user.username}
                        </span>
                        <span className="text-xs text-stone-400">
                          il y a{" "}
                          {formatDistanceToNow(new Date(c.createdAt), {
                            addSuffix: false,
                            locale: fr,
                          })}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap mt-1">
                        {c.content}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
