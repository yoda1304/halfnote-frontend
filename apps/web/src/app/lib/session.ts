import type { Tokens } from "@halfnote/data";

interface CookieJar {
  set(name: string, value: string, options: Record<string, unknown>): unknown;
}

// Fits both next/headers cookies() and NextResponse.cookies, so login and the middleware refresh write identical cookies.
export function setTokenCookies(jar: CookieJar, tokens: Tokens) {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "lax",
    path: "/",
  };
  jar.set("access", tokens.access, options);
  jar.set("refresh", tokens.refresh, options);
}

export const SESSION_COOKIES = ["access", "refresh", "username"] as const;
