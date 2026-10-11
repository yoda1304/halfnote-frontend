"use server";
import { cookies } from "next/headers";
import { registerAccount, requestTokens, type Tokens } from "@halfnote/data";
import { SESSION_COOKIES, setTokenCookies } from "../lib/session";

const BASE_URL = (
  process.env.BASE_URL || "https://halfnote-backend.vercel.app/api"
).replace(/\/$/, "");

// Not exported: every export of a "use server" file is callable from the browser.
async function createSession(tokens: Tokens, username: string) {
  const cookieStore = await cookies();
  setTokenCookies(cookieStore, tokens);
  cookieStore.set("username", username, {
    httpOnly: false,
    path: "/",
  });
}

export const RegisterUser = async (
  username: string,
  email: string,
  password: string,
  bio?: string,
  avatar?: File,
): Promise<void> => {
  const tokens = await registerAccount(BASE_URL, { username, email, password, bio, avatar });
  await createSession(tokens, username);
};

export const LoginUser = async (username: string, password: string): Promise<void> => {
  const tokens = await requestTokens(BASE_URL, { username, password });
  await createSession(tokens, username);
};

export const logoutUser = async (): Promise<void> => {
  const cookieStore = await cookies();
  for (const name of SESSION_COOKIES) cookieStore.delete(name);
};
