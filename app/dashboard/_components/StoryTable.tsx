"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Story {
  id: string
  title: string
  category: string | null
  isPublished: boolean
  createdAt: Date
  _count: {
    comments: number
    saves: number
  }
}

interface StoryTableProps {
  stories: Story[]
}

export function StoryTable({ stories }: StoryTableProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Stories</CardTitle>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <ScrollArea className="h-[300px] sm:h-[350px] w-full rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Comments</TableHead>
                <TableHead className="text-right hidden sm:table-cell">Saves</TableHead>
                <TableHead className="hidden sm:table-cell">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stories.map((story) => (
                <TableRow 
                  key={story.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => window.location.href = `/stories/${story.id}`}
                >
                  <TableCell className="font-medium">{story.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {story.category ? (
                      <Badge variant="secondary" className="w-fit">
                        {story.category}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">No category</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={story.isPublished ? "default" : "secondary"}>
                      {story.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{story._count.comments}</TableCell>
                  <TableCell className="text-right hidden sm:table-cell">{story._count.saves}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 