import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import clerkClient from "@/lib/clerk";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow, startOfDay, subDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  MessageSquare,
  Heart,
  ImageOff,
} from "lucide-react";
import { StoryChart } from "@/app/dashboard/_components/StoryChart";
import Image from "next/image";
import Navbar from "@/app/_components/navbar";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentUserData = await currentUser();
  const isOwnProfile = currentUserData?.id === id;

  // Get user data from Clerk
  const userData = await clerkClient.users.getUser(id);

  // Get user's stories from database with date filter for chart
  const stories = await prisma.story.findMany({
    where: {
      userId: id,
      createdAt: {
        gte: subDays(new Date(), 7),
      },
    },
    include: {
      _count: {
        select: {
          comments: true,
          saves: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate stats
  const publishedStories = stories.filter((story) => story.isPublished).length;
  const totalComments = stories.reduce(
    (acc, story) => acc + story._count.comments,
    0
  );
  const totalSaves = stories.reduce(
    (acc, story) => acc + story._count.saves,
    0
  );

  // Prepare chart data
  const storiesByDate = stories.reduce((acc, story) => {
    const date = format(startOfDay(story.createdAt), "MMM dd");
    if (!acc[date]) {
      acc[date] = { total: 0 };
    }
    acc[date].total++;
    return acc;
  }, {} as Record<string, { total: number }>);

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = format(startOfDay(subDays(new Date(), 6 - i)), "MMM dd");
    return {
      date,
      total: storiesByDate[date]?.total || 0,
    };
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Navbar />
      <Card className="mt-20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.imageUrl} />
                <AvatarFallback>
                  {userData.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{userData.username}</CardTitle>
                <CardDescription>
                  Membre depuis{" "}
                  {formatDistanceToNow(new Date(userData.createdAt), {
                    locale: fr,
                    addSuffix: true,
                  })}
                </CardDescription>
              </div>
            </div>
            {isOwnProfile && <UserButton afterSignOutUrl="/" />}
          </div>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stories.length}</div>
            <p className="text-xs text-muted-foreground">Stories créées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Stories Publiées
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedStories}</div>
            <p className="text-xs text-muted-foreground">
              Stories visibles publiquement
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commentaires</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground">Commentaires reçus</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saves</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSaves}</div>
            <p className="text-xs text-muted-foreground">
              Sauvegardes par d&apos;autres utilisateurs
            </p>
          </CardContent>
        </Card>
      </div>

      <StoryChart data={chartData} />

      <Tabs defaultValue="stories" className="w-full">
        <TabsList>
          <TabsTrigger value="stories">Stories ({stories.length})</TabsTrigger>
          <TabsTrigger value="saved">Sauvegardés</TabsTrigger>
        </TabsList>

        <TabsContent value="stories" className="mt-6">
          <div className="grid gap-4">
            {stories.map((story) => (
              <Link
                href={`/stories/${story.id}`}
                key={story.id}
                className="block"
              >
                <Card className="transition hover:bg-muted/50">
                  <CardContent className="p-2 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                      <div className="w-full sm:w-20 h-32 sm:h-20 relative flex-shrink-0 rounded-md bg-stone-700 flex items-center justify-center">
                        {story.image ? (
                          <Image
                            src={story.image}
                            alt={story.title}
                            fill
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <ImageOff className="w-8 sm:w-10 h-8 sm:h-10 text-stone-400" />
                        )}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-semibold text-sm sm:text-base">
                          {story.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1">
                          {story.content}
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                          {story.category && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] sm:text-xs"
                            >
                              {story.category}
                            </Badge>
                          )}
                          <span className="text-[10px] sm:text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(story.createdAt), {
                              locale: fr,
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 text-[10px] sm:text-sm text-muted-foreground">
                        <div>{story._count.comments} commentaires</div>
                        <div>{story._count.saves} saves</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {stories.length === 0 && (
              <Card>
                <CardContent className="p-4 text-center text-muted-foreground">
                  Aucune story publiée
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardContent className="p-4 text-center text-muted-foreground">
              Fonctionnalité à venir
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
