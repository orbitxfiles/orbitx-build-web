import { apiFetch, getApiBase } from "./client";
import type { TokenResponse } from "@/lib/types";

export class AuthError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export async function login(
  email: string,
  password: string
): Promise<TokenResponse> {
  const res = await fetch(`${getApiBase()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const body = (await res.json()) as { detail?: unknown };
      if (typeof body.detail === "string") detail = body.detail;
      else if (Array.isArray(body.detail)) detail = "Invalid credentials";
    } catch {
      /* ignore */
    }
    throw new AuthError(detail, res.status);
  }

  return res.json();
}

export async function getMe(token: string) {
  return apiFetch<{ id: number; name: string; email: string; role: string }>(
    "/auth/me",
    { token, cache: "no-store" }
  );
}

export function isAdminRole(role: string): boolean {
  return String(role).toLowerCase() === "admin";
}
