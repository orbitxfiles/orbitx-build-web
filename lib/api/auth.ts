import { apiFetch, getApiBase } from "./client";
import type { TokenResponse } from "@/lib/types";

export async function login(email: string, password: string): Promise<TokenResponse> {
  const res = await fetch(`${getApiBase()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function getMe(token: string) {
  return apiFetch<{ id: number; name: string; email: string; role: string }>(
    "/auth/me",
    { token }
  );
}
