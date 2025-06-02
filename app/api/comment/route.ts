// /app/api/comment/route.ts
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json("Unauthorized", { status: 401 });

  const { content, storyId } = await req.json();

  if (!content || !storyId) {
    return NextResponse.json("Missing fields", { status: 400 });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        storyId,
        userId: user.id,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json("Failed to create comment", { status: 500 });
  }
}
