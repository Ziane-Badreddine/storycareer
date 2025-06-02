/*
  Warnings:

  - A unique constraint covering the columns `[userId,storyId]` on the table `Save` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Comment_userId_key";

-- DropIndex
DROP INDEX "Save_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Save_userId_storyId_key" ON "Save"("userId", "storyId");
