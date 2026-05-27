import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function PageSection({
  label,
  title,
  description,
  children,
  surface = false,
  className,
}: {
  label: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  surface?: boolean;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "pt-[96px] pb-[96px]",
        surface ? "bg-[var(--bg-surface)]" : "bg-[var(--bg)]",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
            {label}
          </p>
          <h2
            className="mt-2 font-semibold text-[var(--text-strong)]"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.2,
              fontFamily: "var(--font-heading)",
            }}
          >
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-2xl text-[1.05rem] text-[var(--text-muted)]">
              {description}
            </p>
          )}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
