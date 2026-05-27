"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/projects/new", label: "New project" },
  { href: "/admin/projects/orbitx-voice-pipeline/edit", label: "Edit demo" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1a1a1a]">
      <header className="border-b border-[#e8eaed] bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link
              href="/admin"
              className="text-sm font-semibold tracking-tight text-[#111]"
            >
              OrbitX Admin
            </Link>
            <nav className="hidden items-center gap-1 sm:flex">
              {NAV.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-[13px] transition-colors",
                      active
                        ? "bg-[#f0f2f5] font-medium text-[#111]"
                        : "text-[#666] hover:text-[#111]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <Link
            href="/"
            className="text-[12px] text-[#888] transition-colors hover:text-[#333]"
          >
            ← Site
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
