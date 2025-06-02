import { prisma } from "@/lib/prisma";
import CardStory from "./_components/card-story";
import PaginationBar from "./_components/PaginationBar";
import { currentUser } from "@clerk/nextjs/server";
import Navbar from "./_components/navbar";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;

  const search = typeof query.search === "string" ? query.search : null;

  const pageNumber = typeof query.page === "string" ? parseInt(query.page) : 1;
  const page = isNaN(pageNumber) ? 1 : pageNumber;

  const category = typeof query.category === "string" ? query.category : null;
  const tag = typeof query.tag === "string" ? query.tag : null;

  const user = await currentUser();
  const pageSize = 6;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereClause: any = {
    userId: user?.id,
  };

  if (category) {
    whereClause.category = category;
  }

  if (tag) {
    const tagsArray = tag.split(",");
    whereClause.tags = { hasEvery: tagsArray };
  }

  if (search) {
    whereClause.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  const [stories, totalCount, categoriesData, tagsData] = await Promise.all([
    prisma.story.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      where: whereClause,
      include: {
        saves: {
          where: { userId: user?.id },
          select: { id: true },
        },
        _count: {
          select: { saves: true, comments: true },
        },
      },
    }),
    prisma.story.count({
      where: whereClause,
    }),
    prisma.story.findMany({
      where: { userId: user?.id },
      select: { category: true },
      distinct: ["category"],
    }),
    prisma.story.findMany({
      where: { userId: user?.id },
      select: { tags: true },
    }),
  ]);

  const categories = categoriesData.map((c) => c.category).filter(Boolean);
  const uniqueTags = Array.from(new Set(tagsData.flatMap((t) => t.tags)));
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="p-6 space-y-6">
      <Navbar
        currentCategory={category ?? "Category"}
        currentTag={tag ?? "Tag"}
        categories={categories}
        tags={uniqueTags}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.length > 0 ? (
          stories.map((story) => <CardStory key={story.id} story={story} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Image
              src="/empty.svg"
              alt="No stories found"
              width={400}
              height={200}
              className="opacity-80"
            />
            <p className="text-muted-foreground mt-4 text-center">
              No stories match your filters.
            </p>
          </div>
        )}
      </div>

      <PaginationBar currentPage={page} totalPages={totalPages} />
    </div>
  );
}
