"use server";

import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api/client";
import { AuthError, getMe, isAdminRole, login } from "@/lib/api/auth";
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

    if (!isAdminRole(me.role)) {
      return { error: "This account does not have admin access." };
    }

    await setAuthCookies(tokens);
  } catch (err: unknown) {
    if (err instanceof AuthError) {
      if (err.status >= 500) {
        return {
          error:
            "API server error during login. Ensure Render has DATABASE_URL and SECRET_KEY set, then redeploy the API.",
        };
      }
      return { error: "Invalid email or password." };
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
    if (apiUrl.includes("localhost")) {
      return {
        error:
          "Frontend is pointing to localhost API. Set NEXT_PUBLIC_API_URL on Vercel to your Render URL.",
      };
    }
    return {
      error:
        err instanceof Error
          ? err.message
          : "Could not reach the API. Check NEXT_PUBLIC_API_URL and CORS_ORIGINS.",
    };
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
    if (!isAdminRole(me.role)) {
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
