"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { Locale, navItems } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function MobileMenu({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex md:hidden flex-col justify-center items-center w-8 h-8 gap-[5px] z-50 relative"
      >
        <span className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
        <span className={`block h-px w-5 bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
      </button>

      {/* Fullscreen drawer */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-white transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link
            href={`/${locale}`}
            onClick={() => setOpen(false)}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.22em", fontWeight: 300, textTransform: "uppercase" }}
          >
            Eva Gorobets
          </Link>
          <div className="w-8 h-8" />
        </div>

        <nav className="flex-1 flex flex-col justify-center px-6 pb-16 overflow-y-auto">
          <ul className="space-y-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <div className="border-t border-black/[0.07]">
                  <Link
                    href={`/${locale}${item.href}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5 group"
                  >
                    <span
                      className="text-[clamp(1.8rem,6vw,3rem)] leading-none transition-opacity group-hover:opacity-50"
                      style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                    >
                      {item.labels[locale]}
                    </span>
                    <span className="label opacity-30">→</span>
                  </Link>
                </div>
                {item.children && (
                  <ul className="pb-4 pl-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={`/${locale}${child.href}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 py-3 group"
                        >
                          <span className="label opacity-30">—</span>
                          <span
                            className="text-xl leading-none transition-opacity group-hover:opacity-50"
                            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                          >
                            {child.labels[locale]}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="border-t border-black/[0.07]" />
          </ul>

          <div className="mt-10 flex flex-col gap-4">
            <LanguageSwitcher currentLocale={locale} />
            <a href="mailto:eva@artflaneur.com.au" className="label text-black/50 hover:text-black transition-colors">
              eva@artflaneur.com.au
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
