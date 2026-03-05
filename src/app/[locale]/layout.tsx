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

  const titles: Record<string, string> = {
    en: "Eva Gorobets — Portrait & Corporate Photographer, Tokyo & Melbourne",
    jp: "エヴァ・ゴロベッツ — 東京・メルボルン ポートレート & コーポレートフォトグラファー",
    ru: "Ева Горобец — Фотограф в Токио и Мельбурне: портреты и корпоративные мероприятия",
  };

  const descriptions: Record<string, string> = {
    en: "Executive portrait and corporate event photographer based in Tokyo, available in Melbourne and internationally. Business headshots, leadership portraits, conference photography. 15+ years. English, Japanese, Russian.",
    jp: "東京を拠点にメルボルンでも活動するエグゼクティブポートレート・法人イベント撮影のプロフェッショナル。ビジネスヘッドショット、リーダーシップポートレート、カンファレンス撮影。15年以上の経験。英語・日本語・ロシア語対応。",
    ru: "Фотограф портретов и корпоративных мероприятий, базируется в Токио, работает в Мельбурне и по всему миру. Хэдшоты руководителей, деловые портреты, съёмка конференций. Более 15 лет опыта. Английский, японский, русский.",
  };

  const keywords: Record<string, string[]> = {
    en: [
      "executive photographer Tokyo",
      "corporate photographer Tokyo",
      "business portrait photographer Tokyo",
      "executive headshots Tokyo",
      "leadership portrait Tokyo",
      "conference photographer Tokyo",
      "corporate event photographer Tokyo",
      "professional headshots Marunouchi",
      "LinkedIn photographer Tokyo",
      "executive photographer Melbourne",
      "corporate photographer Melbourne",
      "business portrait photographer Melbourne",
      "executive headshots Melbourne",
      "headshot photographer Melbourne CBD",
      "LinkedIn photographer Melbourne",
      "photographer for international companies Tokyo",
      "photographer for expats Tokyo",
      "photographer for expats Melbourne",
      "professional photographer Melbourne Australia",
    ],
    jp: [
      "東京 エグゼクティブ フォトグラファー",
      "東京 コーポレート 写真撮影",
      "東京 ビジネスポートレート 写真家",
      "エグゼクティブヘッドショット 東京",
      "東京 法人 カメラマン",
      "東京 会議 イベント 撮影",
      "東京 丸の内 ヘッドショット",
      "外資系企業 東京 撮影",
      "メルボルン コーポレートフォトグラファー",
      "東京 LinkedIn 写真",
    ],
    ru: [
      "коммерческий фотограф Токио",
      "фотограф портретов Токио",
      "деловые портреты Токио",
      "фотограф Мельбурн",
      "портретный фотограф Мельбурн",
      "корпоративный фотограф Токио",
      "фотосъёмка мероприятий Токио",
      "корпоративный фотограф Мельбурн",
      "хэдшот фотограф Токио",
      "фотограф для иностранных компаний Токио",
    ],
  };

  const ogLocales: Record<string, string> = { en: "en_US", jp: "ja_JP", ru: "ru_RU" };

  const title = titles[locale] ?? titles.en;
  const description = descriptions[locale] ?? descriptions.en;

  return {
    title,
    description,
    keywords: keywords[locale] ?? keywords.en,
    openGraph: {
      title,
      description,
      locale: ogLocales[locale] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        ja: `${BASE_URL}/jp`,
        ru: `${BASE_URL}/ru`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    other: {
      "geo.region": "JP-13",
      "geo.placename": "Tokyo",
      "geo.position": "35.6762;139.6503",
      ICBM: "35.6762, 139.6503",
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

      <Script id="schema-graph" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${BASE_URL}/#website`,
              url: BASE_URL,
              name: "Eva Gorobets Photography",
              description: "Portrait and corporate event photographer — Tokyo & Melbourne",
              inLanguage: ["en", "ja", "ru"],
            },
            {
              "@type": "Person",
              "@id": `${BASE_URL}/#person`,
              name: "Eva Gorobets",
              jobTitle: "Portrait & Corporate Photographer",
              url: BASE_URL,
              email: "eva@artflaneur.com.au",
              knowsLanguage: ["English", "Japanese", "Russian"],
              worksFor: { "@id": `${BASE_URL}/#business` },
              sameAs: [
                "https://www.instagram.com/evagorobets/",
                "https://www.linkedin.com/in/evgorobets/",
              ],
            },
            {
              "@type": "ProfessionalService",
              "@id": `${BASE_URL}/#business`,
              name: "Eva Gorobets Photography",
              description:
                "Executive portrait and corporate event photographer based in Tokyo, available in Melbourne and internationally. Trilingual: English, Japanese, Russian.",
              url: BASE_URL,
              email: "eva@artflaneur.com.au",
              priceRange: "¥¥¥",
              founder: { "@id": `${BASE_URL}/#person` },
              address: { "@type": "PostalAddress", addressLocality: "Tokyo", addressCountry: "JP" },
              geo: { "@type": "GeoCoordinates", latitude: 35.6762, longitude: 139.6503 },
              areaServed: [
                { "@type": "City", name: "Tokyo", sameAs: "https://www.wikidata.org/wiki/Q1490" },
                { "@type": "City", name: "Melbourne", sameAs: "https://www.wikidata.org/wiki/Q3141" },
                { "@type": "City", name: "Osaka" },
                { "@type": "City", name: "Kyoto" },
                { "@type": "City", name: "Sydney" },
                { "@type": "Country", name: "Japan" },
                { "@type": "Country", name: "Australia" },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Photography Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Executive Headshots & Business Portraits",
                      areaServed: ["Tokyo", "Melbourne"],
                      url: `${BASE_URL}/en/business-portraits`,
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Corporate Event Photography",
                      areaServed: ["Tokyo", "Melbourne", "Japan"],
                      url: `${BASE_URL}/en/corporate-events-photography`,
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Art Gallery & Exhibition Photography",
                      areaServed: ["Tokyo", "Melbourne"],
                      url: `${BASE_URL}/en/art-galleries-photography`,
                    },
                  },
                ],
              },
              sameAs: [
                "https://www.instagram.com/evagorobets/",
                "https://www.linkedin.com/in/evgorobets/",
              ],
            },
          ],
        })}
      </Script>
    </>
  );
}
