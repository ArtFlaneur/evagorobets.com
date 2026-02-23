import type { MetadataRoute } from "next";

const base = "https://evagorobets.com";
const locales = ["en", "jp", "ru"];

const routes = [
  "",
  "/tokyo-business-portraits",
  "/corporate-events-photography",
  "/corporate",
  "/art-galleries-photography",
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
        lastModified: new Date(),
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

  return entries;
}
