import {
  clearAdminSession,
  getAdminToken,
} from "./adminAuth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

export interface MailSettings {
  id: number;

  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;

  smtpUsername: string;
  hasSmtpPassword: boolean;

  fromName: string;
  fromEmail: string;
  replyToEmail: string;
  adminEmail: string;

  enabled: boolean;

  businessPhone: string;
  whatsappNumber: string;
  websiteUrl: string;
  businessAddress: string;

  sendAdminEmail: boolean;
  sendCustomerAutoReply: boolean;
  sendWhatsappNotification: boolean;

  updatedAt: string;
}

export interface UpdateMailSettingsPayload {
  smtpHost?: string;
  smtpPort?: number;
  smtpSecure?: boolean;

  smtpUsername?: string;
  smtpPassword?: string;

  fromName?: string;
  fromEmail?: string;
  replyToEmail?: string;
  adminEmail?: string;

  enabled?: boolean;

  businessPhone?: string;
  whatsappNumber?: string;
  websiteUrl?: string;
  businessAddress?: string;

  sendAdminEmail?: boolean;
  sendCustomerAutoReply?: boolean;
  sendWhatsappNotification?: boolean;
}

interface ApiMessageResponse {
  success: boolean;
  message: string;
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
    let message =
      "Something went wrong.";

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data
    ) {
      const apiMessage = (
        data as {
          message?: string | string[];
        }
      ).message;

      message = Array.isArray(
        apiMessage,
      )
        ? apiMessage.join(", ")
        : String(
            apiMessage ||
              message,
          );
    }

    throw new Error(message);
  }

  return data as T;
}

export function getMailSettings() {
  return adminRequest<MailSettings>(
    "/mail-settings",
  );
}

export function updateMailSettings(
  payload:
    UpdateMailSettingsPayload,
) {
  return adminRequest<MailSettings>(
    "/mail-settings",
    {
      method: "PUT",

      body: JSON.stringify(
        payload,
      ),
    },
  );
}

export function verifyMailConnection() {
  return adminRequest<ApiMessageResponse>(
    "/mail-settings/verify",
    {
      method: "POST",
    },
  );
}

export function sendTestMail(
  email: string,
) {
  return adminRequest<ApiMessageResponse>(
    "/mail-settings/test",
    {
      method: "POST",

      body: JSON.stringify({
        email,
      }),
    },
  );
}