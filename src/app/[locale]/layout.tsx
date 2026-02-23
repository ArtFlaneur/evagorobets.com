import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale, Locale } from "@/lib/i18n";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const BASE_URL = "https://evagorobets.com";

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const baseTitle = "Eva Gorobets — Tokyo Photographer";

  return {
    title: locale === "en" ? baseTitle : `${baseTitle} (${locale.toUpperCase()})`,
    description:
      "Executive portrait and corporate event photographer based in Tokyo. Business headshots, leadership portraits, conference photography. Trilingual: English, Japanese, Russian.",
    keywords: [
      "executive photographer Tokyo",
      "corporate photographer Tokyo",
      "business portrait photographer Tokyo",
      "executive headshots Tokyo",
      "leadership portrait Tokyo",
      "conference photographer Tokyo",
      "corporate event photographer Tokyo",
      "professional headshots Marunouchi",
      "Tokyo business photographer",
    ],
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        ja: `${BASE_URL}/jp`,
        ru: `${BASE_URL}/ru`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <>
      <SiteHeader locale={typedLocale} />
      <main className="pt-0">{children}</main>
      <SiteFooter locale={typedLocale} />

      <Script id="person-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Eva Gorobets Photography",
          description:
            "Executive portrait and corporate event photographer based in Tokyo. Trilingual: English, Japanese, Russian.",
          url: BASE_URL,
          email: "eva@artflaneur.com.au",
          priceRange: "¥¥¥",
          image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80",
          founder: {
            "@type": "Person",
            name: "Eva Gorobets",
            jobTitle: "Portrait & Corporate Photographer",
            knowsLanguage: ["English", "Japanese", "Russian"],
          },
          address: { "@type": "PostalAddress", addressLocality: "Tokyo", addressCountry: "JP" },
          areaServed: [
            { "@type": "City", name: "Tokyo" },
            { "@type": "City", name: "Melbourne" },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Photography Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Executive Headshots Tokyo" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Event Photography Tokyo" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Art Gallery Photography Tokyo" } },
            ],
          },
          sameAs: [
            "https://www.instagram.com/evagorobets/",
            "https://www.linkedin.com/in/evgorobets/",
          ],
        })}
      </Script>
    </>
  );
}
