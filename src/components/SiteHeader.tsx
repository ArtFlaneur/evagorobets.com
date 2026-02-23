import Link from "next/link";

import { Locale, navItems } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 mix-blend-normal">
      <div className="mx-auto flex w-full max-w-340 items-center justify-between px-6 py-6 md:px-10">
        <Link
          href={`/${locale}`}
          className="label hover:opacity-60 transition-opacity"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}
        >
          Eva Gorobets
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.href} className="relative group">
                <Link
                  href={`/${locale}${item.href}`}
                  className="label hover:opacity-100 transition-opacity"
                >
                  {item.labels[locale]}
                </Link>
                {/* Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-30">
                  <div className="bg-white border border-black/10 py-2 min-w-[11rem]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={`/${locale}${child.href}`}
                        className="block px-5 py-3 label hover:opacity-100 transition-opacity whitespace-nowrap"
                      >
                        {child.labels[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="label hover:opacity-100 transition-opacity"
              >
                {item.labels[locale]}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden md:block">
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <MobileMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}
