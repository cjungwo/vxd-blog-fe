/*
  Warnings:

  - You are about to drop the column `authorName` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_authorName_fkey";

-- DropIndex
DROP INDEX "User_id_name_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorName";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
