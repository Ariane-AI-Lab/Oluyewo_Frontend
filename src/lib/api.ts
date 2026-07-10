import { getAuthToken } from "./auth-store";

const DEFAULT_API_BASE_URL = "https://oluyewo-backend-o482.onrender.com";

function getApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.toString().trim();
  return configuredUrl || DEFAULT_API_BASE_URL;
}

export async function apiRequest<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(init.headers ?? {});

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (!headers.has("Content-Type") && init.body && typeof init.body === "string") {
    headers.set("Content-Type", "application/json");
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  let payload: unknown = null;

  if (contentType.includes("application/json")) {
    payload = await response.json().catch(() => null);
  } else if (response.status !== 204) {
    payload = await response.text();
  }

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && "detail" in payload && payload.detail) ||
      (payload && typeof payload === "object" && "message" in payload && payload.message) ||
      `La requête a échoué avec le statut ${response.status}`;

    throw new Error(typeof message === "string" ? message : "La requête a échoué.");
  }

  return payload as T;
}
