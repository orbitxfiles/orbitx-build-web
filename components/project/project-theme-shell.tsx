"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { projectThemeFromAccent } from "@/lib/project-theme";

const DEFAULT_KEYS = [
  "--bg",
  "--bg-surface",
  "--bg-card",
  "--text-primary",
  "--text-strong",
  "--text-muted",
  "--accent",
  "--border",
  "--border-hover",
  "--shadow-card",
  "--shadow-hover",
  "--section-accent",
  "--project-accent",
  "--project-accent-dark",
  "--project-accent-soft",
] as const;

export function ProjectThemeShell({
  accent,
  children,
}: {
  accent: string;
  children: ReactNode;
}) {
  const vars = projectThemeFromAccent(accent);

  useLayoutEffect(() => {
    const theme = projectThemeFromAccent(accent);
    const root = document.documentElement;
    const previous: Record<string, string> = {};

    for (const key of DEFAULT_KEYS) {
      previous[key] = root.style.getPropertyValue(key);
      root.style.setProperty(key, theme[key] ?? "");
    }

    root.dataset.projectTheme = "true";

    return () => {
      for (const key of DEFAULT_KEYS) {
        if (previous[key]) {
          root.style.setProperty(key, previous[key]);
        } else {
          root.style.removeProperty(key);
        }
      }
      delete root.dataset.projectTheme;
    };
  }, [accent]);

  return (
    <div className="min-h-full" style={vars as React.CSSProperties}>
      {children}
    </div>
  );
}
