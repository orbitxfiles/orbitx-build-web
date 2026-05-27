/** OrbitX design tokens — single source of truth */
export const tokens = {
  bg: "#e8f1f5",
  bgSurface: "#f0f5f8",
  bgCard: "#ffffff",
  textPrimary: "#0d4366",
  textStrong: "#0a3450",
  textMuted: "#4a6b82",
  accent: "#00436e",
  accentGreen: "#1a7a5e",
  accentPurple: "#6b4fa0",
  accentRed: "#8b3a3a",
  accentBlue: "#2d5fa0",
  accentTeal: "#1a6b6b",
  border: "rgba(13,67,102,0.10)",
  borderHover: "rgba(13,67,102,0.22)",
  radiusCard: "14px",
  radiusSm: "8px",
  shadowCard: "0 1px 3px rgba(13,67,102,0.07), 0 4px 16px rgba(13,67,102,0.06)",
  shadowHover:
    "0 8px 32px rgba(13,67,102,0.13), 0 2px 8px rgba(13,67,102,0.08)",
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export type SectionAccentKey =
  | "projects"
  | "learn"
  | "whatBroke"
  | "frameworks"
  | "buildLogs"
  | "default";

export const sectionAccent: Record<SectionAccentKey, string> = {
  projects: tokens.accentGreen,
  learn: tokens.accentPurple,
  whatBroke: tokens.accentRed,
  frameworks: tokens.accentBlue,
  buildLogs: tokens.accentTeal,
  default: tokens.accent,
};
