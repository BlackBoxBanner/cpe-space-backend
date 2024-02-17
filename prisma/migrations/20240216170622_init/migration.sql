/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('GRADUATED', 'ENROLLED', 'DROPPED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'PROFESSOR', 'STUDENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "student" "UserStatus" NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
