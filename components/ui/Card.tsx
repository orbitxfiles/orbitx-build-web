"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-[#ffffff] border border-[rgba(13,67,102,0.10)] rounded-[12px]",
        "shadow-[0_1px_2px_rgba(13,67,102,0.06),_0_4px_16px_rgba(13,67,102,0.05)]",
        "transition-[box-shadow,transform,border-color] duration-[280ms] ease",
        "hover:-translate-y-[3px]",
        "hover:shadow-[0_8px_28px_rgba(13,67,102,0.11),_0_2px_8px_rgba(13,67,102,0.07)]",
        "hover:border-[rgba(13,67,102,0.20)]",
        className
      )}
    >
      {children}
    </div>
  );
}

