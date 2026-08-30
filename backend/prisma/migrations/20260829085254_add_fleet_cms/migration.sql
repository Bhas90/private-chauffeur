-- CreateEnum
CREATE TYPE "FleetMediaType" AS ENUM ('COVER', 'EXTERIOR', 'INTERIOR', 'VIDEO');

-- CreateTable
CREATE TABLE "FleetVehicle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT,
    "passengers" INTEGER NOT NULL,
    "largeBags" INTEGER NOT NULL,
    "cabinBags" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FleetVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FleetFeature" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FleetFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FleetJourney" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FleetJourney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FleetMedia" (
    "id" SERIAL NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "type" "FleetMediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FleetMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FleetPopupSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "fleetVehicleId" INTEGER,
    "eyebrow" TEXT,
    "heading" TEXT,
    "description" TEXT,
    "image" TEXT,
    "video" TEXT,
    "ctaText" TEXT,
    "ctaLink" TEXT,
    "showDelay" INTEGER NOT NULL DEFAULT 5000,
    "displayDuration" INTEGER NOT NULL DEFAULT 7000,
    "oncePerSession" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FleetPopupSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FleetVehicle_slug_key" ON "FleetVehicle"("slug");

-- CreateIndex
CREATE INDEX "FleetVehicle_active_displayOrder_idx" ON "FleetVehicle"("active", "displayOrder");

-- CreateIndex
CREATE INDEX "FleetVehicle_featured_active_displayOrder_idx" ON "FleetVehicle"("featured", "active", "displayOrder");

-- CreateIndex
CREATE INDEX "FleetFeature_vehicleId_displayOrder_idx" ON "FleetFeature"("vehicleId", "displayOrder");

-- CreateIndex
CREATE INDEX "FleetJourney_vehicleId_displayOrder_idx" ON "FleetJourney"("vehicleId", "displayOrder");

-- CreateIndex
CREATE INDEX "FleetMedia_vehicleId_type_displayOrder_idx" ON "FleetMedia"("vehicleId", "type", "displayOrder");

-- AddForeignKey
ALTER TABLE "FleetFeature" ADD CONSTRAINT "FleetFeature_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "FleetVehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FleetJourney" ADD CONSTRAINT "FleetJourney_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "FleetVehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FleetMedia" ADD CONSTRAINT "FleetMedia_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "FleetVehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FleetPopupSettings" ADD CONSTRAINT "FleetPopupSettings_fleetVehicleId_fkey" FOREIGN KEY ("fleetVehicleId") REFERENCES "FleetVehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
