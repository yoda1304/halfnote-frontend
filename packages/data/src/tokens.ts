// Token-returning calls stay off HalfnoteClient, so the browser client can never receive raw tokens.
// Callers: web login/register server actions, the iOS session module.
import { send } from "./client";
import type { Credentials, RegisterInput } from "./endpoints";

export interface Tokens {
  access: string;
  refresh: string;
}

function toTokens(raw: unknown): Tokens {
  const { access_token, refresh_token } = (raw ?? {}) as Record<string, unknown>;
  if (typeof access_token !== "string" || typeof refresh_token !== "string") {
    throw new Error("Invalid token data received");
  }
  return { access: access_token, refresh: refresh_token };
}

export function requestTokens(baseUrl: string, c: Credentials): Promise<Tokens> {
  return send(
    { baseUrl },
    {
      method: "POST",
      path: "/accounts/login/",
      json: { username: c.username, password: c.password },
      parse: toTokens,
    },
  );
}

/** SimpleJWT rotates refresh tokens: persist the returned `refresh`. The backend has no blacklist, so the old one stays valid until it expires. */
export function refreshTokens(baseUrl: string, refresh: string): Promise<Tokens> {
  return send(
    { baseUrl },
    {
      method: "POST",
      path: "/accounts/token/refresh/",
      json: { refresh },
      parse: (raw) => {
        const { access, refresh } = (raw ?? {}) as Record<string, unknown>;
        if (typeof access !== "string" || typeof refresh !== "string") {
          throw new Error("Invalid token data received");
        }
        return { access, refresh };
      },
    },
  );
}

export function registerAccount(baseUrl: string, input: RegisterInput): Promise<Tokens> {
  return send(
    { baseUrl },
    {
      method: "POST",
      path: "/accounts/register/",
      form: {
        username: input.username,
        email: input.email,
        password: input.password,
        bio: input.bio || undefined,
        avatar: input.avatar,
      },
      parse: toTokens,
    },
  );
}
