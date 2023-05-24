/*
  Warnings:

  - Made the column `occupation_id` on table `volunteer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "volunteer" DROP CONSTRAINT "volunteer_occupation_id_fkey";

-- AlterTable
ALTER TABLE "volunteer" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "cargo" DROP NOT NULL,
ALTER COLUMN "occupation_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "volunteer" ADD CONSTRAINT "volunteer_occupation_id_fkey" FOREIGN KEY ("occupation_id") REFERENCES "occupations_area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
