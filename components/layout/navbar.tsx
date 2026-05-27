"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/learn", label: "Learn" },
  { href: "/what-broke", label: "What Broke" },
  { href: "/build-logs", label: "Build Logs" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.startsWith("/learn?")) return pathname === "/learn";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--border)]"
      style={{
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
        backdropFilter: "blur(12px)",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="text-[15px] font-semibold text-[var(--text-strong)] transition-colors duration-150 ease-out"
        >
          OrbitX
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ease-out",
                    active
                      ? "bg-[#0a3450] text-white"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/search"
          className="flex items-center gap-2 text-[13px] text-[var(--text-muted)] transition-colors duration-150 ease-out hover:text-[var(--text-primary)]"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </Link>
      </nav>
    </header>
  );
}
