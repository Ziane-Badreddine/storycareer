import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("unauthorized", { status: 401 }); // 401 is the correct status for unauthorized
  }

  const { id } = await params;

  try {
    await prisma.story.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json("Story deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Prisma create error:", error);
    return NextResponse.json("Failed to deleted story", { status: 500 });
  }
}


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("unauthorized", { status: 401 }); // 401 is the correct status for unauthorized
  }

  const { id } = await params;

  try {
    const story = await prisma.story.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json(story, { status: 200 });
  } catch (error) {
    console.error("Prisma create error:", error);
    return NextResponse.json("Failed to get story", { status: 500 });
  }
}


export async function PUT( req: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("unauthorized", { status: 401 }); // 401 is the correct status for unauthorized
  }

   const { id } = await params;

  const body = await req.json();

  try {
    await prisma.story.update({
      data: {
        userId: user.id,
        ...body,
      },
      where:{
        id:id
      }
    });

    return NextResponse.json("Story updated successfully", { status: 200 });
  } catch (error) {
    console.error("Prisma create error:", error);
    return NextResponse.json("Failed to updated story", { status: 500 });
  }
}