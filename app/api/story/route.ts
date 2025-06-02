import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("unauthorized", { status: 401 }); // 401 is the correct status for unauthorized
  }

  const body = await req.json();

  try {
    await prisma.story.create({
      data: {
        userId: user.id,
        ...body,
      },
    });

    return NextResponse.json("Story created successfully", { status: 201 });
  } catch (error) {
    console.error("Prisma create error:", error);
    return NextResponse.json("Failed to create story", { status: 500 });
  }
}

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("unauthorized", { status: 401 }); // 401 is the correct status for unauthorized
  }


  try {
    const stories = await prisma.story.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(stories, { status: 200 });
  } catch (error) {
    console.error("Prisma create error:", error);
    return NextResponse.json("Failed to fetch story", { status: 500 });
  }
}
