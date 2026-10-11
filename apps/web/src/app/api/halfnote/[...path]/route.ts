// Same-origin proxy from the browser's @halfnote/data client to Django. The only web-specific data code.
// Invariants:
//  - Target is always DJANGO_URL + the path after PREFIX + search. The client cannot choose the host.
//  - Authorization comes from the httpOnly `access` cookie; client-sent Authorization and Cookie are dropped.
//  - accounts/login and accounts/register are refused, so tokens only flow through server actions.
//  - Non-GET requests need a same-origin Origin (server actions gave us this check; the proxy must re-add it).
//  - The request body is streamed through, so multipart uploads keep their boundary.
//  - Django's status and body pass back unchanged, so the client's ApiError sees real 401s.
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const DJANGO_URL = (
  process.env.BASE_URL || "https://halfnote-backend.vercel.app/api"
).replace(/\/$/, "");
const PREFIX = "/api/halfnote";
const FORWARDED_REQUEST_HEADERS = ["accept", "accept-language", "content-type", "content-length"];

// Compare against what Django will route: percent-decoded path, empty segments ignored.
function isTokenRoute(path: string): boolean {
  const [app, view] = decodeURIComponent(path).split("/").filter(Boolean);
  return app === "accounts" && (view === "login" || view === "register");
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function proxy(req: NextRequest): Promise<Response> {
  const path = req.nextUrl.pathname.slice(PREFIX.length);
  try {
    if (isTokenRoute(path)) return Response.json({ message: "Not found" }, { status: 404 });
  } catch {
    return Response.json({ message: "Bad path" }, { status: 400 });
  }
  if (req.method !== "GET" && !isSameOrigin(req)) {
    return Response.json({ message: "Cross-origin request refused" }, { status: 403 });
  }

  const headers = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = req.headers.get(name);
    if (value) headers.set(name, value);
  }
  const access = (await cookies()).get("access")?.value;
  if (access) headers.set("authorization", `Bearer ${access}`);

  const upstream = await fetch(DJANGO_URL + path + req.nextUrl.search, {
    method: req.method,
    headers,
    body: req.method === "GET" ? undefined : req.body,
    duplex: "half",
    redirect: "manual",
    cache: "no-store",
  } as RequestInit);

  const responseHeaders = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);
  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
