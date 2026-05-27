"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminLogoutAction } from "@/lib/admin/actions";
import type { AdminUser } from "@/lib/admin/require-admin";

const NAV = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/projects/new", label: "New project" },
  { href: "/admin/projects/orbitx-voice-pipeline/edit", label: "Edit demo" },
];

export function AdminShell({
  user,
  children,
}: {
  user: AdminUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f5f5f3] text-[#111]">
      <header className="border-b border-[#e5e7eb] bg-white">
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
                        ? "bg-[#f3f4f6] font-medium text-[#111]"
                        : "text-[#666] hover:text-[#111]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-[12px] text-[#666] sm:inline">
              {user.email}
            </span>
            <form action={adminLogoutAction}>
              <button
                type="submit"
                className="text-[12px] font-medium text-[#666] transition-colors hover:text-[#111]"
              >
                Sign out
              </button>
            </form>
            <Link
              href="/"
              className="text-[12px] text-[#666] transition-colors hover:text-[#111]"
            >
              ← Site
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
