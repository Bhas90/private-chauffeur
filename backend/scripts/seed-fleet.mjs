import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import ts from "typescript";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

// fleetData.ts remains the safe public fallback and single source for the
// initial CMS import, preventing the database and fallback from drifting.
const sourcePath = resolve(import.meta.dirname, "../../frontend/src/data/fleetData.ts");
const source = await readFile(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`;
const { fleetData } = await import(moduleUrl);

const mediaRows = (vehicle) => {
  const rows = [];
  const seen = new Set();
  const add = (type, url, altText) => {
    if (!url || seen.has(`${type}:${url}`)) return;
    seen.add(`${type}:${url}`);
    rows.push({ type, url, altText, displayOrder: rows.length });
  };
  add("COVER", vehicle.image, `${vehicle.name} chauffeur vehicle`);
  for (const url of vehicle.media?.exterior ?? vehicle.gallery ?? []) add("EXTERIOR", url, `${vehicle.name} exterior`);
  for (const url of vehicle.media?.interior ?? []) add("INTERIOR", url, `${vehicle.name} interior`);
  for (const url of vehicle.media?.videos ?? []) add("VIDEO", url, `${vehicle.name} video`);
  return rows;
};

for (const [index, vehicle] of fleetData.entries()) {
  const scalarData = {
    name: vehicle.name,
    slug: vehicle.slug,
    category: vehicle.category,
    heroDescription: vehicle.heroDescription,
    description: vehicle.description,
    coverImage: vehicle.image,
    passengers: vehicle.passengers,
    largeBags: vehicle.largeBags,
    cabinBags: vehicle.cabinBags,
    active: true,
    featured: Boolean(vehicle.featured),
    displayOrder: index + 1,
    seoTitle: `${vehicle.name} Chauffeur Hire Melbourne | Private Chauffeur Melbourne`,
    seoDescription: vehicle.heroDescription,
  };
  const features = vehicle.features.map((feature, displayOrder) => ({ ...feature, displayOrder }));
  const journeys = vehicle.suitableFor.map((title, displayOrder) => ({ title, displayOrder }));
  const media = mediaRows(vehicle);

  const saved = await prisma.fleetVehicle.upsert({
    where: { slug: vehicle.slug },
    create: {
      ...scalarData,
      features: { create: features },
      journeys: { create: journeys },
      media: { create: media },
    },
    update: {
      ...scalarData,
      features: { deleteMany: {}, create: features },
      journeys: { deleteMany: {}, create: journeys },
      media: { deleteMany: {}, create: media },
    },
  });
  console.log(`Seeded ${saved.name}: ${features.length} features, ${journeys.length} journeys, ${media.length} media items`);
}

await prisma.$disconnect();
