/*
  Warnings:

  - You are about to drop the column `templateId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_templateId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "templateId";

-- CreateTable
CREATE TABLE "TagsOnTemplate" (
    "templateId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnTemplate_pkey" PRIMARY KEY ("tagId","templateId")
);

-- AddForeignKey
ALTER TABLE "TagsOnTemplate" ADD CONSTRAINT "TagsOnTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnTemplate" ADD CONSTRAINT "TagsOnTemplate_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
