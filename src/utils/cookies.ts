export function getCookiesAsCollection (rawCookie: string | undefined): Record<string, string> {
    const cookies: Record<string, string> = {};
    rawCookie && rawCookie.split(";").forEach(function (cookie: string) {
      const parts: RegExpMatchArray | null = cookie.match(/(.*?)=(.*)$/);
      if (parts && parts.length) {
        cookies[parts[1].trim()] = (parts[2] || "").trim();
      }
    });
    return cookies;
};