export function getSiteOrigin(value = process.env.NEXT_PUBLIC_SITE_URL) {
  if (!value?.trim()) return null;
  const url = new URL(value.trim());
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/" ||
    ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be the public website origin, such as https://your-project.pages.dev.",
    );
  }
  return url.origin;
}

export const placeholderSiteOrigin = "https://your-portfolio.example";
export const siteOrigin = getSiteOrigin() || placeholderSiteOrigin;
export const isSiteConfigured = !new URL(siteOrigin).hostname.endsWith(
  ".example",
);

export function siteUrl(path: string) {
  return new URL(path, `${siteOrigin}/`).href;
}
