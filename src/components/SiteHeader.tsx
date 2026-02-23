"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Locale, navItems } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Hidden during black intro, appears when slideshow starts.
  // HeroSlideshow writes data-hero-phase="photo" on body when overlay slides away.
  const [visible, setVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) { setVisible(true); return; }
    setVisible(false);
    const observer = new MutationObserver(() => {
      if (document.body.dataset.heroPhase === "photo") {
        setVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-hero-phase"] });
    return () => observer.disconnect();
  }, [isHome]);

  const color = "rgba(0,0,0,0.4)";
  const colorTransition = "color 0.5s ease";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="mx-auto flex w-full max-w-340 items-center justify-between px-6 py-6 md:px-10">
        <Link
          href={`/${locale}`}
          className="hover:opacity-75 transition-opacity"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            letterSpacing: "0.22em",
            fontWeight: 300,
            textTransform: "uppercase",
            color,
            transition: colorTransition,
          }}
        >
          Eva Gorobets
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.href} className="relative group">
                <Link
                  href={`/${locale}${item.href}`}
                  className="text-[10px] font-medium uppercase tracking-[0.2em] hover:opacity-100 transition-opacity"
                  style={{ fontFamily: "var(--font-dm-sans)", color, transition: colorTransition }}
                >
                  {item.labels[locale]}
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-30">
                  <div className="bg-white border border-black/10 py-2 min-w-[11rem]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={`/${locale}${child.href}`}
                        className="block px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-black/40 hover:text-black/90 transition-colors whitespace-nowrap"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
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
                className="text-[10px] font-medium uppercase tracking-[0.2em] hover:opacity-100 transition-opacity"
                style={{ fontFamily: "var(--font-dm-sans)", color, transition: colorTransition }}
              >
                {item.labels[locale]}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-5" style={{ color, transition: colorTransition }}>
          <div className="hidden md:block">
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <MobileMenu locale={locale} />
        </div>
      </div>
    </header>
  );
}

