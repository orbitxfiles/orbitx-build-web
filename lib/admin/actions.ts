"use server";

import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api/client";
import { getMe, login } from "@/lib/api/auth";
import {
  clearAuthCookies,
  getAccessToken,
  setAuthCookies,
} from "@/lib/admin/session";

export type AdminLoginState = {
  error?: string;
};

export async function adminLoginAction(
  _prev: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin").trim() || "/admin";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const tokens = await login(email, password);
    const me = await getMe(tokens.access_token);

    if (me.role !== "admin") {
      return { error: "This account does not have admin access." };
    }

    await setAuthCookies(tokens);
  } catch {
    return { error: "Invalid email or password." };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function adminLogoutAction() {
  await clearAuthCookies();
  redirect("/admin/login");
}

export async function saveProjectAction(input: {
  mode: "create" | "edit";
  slug: string;
  payload: Record<string, unknown>;
}): Promise<{ error?: string; slug?: string }> {
  const token = await getAccessToken();
  if (!token) {
    return { error: "Not authenticated. Please sign in again." };
  }

  try {
    const me = await getMe(token);
    if (me.role !== "admin") {
      return { error: "Insufficient permissions." };
    }
  } catch {
    return { error: "Session expired. Please sign in again." };
  }

  try {
    const method = input.mode === "create" ? "POST" : "PUT";
    const path =
      input.mode === "create" ? "/projects" : `/projects/${input.slug}`;

    await apiFetch<unknown>(path, {
      method,
      token,
      body: JSON.stringify(input.payload),
    });

    const slug = String(input.payload.slug ?? input.slug);
    return { slug };
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Failed to save project.",
    };
  }
}
