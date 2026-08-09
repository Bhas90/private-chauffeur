export interface BlogSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;

  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;

  readingTime: string;

  image: string | null;

  featured: boolean;
  status: "PUBLISHED";

  tags: string[];

  seoTitle: string;
  seoDescription: string;

  sections: BlogSection[];
  faqs: BlogFaq[];

  relatedServiceSlugs: string[];
  relatedFleetSlugs: string[];
  relatedAreaSlugs: string[];
}

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

async function request<T>(
  endpoint: string,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
  );

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data
        ? String(
            (
              data as {
                message?: string;
              }
            ).message,
          )
        : "Unable to load blog content.";

    throw new Error(message);
  }

  return data as T;
}

export function getPublishedBlogs() {
  return request<BlogPost[]>(
    "/blogs",
  );
}

export function getPublishedBlogBySlug(
  slug: string,
) {
  return request<BlogPost>(
    `/blogs/slug/${encodeURIComponent(
      slug,
    )}`,
  );
}

export function getRelatedPublishedBlogs(
  blogs: BlogPost[],
  currentSlug: string,
  category: string,
  limit = 3,
) {
  return blogs
    .filter(
      (blog) =>
        blog.slug !== currentSlug &&
        blog.category === category,
    )
    .slice(0, limit);
}