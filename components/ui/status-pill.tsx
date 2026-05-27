import { cn } from "@/lib/utils";

export function StatusPill({
  children,
  className,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
        className
      )}
      style={{
        color: accent ?? "var(--theme-primary)",
        background: accent ? `${accent}14` : "var(--card-accent-soft, color-mix(in srgb, var(--theme-primary) 10%, transparent))",
      }}
    >
      {children}
    </span>
  );
}
