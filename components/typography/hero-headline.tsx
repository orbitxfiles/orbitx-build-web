import { cn } from "@/lib/utils";

export function HeroHeadline({
  children,
  className,
  as: Tag = "h1",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      className={cn(
        "font-semibold tracking-[-0.03em] text-[var(--theme-strong)]",
        "text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.25rem]",
        className
      )}
      style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
    >
      {children}
    </Tag>
  );
}

export function SerifEmphasis({ children }: { children: React.ReactNode }) {
  return (
    <em
      className="font-normal not-italic text-[var(--theme-primary)]"
      style={{ fontFamily: "var(--font-serif), Georgia, serif", fontStyle: "italic" }}
    >
      {children}
    </em>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-3xl font-semibold tracking-[-0.02em] text-[var(--theme-strong)] md:text-4xl lg:text-[2.75rem] lg:leading-tight",
        className
      )}
      style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
    >
      {children}
    </h2>
  );
}

export function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--theme-primary)]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function BodyLarge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-lg leading-[1.65] text-[var(--theme-muted)] md:text-xl",
        className
      )}
    >
      {children}
    </p>
  );
}
