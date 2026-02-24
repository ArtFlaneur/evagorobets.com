"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Locale, locales } from "@/lib/i18n";

const displayLabel: Record<Locale, string> = { en: "EN", jp: "JA", ru: "RU" };

function replaceLocale(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${nextLocale}`;
  parts[0] = nextLocale;
  return `/${parts.join("/")}`;
}

export function LanguageSwitcher({
  currentLocale,
  light = false,
}: {
  currentLocale: Locale;
  light?: boolean;
}) {
  const pathname = usePathname() || `/${currentLocale}`;

  const activeClass = light ? "text-white" : "text-black";
  const inactiveClass = light
    ? "text-white/40 hover:text-white/75"
    : "text-black/35 hover:text-black/70";
  const dotClass = light ? "text-white/20" : "text-black/20";

  return (
    <div className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.18em" }}>
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 && <span className={dotClass}>&middot;</span>}
          <Link
            href={replaceLocale(pathname, locale)}
            className={`uppercase transition-colors ${
              locale === currentLocale ? activeClass : inactiveClass
            }`}
          >
            {displayLabel[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
