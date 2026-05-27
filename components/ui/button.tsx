import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#0a3450] text-white hover:bg-[#00436e] active:scale-[0.98] hover:scale-[1.02]",
  secondary:
    "border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent)] active:scale-[0.98] hover:scale-[1.02]",
  outline:
    "border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--accent)]",
  ghost: "text-[var(--text-primary)] hover:bg-[var(--border)]/30",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
  showArrow = false,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  showArrow?: boolean;
}) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium",
    "rounded-[var(--radius-sm)] transition-all duration-200 ease-out",
    variants[variant],
    className
  );

  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="h-4 w-4" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={base} onClick={onClick}>
      {content}
    </button>
  );
}
