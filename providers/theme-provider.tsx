"use client";

import type { ReactNode } from "react";

/** Site shell uses global CSS tokens; no per-page background override on marketing pages */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/** Article / What Broke pages — light tint only, never full dark theme */
export function ThemedPage({
  children,
  className = "",
}: {
  theme?: unknown;
  children: ReactNode;
  className?: string;
}) {
  return <div className={`min-h-full bg-[var(--bg)] ${className}`}>{children}</div>;
}
