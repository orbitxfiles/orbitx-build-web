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

async function requireAdminToken(): Promise<{ token?: string; error?: string }> {
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
  return { token };
}

export async function saveProjectAction(input: {
  mode: "create" | "edit";
  slug: string;
  payload: Record<string, unknown>;
}): Promise<{ error?: string; slug?: string }> {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) {
    return { error: auth.error ?? "Not authenticated." };
  }

  try {
    const method = input.mode === "create" ? "POST" : "PUT";
    const path =
      input.mode === "create" ? "/projects" : `/projects/${input.slug}`;

    await apiFetch<unknown>(path, {
      method,
      token: auth.token,
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

export async function createArticleAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  if (!title || !slug) {
    redirect("/admin/articles/new?error=title-slug-required");
  }

  await apiFetch("/articles", {
    method: "POST",
    token: auth.token,
    body: JSON.stringify({
      title,
      slug,
      excerpt,
      content_markdown: "",
      visibility: "draft",
      published: false,
      featured: false,
    }),
  });
  redirect("/admin?created=article");
}

export async function createCategoryAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  if (!name || !slug) {
    redirect("/admin/categories/new?error=name-slug-required");
  }

  await apiFetch("/categories", {
    method: "POST",
    token: auth.token,
    body: JSON.stringify({ name, slug, description }),
  });
  redirect("/admin?created=category");
}

export async function createResourceAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);

  const title = String(formData.get("title") ?? "").trim();
  const file_url = String(formData.get("file_url") ?? "").trim();
  const type = String(formData.get("type") ?? "pdf");
  const description = String(formData.get("description") ?? "").trim() || null;
  if (!title || !file_url) {
    redirect("/admin/resources/new?error=title-url-required");
  }

  await apiFetch("/resources", {
    method: "POST",
    token: auth.token,
    body: JSON.stringify({ title, file_url, type, description }),
  });
  redirect("/admin?created=resource");
}

export async function createVideoAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);

  const title = String(formData.get("title") ?? "").trim();
  const video_url = String(formData.get("video_url") ?? "").trim();
  const platform = String(formData.get("platform") ?? "youtube");
  if (!title || !video_url) {
    redirect("/admin/videos/new?error=title-url-required");
  }

  await apiFetch("/videos", {
    method: "POST",
    token: auth.token,
    body: JSON.stringify({ title, video_url, platform }),
  });
  redirect("/admin?created=video");
}

export async function createThemeAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const primary_color = String(formData.get("primary_color") ?? "#0a3450");
  const secondary_color = String(formData.get("secondary_color") ?? "#0d4366");
  const accent_color = String(formData.get("accent_color") ?? "#1a7a5e");
  if (!name || !slug) {
    redirect("/admin/themes/new?error=name-slug-required");
  }

  await apiFetch("/themes", {
    method: "POST",
    token: auth.token,
    body: JSON.stringify({
      name,
      slug,
      primary_color,
      secondary_color,
      accent_color,
      background_color: "#e8f1f5",
      text_color: "#1f2937",
      strong_text_color: "#0a3450",
      muted_text_color: "#4a6b82",
      border_color: "rgba(13,67,102,0.12)",
      heading_font: "Inter",
      body_font: "Inter",
      button_radius: "0.5rem",
      card_radius: "0.75rem",
      is_default: false,
    }),
  });
  redirect("/admin?created=theme");
}

function formInt(formData: FormData, key: string): number {
  return Number.parseInt(String(formData.get(key) ?? "0"), 10);
}

export async function updateArticleAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);
  const id = formInt(formData, "id");
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const visibility = String(formData.get("visibility") ?? "draft");
  const published = String(formData.get("published") ?? "") === "on";

  await apiFetch(`/articles/${id}`, {
    method: "PATCH",
    token: auth.token,
    body: JSON.stringify({ title, slug, excerpt, visibility, published }),
  });
  redirect("/admin?updated=article");
}

export async function deleteArticleAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);
  const id = formInt(formData, "id");
  await apiFetch(`/articles/${id}`, { method: "DELETE", token: auth.token });
  redirect("/admin?deleted=article");
}

export async function updateCategoryAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);
  const id = formInt(formData, "id");
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  await apiFetch(`/categories/${id}`, {
    method: "PATCH",
    token: auth.token,
    body: JSON.stringify({ name, slug, description }),
  });
  redirect("/admin?updated=category");
}

export async function deleteCategoryAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);
  const id = formInt(formData, "id");
  await apiFetch(`/categories/${id}`, { method: "DELETE", token: auth.token });
  redirect("/admin?deleted=category");
}

export async function updateResourceAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);
  const id = formInt(formData, "id");
  const title = String(formData.get("title") ?? "").trim();
  const file_url = String(formData.get("file_url") ?? "").trim();
  const type = String(formData.get("type") ?? "pdf");
  const description = String(formData.get("description") ?? "").trim() || null;
  await apiFetch(`/resources/${id}`, {
    method: "PATCH",
    token: auth.token,
    body: JSON.stringify({ title, file_url, type, description }),
  });
  redirect("/admin?updated=resource");
}

export async function deleteResourceAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);
  const id = formInt(formData, "id");
  await apiFetch(`/resources/${id}`, { method: "DELETE", token: auth.token });
  redirect("/admin?deleted=resource");
}

export async function updateVideoAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);
  const id = formInt(formData, "id");
  const title = String(formData.get("title") ?? "").trim();
  const video_url = String(formData.get("video_url") ?? "").trim();
  const platform = String(formData.get("platform") ?? "youtube");
  await apiFetch(`/videos/${id}`, {
    method: "PATCH",
    token: auth.token,
    body: JSON.stringify({ title, video_url, platform }),
  });
  redirect("/admin?updated=video");
}

export async function deleteVideoAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);
  const id = formInt(formData, "id");
  await apiFetch(`/videos/${id}`, { method: "DELETE", token: auth.token });
  redirect("/admin?deleted=video");
}

export async function updateThemeAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);
  const id = formInt(formData, "id");
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const primary_color = String(formData.get("primary_color") ?? "#0a3450");
  const secondary_color = String(formData.get("secondary_color") ?? "#0d4366");
  const accent_color = String(formData.get("accent_color") ?? "#1a7a5e");
  await apiFetch(`/themes/${id}`, {
    method: "PATCH",
    token: auth.token,
    body: JSON.stringify({ name, slug, primary_color, secondary_color, accent_color }),
  });
  redirect("/admin?updated=theme");
}

export async function deleteThemeAction(formData: FormData) {
  const auth = await requireAdminToken();
  if (auth.error || !auth.token) redirect(`/admin?error=${encodeURIComponent(auth.error ?? "auth")}`);
  const id = formInt(formData, "id");
  await apiFetch(`/themes/${id}`, { method: "DELETE", token: auth.token });
  redirect("/admin?deleted=theme");
}
