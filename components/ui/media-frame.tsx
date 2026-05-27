"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

function Placeholder({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--theme-border)]/40 to-[var(--theme-primary)]/5",
        className
      )}
    >
      <div className="grid grid-cols-3 gap-1 opacity-40">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[var(--theme-primary)]"
          />
        ))}
      </div>
      {label && (
        <span className="text-[10px] uppercase tracking-widest text-[var(--theme-muted)]">
          {label}
        </span>
      )}
    </div>
  );
}

export function MediaFrame({
  src,
  alt,
  className,
  aspectClass = "aspect-[16/10]",
  label = "Preview",
}: {
  src?: string | null;
  alt?: string;
  className?: string;
  aspectClass?: string;
  label?: string;
}) {
  const [failed, setFailed] = useState(false);
  const valid = src && src.startsWith("http") && !failed;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl ring-1 ring-[var(--theme-border)]/60",
        aspectClass,
        className
      )}
    >
      {valid ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => setFailed(true)}
        />
      ) : (
        <Placeholder label={label} className="absolute inset-0" />
      )}
    </div>
  );
}
