import {
  clearAdminSession,
  getAdminToken,
} from "./adminAuth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

/* =========================================================
   TYPES
========================================================= */

export type BlogStatus =
  | "DRAFT"
  | "PUBLISHED";

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface AdminBlog {
  id: number;

  title: string;
  slug: string;
  excerpt: string;

  category: string;
  author: string;

  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  readingTime: string;

  image: string | null;

  featured: boolean;
  status: BlogStatus;

  tags: string[];

  seoTitle: string;
  seoDescription: string;

  sections: BlogSection[];
  faqs: BlogFaq[];

  relatedServiceSlugs: string[];
  relatedFleetSlugs: string[];
  relatedAreaSlugs: string[];
}

export interface BlogPayload {
  title: string;
  slug: string;
  excerpt: string;

  category: string;
  author: string;

  publishedAt?: string;

  readingTime: string;

  image?: string;

  featured: boolean;
  status: BlogStatus;

  tags: string[];

  seoTitle: string;
  seoDescription: string;

  sections: BlogSection[];
  faqs: BlogFaq[];

  relatedServiceSlugs: string[];
  relatedFleetSlugs: string[];
  relatedAreaSlugs: string[];
}

/* =========================================================
   REQUEST HELPER
========================================================= */

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
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,

        ...options.headers,
      },
    },
  );

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

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
        ? String(
            (
              data as {
                message?: string | string[];
              }
            ).message,
          )
        : "Something went wrong.";

    throw new Error(message);
  }

  return data as T;
}

/* =========================================================
   BLOG API
========================================================= */

export function getAdminBlogs() {
  return adminRequest<AdminBlog[]>(
    "/blogs/admin/all",
  );
}

export function getAdminBlog(
  id: number,
) {
  return adminRequest<AdminBlog>(
    `/blogs/admin/${id}`,
  );
}

export function createAdminBlog(
  payload: BlogPayload,
) {
  return adminRequest<AdminBlog>(
    "/blogs/admin",
    {
      method: "POST",

      body: JSON.stringify(payload),
    },
  );
}

export function updateAdminBlog(
  id: number,
  payload: Partial<BlogPayload>,
) {
  return adminRequest<AdminBlog>(
    `/blogs/admin/${id}`,
    {
      method: "PUT",

      body: JSON.stringify(payload),
    },
  );
}

export function publishAdminBlog(
  id: number,
) {
  return adminRequest<AdminBlog>(
    `/blogs/admin/${id}/publish`,
    {
      method: "PATCH",
    },
  );
}

export function unpublishAdminBlog(
  id: number,
) {
  return adminRequest<AdminBlog>(
    `/blogs/admin/${id}/unpublish`,
    {
      method: "PATCH",
    },
  );
}

export function deleteAdminBlog(
  id: number,
) {
  return adminRequest<{
    success: boolean;
    message: string;
  }>(
    `/blogs/admin/${id}`,
    {
      method: "DELETE",
    },
  );
}