"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageSquare, Heart, FileText } from "lucide-react"

interface StoryStatsProps {
  totalStories: number
  publishedStories: number
  totalComments: number
  totalSaves: number
}

export function StoryStats({
  totalStories,
  publishedStories,
  totalComments,
  totalSaves,
}: StoryStatsProps) {
  return (
    <div className="grid gap-3 grid-cols-2 lg:grid-cols-4 px-2 sm:px-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStories}</div>
          <p className="text-xs text-muted-foreground">
            All your stories
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Published</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{publishedStories}</div>
          <p className="text-xs text-muted-foreground">
            Public stories
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comments</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalComments}</div>
          <p className="text-xs text-muted-foreground">
            Total interactions
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saves</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSaves}</div>
          <p className="text-xs text-muted-foreground">
            Story bookmarks
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 