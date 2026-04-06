-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Analyst', 'Admin');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'expense';
