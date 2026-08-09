-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readingTime" TEXT NOT NULL,
    "image" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "BlogStatus" NOT NULL DEFAULT 'DRAFT',
    "tags" JSONB NOT NULL,
    "sections" JSONB NOT NULL,
    "faqs" JSONB,
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "relatedServiceSlugs" TEXT[],
    "relatedFleetSlugs" TEXT[],
    "relatedAreaSlugs" TEXT[],

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "smtpHost" TEXT,
    "smtpPort" INTEGER,
    "smtpSecure" BOOLEAN NOT NULL DEFAULT false,
    "smtpUsername" TEXT,
    "smtpPassword" TEXT,
    "fromName" TEXT,
    "fromEmail" TEXT,
    "replyToEmail" TEXT,
    "adminEmail" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MailSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");
