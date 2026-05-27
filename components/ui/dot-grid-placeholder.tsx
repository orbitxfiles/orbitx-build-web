import { cn } from "@/lib/utils";

export function DotGridPlaceholder({
  accent = "#1a7a5e",
  className,
  label,
}: {
  accent?: string;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden", className)}
      style={{
        backgroundColor: accent === "#1a7a5e" ? "#e8f4ef" : `${accent}14`,
        backgroundImage: `radial-gradient(${accent}33 1.5px, transparent 1.5px)`,
        backgroundSize: "6px 6px",
      }}
    >
      {label && (
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {label}
        </span>
      )}
    </div>
  );
}
