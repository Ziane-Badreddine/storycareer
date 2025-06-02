import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Utilisateur non authentifié" }, { status: 401 });
  }

  try {
    const stories = await prisma.story.findMany();
    return NextResponse.json(stories, { status: 200 });
  } catch (error) {
    console.error("Erreur Prisma:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
