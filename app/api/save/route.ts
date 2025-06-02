import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json("Unauthorized", { status: 401 });

  const { storyId } = await req.json();
  if (!storyId) return NextResponse.json("Missing storyId", { status: 400 });

  try {
    await prisma.save.create({
      data: {
        userId: user.id,
        storyId,
      },
    });

    return NextResponse.json("Saved successfully", { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Already saved", { status: 409 });
    }
    return NextResponse.json("Failed to save", { status: 500 });
  }
}

