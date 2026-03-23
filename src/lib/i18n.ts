export const locales = ["en", "jp"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type NavChild = {
  href: string;
  labels: Record<Locale, string>;
};

export type NavItem = {
  href: string;
  labels: Record<Locale, string>;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  {
    href: "/corporate",
    labels: { en: "For Companies", jp: "法人のお客様" },
    children: [
      {
        href: "/business-portraits",
        labels: { en: "Business Portraits", jp: "ビジネスポートレート" },
      },
      {
        href: "/corporate-events-photography",
        labels: { en: "Corporate Events", jp: "コーポレートイベント" },
      },
    ],
  },
  {
    href: "/art-galleries-photography",
    labels: { en: "For Art World", jp: "アートの世界" },
  },
  {
    href: "/clients",
    labels: { en: "Clients", jp: "クライアント" },
  },
  {
    href: "/about",
    labels: { en: "About", jp: "プロフィール" },
  },
  {
    href: "/contact-booking",
    labels: { en: "Contact", jp: "お問い合わせ" },
  },
];
