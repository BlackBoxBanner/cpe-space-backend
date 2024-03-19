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