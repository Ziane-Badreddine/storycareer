import { prisma } from "@/lib/prisma"
import { StoryStats } from "./_components/StoryStats"
import { StoryChart } from "./_components/StoryChart"
import { StoryTable } from "./_components/StoryTable"
import { currentUser } from "@clerk/nextjs/server"
import { startOfDay, subDays, format } from "date-fns"

async function getData() {
  const user = await currentUser()
  if (!user) {
    throw new Error("User not found")
  }
  
  const stories = await prisma.story.findMany({
    where: {
      userId: user.id,
      createdAt: {
        gte: subDays(new Date(), 7) 
      }
    },
    include: {
      _count: {
        select: {
          comments: true,
          saves: true
        }
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  return stories
}

export default async function DashboardPage() {
  const stories = await getData()
  
  const publishedStories = stories.filter(story => story.isPublished).length
  const totalComments = stories.reduce((acc, story) => acc + story._count.comments, 0)
  const totalSaves = stories.reduce((acc, story) => acc + story._count.saves, 0)

  
  const storiesByDate = stories.reduce((acc, story) => {
    const date = format(startOfDay(story.createdAt), 'MMM dd')
    if (!acc[date]) {
      acc[date] = { total: 0 }
    }
    acc[date].total++
    return acc
  }, {} as Record<string, { total: number }>)

  // Fill in missing dates
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = format(startOfDay(subDays(new Date(), 6 - i)), 'MMM dd')
    return {
      date,
      total: storiesByDate[date]?.total || 0
    }
  })

  return (
    <div className="container mx-auto p-2 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      
      <StoryStats
        totalStories={stories.length}
        publishedStories={publishedStories}
        totalComments={totalComments}
        totalSaves={totalSaves}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <StoryChart data={chartData} />
        <StoryTable stories={stories} />
      </div>
    </div>
  )
}
