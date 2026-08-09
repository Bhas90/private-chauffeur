const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
}

interface LoginResponse {
  accessToken: string;
  admin: AdminUser;
}

const TOKEN_KEY = "pcm_admin_token";
const ADMIN_KEY = "pcm_admin_user";

export async function adminLogin(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to sign in. Please check your details.",
    );
  }

  localStorage.setItem(
    TOKEN_KEY,
    data.accessToken,
  );

  localStorage.setItem(
    ADMIN_KEY,
    JSON.stringify(data.admin),
  );

  return data;
}

export async function getCurrentAdmin(): Promise<AdminUser> {
  const token = getAdminToken();

  if (!token) {
    throw new Error("No admin session found.");
  }

  const response = await fetch(
    `${API_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    clearAdminSession();

    throw new Error(
      data?.message ||
        "Your admin session has expired.",
    );
  }

  localStorage.setItem(
    ADMIN_KEY,
    JSON.stringify(data),
  );

  return data;
}

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredAdmin(): AdminUser | null {
  const stored = localStorage.getItem(ADMIN_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as AdminUser;
  } catch {
    return null;
  }
}

export function isAdminAuthenticated(): boolean {
  return Boolean(getAdminToken());
}

export function clearAdminSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}