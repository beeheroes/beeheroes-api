/*
  Warnings:

  - You are about to drop the column `cargo` on the `volunteer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "volunteer" DROP COLUMN "cargo",
ADD COLUMN     "role" TEXT;
