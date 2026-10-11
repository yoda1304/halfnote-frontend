// Silent session renewal for pages, server actions, and the /api/halfnote proxy.
// Downstream code (dal.ts, the proxy) keeps reading cookies(); this rewrites the request's cookie
// header, so the same request already carries the renewed access token.
import { ApiError, refreshTokens } from "@halfnote/data";
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIES, setTokenCookies } from "./app/lib/session";

const BASE_URL = (
  process.env.BASE_URL || "https://halfnote-backend.vercel.app/api"
).replace(/\/$/, "");
const REFRESH_WINDOW_MS = 60_000;

function expiresSoon(jwt: string | undefined): boolean {
  if (!jwt) return true;
  try {
    const payload = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(payload)) as { exp?: unknown };
    return typeof exp !== "number" || exp * 1000 - Date.now() < REFRESH_WINDOW_MS;
  } catch {
    return true;
  }
}

export async function middleware(req: NextRequest) {
  const refresh = req.cookies.get("refresh")?.value;
  if (!refresh || !expiresSoon(req.cookies.get("access")?.value)) return NextResponse.next();

  try {
    const tokens = await refreshTokens(BASE_URL, refresh);
    req.cookies.set("access", tokens.access);
    req.cookies.set("refresh", tokens.refresh);
    const res = NextResponse.next({ request: { headers: req.headers } });
    setTokenCookies(res.cookies, tokens);
    return res;
  } catch (error) {
    // Network or server trouble: let the request through and retry on the next one.
    if (!(error instanceof ApiError && error.status === 401)) return NextResponse.next();
    for (const name of SESSION_COOKIES) req.cookies.delete(name);
    const res = NextResponse.next({ request: { headers: req.headers } });
    for (const name of SESSION_COOKIES) res.cookies.delete(name);
    return res;
  }
}

export const config = {
  // "/api/halfnote" listed on its own: Django paths can contain dots (usernames), which the page pattern skips as static files.
  matcher: ["/api/halfnote/:path*", "/((?!api/|_next/|.*\\.).*)"],
};
