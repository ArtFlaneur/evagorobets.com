"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Locale, locales } from "@/lib/i18n";

function replaceLocale(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${nextLocale}`;
  parts[0] = nextLocale;
  return `/${parts.join("/")}`;
}

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname() || `/${currentLocale}`;

  return (
    <div className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.18em" }}>
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-black/20">&middot;</span>}
          <Link
            href={replaceLocale(pathname, locale)}
            className={`uppercase transition-opacity ${
              locale === currentLocale ? "text-black" : "text-black/35 hover:text-black/70"
            }`}
          >
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
