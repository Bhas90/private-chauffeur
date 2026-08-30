import {
  clearAdminSession,
  getAdminToken,
} from "./adminAuth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

export type FleetMediaType =
  | "COVER"
  | "EXTERIOR"
  | "INTERIOR"
  | "VIDEO";

export interface FleetFeature {
  id?: number;
  title: string;
  description: string;
  displayOrder?: number;
}

export interface FleetJourney {
  id?: number;
  title: string;
  displayOrder?: number;
}

export interface FleetMedia {
  id: number;
  type: FleetMediaType;
  url: string;
  altText: string | null;
  displayOrder: number;
}

export interface AdminFleetVehicle {
  id: number;
  name: string;
  slug: string;
  category: string;
  heroDescription: string;
  description: string;
  coverImage: string | null;
  passengers: number;
  largeBags: number;
  cabinBags: number;
  active: boolean;
  featured: boolean;
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
  features: FleetFeature[];
  journeys: FleetJourney[];
  media: FleetMedia[];
  createdAt: string;
  updatedAt: string;
}

export interface FleetPayload {
  name: string;
  slug: string;
  category: string;
  heroDescription: string;
  description: string;
  coverImage?: string;
  passengers: number;
  largeBags: number;
  cabinBags: number;
  active: boolean;
  featured: boolean;
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  recommendedJourneys: Array<{
    title: string;
  }>;
}

export interface FleetPopupSettings {
  id: number;
  enabled: boolean;
  fleetVehicleId: number | null;
  eyebrow: string | null;
  heading: string | null;
  description: string | null;
  image: string | null;
  video: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  showDelay: number;
  displayDuration: number;
  oncePerSession: boolean;
  fleetVehicle: AdminFleetVehicle | null;
}

async function adminRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAdminToken();

  if (!token) {
    clearAdminSession();
    throw new Error(
      "Your admin session has expired. Please sign in again.",
    );
  }

  const response = await fetch(
    API_URL + endpoint,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        ...options.headers,
      },
    },
  );

  const data: unknown = await response
    .json()
    .catch(() => null);

  if (response.status === 401) {
    clearAdminSession();
    throw new Error(
      "Your admin session has expired. Please sign in again.",
    );
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data
        ? (
          data as {
            message?: string | string[];
          }
        ).message
        : "Something went wrong.";

    throw new Error(
      Array.isArray(message)
        ? message.join(", ")
        : String(message),
    );
  }

  return data as T;
}

export const getAdminFleet = () =>
  adminRequest<AdminFleetVehicle[]>(
    "/admin/fleet",
  );

export const getAdminFleetVehicle = (
  id: number,
) =>
  adminRequest<AdminFleetVehicle>(
    "/admin/fleet/" + id,
  );

export const createAdminFleet = (
  payload: FleetPayload,
) =>
  adminRequest<AdminFleetVehicle>(
    "/admin/fleet",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

export const updateAdminFleet = (
  id: number,
  payload: Partial<FleetPayload>,
) =>
  adminRequest<AdminFleetVehicle>(
    "/admin/fleet/" + id,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );

export const deleteAdminFleet = (
  id: number,
) =>
  adminRequest<{
    success: boolean;
    message: string;
  }>(
    "/admin/fleet/" + id,
    { method: "DELETE" },
  );

export const addAdminFleetMedia = (
  vehicleId: number,
  payload: {
    type: FleetMediaType;
    url: string;
    altText?: string;
    displayOrder?: number;
  },
) =>
  adminRequest<FleetMedia>(
    "/admin/fleet/" + vehicleId + "/media",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

export const deleteAdminFleetMedia = (
  vehicleId: number,
  mediaId: number,
) =>
  adminRequest<{
    success: boolean;
    message: string;
  }>(
    "/admin/fleet/" +
      vehicleId +
      "/media/" +
      mediaId,
    { method: "DELETE" },
  );

export const orderAdminFleetMedia = (
  vehicleId: number,
  mediaIds: number[],
) =>
  adminRequest<FleetMedia[]>(
    "/admin/fleet/" + vehicleId + "/media/order",
    {
      method: "PATCH",
      body: JSON.stringify({ mediaIds }),
    },
  );

export const getFleetPopupSettings = () =>
  adminRequest<FleetPopupSettings>(
    "/admin/fleet-popup",
  );

export const updateFleetPopupSettings = (
  payload: Partial<FleetPopupSettings>,
) =>
  adminRequest<FleetPopupSettings>(
    "/admin/fleet-popup",
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
