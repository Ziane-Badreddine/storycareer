import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  if (query.trim() === "") {
    return NextResponse.json([]);
  }

  const stories = await prisma.story.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { descrption: { contains: query, mode: "insensitive" } },
      ],
      isPublished: true,
    },
  });

  // Trier les résultats : ceux qui commencent par la query en premier
  const sortedStories = stories.sort((a, b) => {
    const queryLower = query.toLowerCase();
    const aTitleLower = a.title.toLowerCase();
    const bTitleLower = b.title.toLowerCase();
    const aDescLower = a.descrption?.toLowerCase() || "";
    const bDescLower = b.descrption?.toLowerCase() || "";

    // Vérifier si le titre commence par la query
    const aTitleStarts = aTitleLower.startsWith(queryLower);
    const bTitleStarts = bTitleLower.startsWith(queryLower);

    // Vérifier si la description commence par la query
    const aDescStarts = aDescLower.startsWith(queryLower);
    const bDescStarts = bDescLower.startsWith(queryLower);

    // Priorité 1 : Titre commence par query
    if (aTitleStarts && !bTitleStarts) return -1;
    if (!aTitleStarts && bTitleStarts) return 1;

    // Priorité 2 : Description commence par query
    if (aDescStarts && !bDescStarts) return -1;
    if (!aDescStarts && bDescStarts) return 1;

    // Priorité 3 : Ordre alphabétique du titre
    return aTitleLower.localeCompare(bTitleLower);
  });

  return NextResponse.json(sortedStories);
}