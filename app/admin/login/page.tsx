import Link from "next/link";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f7f9] px-6 py-16">
      <div className="w-full max-w-md rounded-xl border border-[rgba(13,67,102,0.1)] bg-white p-8 shadow-[0_8px_30px_rgba(10,52,80,0.08)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6a8fa8]">
          OrbitX Admin
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-[#0a3450]">Sign in</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#4a6b82]">
          Admin access is restricted to authorized accounts only.
        </p>

        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-[#666]">Loading…</p>}>
            <AdminLoginForm />
          </Suspense>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium text-[#4a6b82] hover:text-[#0a3450]"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
