/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_categoryId_fkey";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT;

-- DropTable
DROP TABLE "Category";
