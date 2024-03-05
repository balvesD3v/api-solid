/*
  Warnings:

  - You are about to drop the column `gymId` on the `check_ins` table. All the data in the column will be lost.
  - Added the required column `gym_Id` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_gymId_fkey";

-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "gymId",
ADD COLUMN     "gym_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gym_Id_fkey" FOREIGN KEY ("gym_Id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
