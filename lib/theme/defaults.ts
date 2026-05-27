import type { Theme } from "@/lib/types";

/** Master OrbitX fallback when API theme is unavailable */
export const ORBITX_MASTER_THEME: Theme = {
  id: 0,
  name: "OrbitX",
  slug: "orbitx-master",
  primary_color: "#0d4366",
  secondary_color: "#0a3450",
  accent_color: "#00436e",
  background_color: "#e8f1f5",
  text_color: "#1e3a4f",
  strong_text_color: "#0a3450",
  muted_text_color: "#5a7a8f",
  border_color: "#c5d9e4",
  heading_font: "General Sans",
  body_font: "General Sans",
  serif_font: "Cormorant Garamond",
  button_radius: "0.5rem",
  card_radius: "1rem",
  shadow_style: "0 4px 24px rgba(13, 67, 102, 0.08)",
  is_default: true,
};

export function themeToCssVars(theme: Theme): Record<string, string> {
  return {
    ["--theme-bg" as string]: theme.background_color,
    ["--theme-primary" as string]: theme.primary_color,
    ["--theme-secondary" as string]: theme.secondary_color,
    ["--theme-accent" as string]: theme.accent_color,
    ["--theme-text" as string]: theme.text_color,
    ["--theme-strong" as string]: theme.strong_text_color,
    ["--theme-muted" as string]: theme.muted_text_color,
    ["--theme-border" as string]: theme.border_color,
    ["--theme-btn-radius" as string]: theme.button_radius,
    ["--theme-card-radius" as string]: theme.card_radius,
    ["--theme-shadow" as string]: theme.shadow_style ?? "0 4px 24px rgba(0,0,0,0.06)",
    ["--theme-heading-font" as string]: theme.heading_font,
    ["--theme-body-font" as string]: theme.body_font,
    ["--theme-serif-font" as string]: theme.serif_font ?? "Cormorant Garamond",
  };
}
