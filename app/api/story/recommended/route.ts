import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const take = 6;

  const stories = await prisma.story.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * take,
    take,
    select: {
      id: true,
      title: true,
      image: true,
      category: true,
      createdAt: true,
    },
  });

  return NextResponse.json(stories);
}
