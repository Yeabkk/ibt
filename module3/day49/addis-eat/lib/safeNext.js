/**
 * Sanitizes open-redirect targets to guarantee all redirections stay internal.
 * Rejects external schemes, protocol-relative URLs (//evil.com), backslash confusion (/\evil.com),
 * and CRLF injection.
 */
export function sanitizeReturnUrl(rawNext, fallback = "/checkout") {
  if (typeof rawNext !== "string") return fallback;
  const trimmed = rawNext.trim();
  if (!trimmed) return fallback;

  // Must begin with a single "/" and never "//" or "/\"
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.startsWith("/\\")) {
    return fallback;
  }

  // Must not contain scheme separators ("://") or control/CRLF characters
  if (trimmed.includes("://") || /[\r\n\t]/.test(trimmed)) {
    return fallback;
  }

  try {
    const parsed = new URL(trimmed, "http://localhost");
    // Origin must remain localhost and protocol must remain http:
    if (parsed.origin !== "http://localhost" || parsed.protocol !== "http:") {
      return fallback;
    }
    return `${parsed.pathname}${parsed.search}`;
  } catch {
    return fallback;
  }
}
