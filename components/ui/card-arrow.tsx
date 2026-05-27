import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CardArrow({ className }: { className?: string }) {
  return (
    <ArrowUpRight
      className={cn(
        "h-4 w-4 text-[var(--text-muted)]",
        "transition-[transform,color] duration-200 ease-out",
        "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--section-accent)]",
        className
      )}
      strokeWidth={2}
    />
  );
}
