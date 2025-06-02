import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const storyId = (await params).id;

  if (!storyId) {
    return NextResponse.json("Missing storyId", { status: 400 });
  }

  try {
    await prisma.save.delete({
      where: {
        userId_storyId: {
          userId: user.id,
          storyId: storyId,
        },
      },
    });

    return NextResponse.json("Save deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Delete save error:", error);
    return NextResponse.json("Failed to delete save", { status: 500 });
  }
}
