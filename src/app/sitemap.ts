import type { MetadataRoute } from "next";

const base = "https://evagorobets.com";
const locales = ["en", "jp"];

// Single stable timestamp per build/deploy rather than a fresh value on every
// request. Set SITE_LAST_MODIFIED (ISO date) at deploy time to reflect real
// content changes; otherwise this falls back to the module-init time, which is
// the build time for a statically generated sitemap.
const LAST_MODIFIED = (() => {
  const fromEnv = process.env.SITE_LAST_MODIFIED;
  if (fromEnv) {
    const parsed = new Date(fromEnv);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
})();

const routes = [
  "",
  "/business-portraits",
  "/corporate-events-photography",
  "/corporate",
  "/art-galleries-photography",
  "/pricing-calculator",
  "/photographer-japan",
  "/photographer-australia",
  "/portfolio",
  "/clients",
  "/about",
  "/contact-booking",
];


export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route.includes("contact") || route.includes("corporate") ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l === "jp" ? "ja" : l, `${base}/${l}${route}`])
          ),
        },
      });
    }

  }

  entries.push({
    url: `${base}/ugc`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  return entries;
}
