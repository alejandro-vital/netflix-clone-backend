/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `posterUrl` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "posterUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_movieId_key" ON "Favorite"("userId", "movieId");
