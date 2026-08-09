-- AlterTable
ALTER TABLE "MailSettings" ADD COLUMN     "businessAddress" TEXT,
ADD COLUMN     "businessPhone" TEXT,
ADD COLUMN     "sendAdminEmail" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sendCustomerAutoReply" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sendWhatsappNotification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "websiteUrl" TEXT,
ADD COLUMN     "whatsappNumber" TEXT;
