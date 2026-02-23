import Link from "next/link";

import { Locale, navItems } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-black/[0.07] mt-24">
      <div className="mx-auto flex w-full max-w-340 flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.22em", fontWeight: 300, textTransform: "uppercase" }}
          >
            Eva Gorobets
          </p>
          <p className="label mt-2">Tokyo — Melbourne — Worldwide</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={`/${locale}${item.href}`} className="label hover:opacity-100 transition-opacity">
              {item.labels[locale]}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-1">
          <a href="mailto:eva@artflaneur.com.au" className="label hover:opacity-100 transition-opacity">
            eva@artflaneur.com.au
          </a>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/evagorobets/" target="_blank" rel="noreferrer" className="label hover:opacity-100 transition-opacity">Instagram</a>
            <a href="https://www.linkedin.com/in/evgorobets/" target="_blank" rel="noreferrer" className="label hover:opacity-100 transition-opacity">LinkedIn</a>
          </div>
          <p className="label mt-2">© {new Date().getFullYear()} Eva Gorobets</p>
        </div>
      </div>
    </footer>
  );
}
