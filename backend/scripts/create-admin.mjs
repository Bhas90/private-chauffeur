import "dotenv/config";

import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
const adminName = process.env.ADMIN_NAME;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing.");
}

if (!adminName) {
  throw new Error("ADMIN_NAME is missing.");
}

if (!adminEmail) {
  throw new Error("ADMIN_EMAIL is missing.");
}

if (!adminPassword) {
  throw new Error("ADMIN_PASSWORD is missing.");
}

if (adminPassword.length < 10) {
  throw new Error(
    "ADMIN_PASSWORD must contain at least 10 characters.",
  );
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const email = adminEmail.trim().toLowerCase();

  const passwordHash = await bcrypt.hash(
    adminPassword,
    12,
  );

  const admin = await prisma.adminUser.upsert({
    where: {
      email,
    },

    update: {
      name: adminName.trim(),
      passwordHash,
      isActive: true,
    },

    create: {
      name: adminName.trim(),
      email,
      passwordHash,
      isActive: true,
    },

    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
      createdAt: true,
    },
  });

  console.log("");
  console.log("Admin account is ready.");
  console.log("-----------------------");
  console.log(`ID:     ${admin.id}`);
  console.log(`Name:   ${admin.name}`);
  console.log(`Email:  ${admin.email}`);
  console.log(`Active: ${admin.isActive}`);
  console.log("");
}

main()
  .catch((error) => {
    console.error("Failed to create admin:");
    console.error(error);

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });