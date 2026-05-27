/** Derive full-page CSS variables from a project accent hex. */

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h.padStart(6, "0").slice(0, 6);
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

function mix(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number
) {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

function darken(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const f = 1 - amount;
  return rgbToHex(r * f, g * f, b * f);
}

export function projectThemeFromAccent(accent: string): Record<string, string> {
  const accentRgb = hexToRgb(accent);
  const white = { r: 255, g: 255, b: 255 };
  const bg = mix(accentRgb, white, 0.92);
  const bgSurface = mix(accentRgb, white, 0.88);
  const bgCard = mix(accentRgb, white, 0.97);
  const primary = darken(accent, 0.15);
  const strong = darken(accent, 0.35);
  const muted = mix(accentRgb, { r: 74, g: 107, b: 130 }, 0.55);

  const border = `rgba(${Math.round(accentRgb.r)},${Math.round(accentRgb.g)},${Math.round(accentRgb.b)},0.14)`;
  const borderHover = `rgba(${Math.round(accentRgb.r)},${Math.round(accentRgb.g)},${Math.round(accentRgb.b)},0.28)`;
  const shadow = `0 1px 3px rgba(${Math.round(accentRgb.r)},${Math.round(accentRgb.g)},${Math.round(accentRgb.b)},0.08), 0 4px 16px rgba(${Math.round(accentRgb.r)},${Math.round(accentRgb.g)},${Math.round(accentRgb.b)},0.07)`;
  const shadowHover = `0 8px 32px rgba(${Math.round(accentRgb.r)},${Math.round(accentRgb.g)},${Math.round(accentRgb.b)},0.14), 0 2px 8px rgba(${Math.round(accentRgb.r)},${Math.round(accentRgb.g)},${Math.round(accentRgb.b)},0.08)`;

  const accentDark = mix(accentRgb, { r: 13, g: 31, b: 45 }, 0.72);

  return {
    "--bg": rgbToHex(bg.r, bg.g, bg.b),
    "--bg-surface": rgbToHex(bgSurface.r, bgSurface.g, bgSurface.b),
    "--bg-card": rgbToHex(bgCard.r, bgCard.g, bgCard.b),
    "--text-primary": primary,
    "--text-strong": strong,
    "--text-muted": rgbToHex(muted.r, muted.g, muted.b),
    "--accent": accent,
    "--border": border,
    "--border-hover": borderHover,
    "--shadow-card": shadow,
    "--shadow-hover": shadowHover,
    "--section-accent": accent,
    "--project-accent": accent,
    "--project-accent-dark": rgbToHex(accentDark.r, accentDark.g, accentDark.b),
    "--project-accent-soft": `rgba(${Math.round(accentRgb.r)},${Math.round(accentRgb.g)},${Math.round(accentRgb.b)},0.12)`,
  };
}
