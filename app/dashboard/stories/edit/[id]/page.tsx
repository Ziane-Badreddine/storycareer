import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import EditForm from "../_components/edit-form";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;

  const story = await prisma.story.findUnique({
    where: {
      id: id,
    },
  });

  if (!story) {
    notFound();
  }
  return <EditForm story={story} />
}
