-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "studentid" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_studentid_key" ON "User"("studentid");
