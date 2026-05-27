"use client";

import { cn } from "@/lib/utils";
import type { SectionAccentKey } from "@/lib/tokens";
import { sectionAccent } from "@/lib/tokens";

export function CardSurface({
  children,
  className,
  accent = "default",
  accentColor,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: SectionAccentKey;
  accentColor?: string;
  hover?: boolean;
}) {
  const barColor = accentColor ?? sectionAccent[accent];

  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-[var(--bg-card)]",
        "border border-[var(--border)]",
        "shadow-[var(--shadow-card)]",
        hover &&
          "transition-[transform,box-shadow,border-color] duration-[280ms] ease-[var(--ease-out)] hover:-translate-y-[3px] hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-hover)]",
        className
      )}
      style={{
        borderRadius: "var(--radius-card)",
        ["--section-accent" as string]: barColor,
      }}
    >
      <div
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{
          background: barColor,
          borderTopLeftRadius: "var(--radius-card)",
          borderTopRightRadius: "var(--radius-card)",
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
