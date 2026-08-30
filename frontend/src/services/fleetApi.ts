import { fleetData } from "../data/fleetData";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

export type FleetMediaType =
  | "COVER"
  | "EXTERIOR"
  | "INTERIOR"
  | "VIDEO";

export interface FleetMedia {
  id: number;
  type: FleetMediaType;
  url: string;
  altText: string | null;
  displayOrder: number;
}

export interface FleetVehicle {
  id?: number;
  name: string;
  slug: string;
  category: string;
  heroDescription: string;
  description: string;
  coverImage: string;
  passengers: number;
  largeBags: number;
  cabinBags: number;
  featured: boolean;
  features: Array<{
    title: string;
    description: string;
  }>;
  journeys: Array<{
    title: string;
  }>;
  media: FleetMedia[];
}

export interface FleetPopupSettings {
  enabled: boolean;
  fleetVehicle?: FleetVehicle | null;
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  image?: string | null;
  video?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  showDelay?: number;
  displayDuration?: number;
  oncePerSession?: boolean;
}

const fallbackFleet: FleetVehicle[] = fleetData.map(
  (vehicle, index) => ({
    id: -(index + 1),
    name: vehicle.name,
    slug: vehicle.slug,
    category: vehicle.category,
    heroDescription: vehicle.heroDescription,
    description: vehicle.description,
    coverImage: vehicle.image,
    passengers: vehicle.passengers,
    largeBags: vehicle.largeBags,
    cabinBags: vehicle.cabinBags,
    featured: vehicle.featured ?? false,
    features: vehicle.features,
    journeys: vehicle.suitableFor.map((title) => ({
      title,
    })),
    media: vehicle.gallery.map((url, galleryIndex) => ({
      id: -(index * 100 + galleryIndex + 1),
      type: galleryIndex === 0 ? "COVER" : "EXTERIOR",
      url,
      altText: vehicle.name + " chauffeur vehicle",
      displayOrder: galleryIndex,
    })),
  }),
);

function normaliseVehicle(
  vehicle: Partial<FleetVehicle>,
): FleetVehicle {
  const media = Array.isArray(vehicle.media)
    ? vehicle.media
    : [];
  const coverImage =
    vehicle.coverImage ||
    media.find((item) => item.type === "COVER")?.url ||
    media.find((item) => item.type === "EXTERIOR")?.url ||
    "";

  return {
    id: vehicle.id,
    name: vehicle.name ?? "",
    slug: vehicle.slug ?? "",
    category: vehicle.category ?? "",
    heroDescription: vehicle.heroDescription ?? "",
    description: vehicle.description ?? "",
    coverImage,
    passengers: vehicle.passengers ?? 0,
    largeBags: vehicle.largeBags ?? 0,
    cabinBags: vehicle.cabinBags ?? 0,
    featured: vehicle.featured ?? false,
    features: vehicle.features ?? [],
    journeys: vehicle.journeys ?? [],
    media,
  };
}

async function publicRequest<T>(
  endpoint: string,
): Promise<T> {
  const response = await fetch(
    API_URL + endpoint,
  );

  if (!response.ok) {
    throw new Error("Fleet API is unavailable.");
  }

  return response.json() as Promise<T>;
}

export async function getFleet(): Promise<FleetVehicle[]> {
  try {
    const data = await publicRequest<
      FleetVehicle[]
    >("/fleet");
    return data.length > 0
      ? data.map(normaliseVehicle)
      : fallbackFleet;
  } catch {
    return fallbackFleet;
  }
}

export async function getFeaturedFleet(): Promise<
  FleetVehicle[]
> {
  try {
    const data = await publicRequest<
      FleetVehicle[]
    >("/fleet/featured");
    return data.length > 0
      ? data.map(normaliseVehicle)
      : fallbackFleet.filter(
        (vehicle) => vehicle.featured,
      );
  } catch {
    return fallbackFleet.filter(
      (vehicle) => vehicle.featured,
    );
  }
}

export async function getFleetVehicle(
  slug: string,
): Promise<FleetVehicle | null> {
  try {
    const data = await publicRequest<FleetVehicle>(
      "/fleet/" + encodeURIComponent(slug),
    );
    return normaliseVehicle(data);
  } catch {
    return (
      fallbackFleet.find(
        (vehicle) => vehicle.slug === slug,
      ) ?? null
    );
  }
}

export async function getFleetPopup(): Promise<
  FleetPopupSettings | null
> {
  try {
    const data = await publicRequest<FleetPopupSettings>(
      "/fleet-popup",
    );
    return data.enabled ? data : null;
  } catch {
    return null;
  }
}
