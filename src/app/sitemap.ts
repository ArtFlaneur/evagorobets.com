import type { MetadataRoute } from "next";

const base = "https://evagorobets.com";
const locales = ["en", "jp"];

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

const mentoringRoutes = [
  { url: `${base}/mentoring`, changeFrequency: "monthly" as const, priority: 0.9 },
  { url: `${base}/en/mentoring`, changeFrequency: "monthly" as const, priority: 0.9 },
];


export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${base}/${locale}${route}`,
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
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push(...mentoringRoutes);

  return entries;
}
