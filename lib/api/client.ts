const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

const API_V1 = `${API_BASE}/api/v1`;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getApiBase() {
  return API_V1;
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { token?: string; timeoutMs?: number }
): Promise<T> {
  const { token, timeoutMs, ...init } = options ?? {};
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init.headers ?? {}),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const isServer = typeof window === "undefined";
  // During local `next build`, NODE_ENV=production but API may still be localhost.
  // Short-circuit to avoid long TCP/DNS hangs on unreachable local APIs.
  if (isServer && process.env.NODE_ENV === "production" && API_BASE.includes("localhost")) {
    throw new ApiError("API base is localhost during production build", 0);
  }
  const controller = new AbortController();
  const ms = timeoutMs ?? (isServer ? 8000 : 15000);
  const t = setTimeout(() => controller.abort(), ms);
  let res: Response;
  try {
    res = await fetch(`${API_V1}${path}`, {
      ...init,
      headers,
      signal: controller.signal,
      ...(isServer && !init.cache ? { next: { revalidate: 60 } } : {}),
    });
  } finally {
    clearTimeout(t);
  }

  if (!res.ok) {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = await res.text();
    }
    throw new ApiError(`API ${res.status}: ${path}`, res.status, body);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
