import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import EditForm from "../_components/edit-form";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const story = await prisma.story.findUnique({ where: { id: id } });
  if (!story) {
    return {
      title: "Story not found | StoryCareer",
      description: "The requested story could not be found.",
    };
  }
  return {
    title: `${story.title} | Edit | StoryCareer`,
    description: `Edit "${story.title}" and manage its content. Connect through real stories and authentic voices on StoryCareer.`,
  };
}

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;

  const story = await prisma.story.findUnique({
    where: { id },
  });

  if (!story) {
    notFound();
  }

  return <EditForm story={story} />;
}
