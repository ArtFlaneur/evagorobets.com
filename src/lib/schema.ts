const BASE_URL = "https://evagorobets.com";

type Locale = "en" | "jp";

type OfferInput = {
  name: string;
  price: number;
  priceCurrency: "JPY" | "AUD" | "USD";
  description?: string;
};

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  serviceType: string | string[];
  areaServed: string[];
  offers?: OfferInput[];
};

type WebApplicationSchemaInput = {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  featureList: string[];
};

function getLocalizedPath(path: string, locale: Locale) {
  return `${BASE_URL}/${locale}${path}`;
}

function getAvailableLanguages(locale: Locale) {
  return locale === "jp"
    ? ["Japanese", "English", "Russian"]
    : ["English", "Japanese", "Russian"];
}

export function buildServiceSchema({
  name,
  description,
  path,
  locale,
  serviceType,
  areaServed,
  offers,
}: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: getLocalizedPath(path, locale),
    serviceType,
    provider: {
      "@id": `${BASE_URL}/#business`,
    },
    availableLanguage: getAvailableLanguages(locale),
    areaServed,
    offers: offers?.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      availability: "https://schema.org/InStock",
      url: getLocalizedPath(path, locale),
    })),
  };
}

export function buildWebApplicationSchema({
  name,
  description,
  path,
  locale,
  featureList,
}: WebApplicationSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: getLocalizedPath(path, locale),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: locale === "jp" ? "ja" : "en",
    featureList,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "JPY",
    },
    publisher: {
      "@id": `${BASE_URL}/#business`,
    },
  };
}