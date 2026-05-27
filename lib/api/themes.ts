import { apiFetch } from "./client";
import type { Theme } from "@/lib/types";

export async function getThemes(): Promise<Theme[]> {
  return apiFetch<Theme[]>("/themes");
}

export async function getTheme(id: number): Promise<Theme> {
  return apiFetch<Theme>(`/themes/${id}`);
}

export async function getThemeBySlug(
  themes: Theme[],
  slug: string
): Promise<Theme | undefined> {
  return themes.find((t) => t.slug === slug);
}
