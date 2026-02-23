export const locales = ["en", "jp", "ru"] as const;

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
    labels: { en: "For Companies", jp: "法人のお客様", ru: "Для компаний" },
    children: [
      {
        href: "/tokyo-business-portraits",
        labels: { en: "Business Portraits", jp: "ビジネスポートレート", ru: "Бизнес-портреты" },
      },
      {
        href: "/corporate-events-photography",
        labels: { en: "Corporate Events", jp: "コーポレートイベント", ru: "Корпоративные события" },
      },
    ],
  },
  {
    href: "/art-galleries-photography",
    labels: { en: "For Art World", jp: "アートの世界", ru: "Для арт-мира" },
  },
  {
    href: "/clients",
    labels: { en: "Clients", jp: "クライアント", ru: "Клиенты" },
  },
  {
    href: "/about",
    labels: { en: "About", jp: "プロフィール", ru: "О фотографе" },
  },
  {
    href: "/contact-booking",
    labels: { en: "Contact", jp: "お問い合わせ", ru: "Контакт" },
  },
];
