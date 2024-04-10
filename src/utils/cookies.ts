import { CookieOptions } from "express";

/**
 * Parses the provided raw cookie string and returns a dictionary of cookie key-value pairs.
 * @param {string | undefined} rawCookie - The raw cookie string to be parsed.
 * @returns {Record<string, string>} A dictionary containing cookie key-value pairs.
 * @example
 * // get raw cookies from the req.headers.cookie
 * const cookies = getCookies(req.headers.cookie); 
 * // userId will be '123' if there is one else it will return undefine
 * const userId = cookies["user-id"]; 
 */
export function getCookies(rawCookie: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {};
  rawCookie && rawCookie.split(";").forEach(function (cookie: string) {
    const parts: RegExpMatchArray | null = cookie.match(/(.*?)=(.*)$/);
    if (parts && parts.length) {
      cookies[parts[1].trim()] = (parts[2] || "").trim();
    }
  });
  return cookies;
};

export const developmentOptions: CookieOptions = {
  httpOnly: true,
  path: "/",
  domain: "localhost",
  secure: false,
  sameSite: "lax",
  maxAge: 3600000,
}

export const productionOptions: CookieOptions = {
  httpOnly: true,
  path: "/",
  secure: true,
  sameSite: "none",
  maxAge: 43200000,
}

export const cookieOptions: CookieOptions = process.env.NODE_ENV === "production" ? productionOptions : developmentOptions;