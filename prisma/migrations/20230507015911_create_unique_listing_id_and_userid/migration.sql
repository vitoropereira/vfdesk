/*
  Warnings:

  - A unique constraint covering the columns `[userId,listingId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `favorites_userId_listingId_key` ON `favorites`(`userId`, `listingId`);
