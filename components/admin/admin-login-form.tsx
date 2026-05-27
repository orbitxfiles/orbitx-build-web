"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import {
  adminLoginAction,
  type AdminLoginState,
} from "@/lib/admin/actions";

const initialState: AdminLoginState = {};

const ERROR_MESSAGES: Record<string, string> = {
  forbidden: "Your account is not authorized for admin access.",
  session: "Your session expired. Please sign in again.",
};

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  const queryError = searchParams.get("error");
  const [state, formAction, pending] = useActionState(
    adminLoginAction,
    initialState
  );

  const bannerError =
    state.error ??
    (queryError ? (ERROR_MESSAGES[queryError] ?? "Sign in required.") : null);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />

      {bannerError ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {bannerError}
        </div>
      ) : null}

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#666]">
          Email
        </span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="h-11 w-full rounded-lg border border-[#e8eaed] bg-white px-3 text-sm outline-none ring-[#0a3450] focus:ring-2"
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#666]">
          Password
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-11 w-full rounded-lg border border-[#e8eaed] bg-white px-3 text-sm outline-none ring-[#0a3450] focus:ring-2"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-lg bg-[#0a3450] text-sm font-semibold text-white transition-opacity hover:bg-[#0d4366] disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in to admin"}
      </button>
    </form>
  );
}
