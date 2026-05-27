import type { Theme } from "@/lib/types";

/** Use theme colors as accents on light cards — never swap full page/card background */
export function themeAccentVars(theme?: Theme | null): Record<string, string> {
  if (!theme) {
    return {
      "--card-accent": "var(--theme-primary)",
      "--card-accent-soft": "color-mix(in srgb, var(--theme-primary) 12%, transparent)",
    };
  }
  return {
    "--card-accent": theme.primary_color,
    "--card-accent-soft": `${theme.primary_color}18`,
    "--card-accent-border": `${theme.primary_color}30`,
  };
}
