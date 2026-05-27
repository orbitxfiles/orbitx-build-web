import { cookies } from "next/headers";

export const ACCESS_COOKIE = "orbitx_admin_access";
export const REFRESH_COOKIE = "orbitx_admin_refresh";

const ACCESS_MAX_AGE = 60 * 60; // 1 hour
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function cookieBase() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}

export async function setAuthCookies(tokens: {
  access_token: string;
  refresh_token: string;
}) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, tokens.access_token, {
    ...cookieBase(),
    maxAge: ACCESS_MAX_AGE,
  });
  store.set(REFRESH_COOKIE, tokens.refresh_token, {
    ...cookieBase(),
    maxAge: REFRESH_MAX_AGE,
  });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value;
}
