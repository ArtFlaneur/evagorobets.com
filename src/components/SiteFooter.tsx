import Link from "next/link";

import { Locale, navItems } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const mainLinks = navItems.map((item) => ({ href: item.href, label: item.labels[locale] }));

  return (
    <footer className="border-t border-black/[0.07] mt-20">
      <div className="mx-auto w-full max-w-340 px-6 md:px-10">

        {/* Zone 1 — Brand */}
        <div className="flex flex-col gap-3 py-8 md:flex-row md:items-end md:justify-between md:py-10">
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.22em", fontWeight: 300, textTransform: "uppercase" }}>
              Eva Gorobets
            </p>
            <p className="label mt-1.5 text-black/40">Tokyo — Melbourne — Worldwide</p>
          </div>
          <a href="mailto:eva@evagorobets.com" className="label text-black/55 hover:text-black transition-colors">
            eva@evagorobets.com
          </a>
        </div>

        {/* Zone 2 — Nav + social */}
        <div className="flex flex-col gap-4 border-t border-black/[0.07] py-6 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {mainLinks.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`} className="label text-black/55 hover:text-black transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-5">
            <a href="https://www.instagram.com/eva_gorobets_/" target="_blank" rel="noreferrer" className="label text-black/55 hover:text-black transition-colors">Instagram</a>
            <a href="https://www.linkedin.com/in/evagorobets/" target="_blank" rel="noreferrer" className="label text-black/55 hover:text-black transition-colors">LinkedIn</a>
            <a href="https://www.artflaneur.art/stories" target="_blank" rel="noreferrer" className="label text-black/55 hover:text-black transition-colors">Stories</a>
          </div>
        </div>

        {/* Zone 3 — Copyright + SEO links */}
        <div className="flex flex-col gap-2 border-t border-black/[0.07] py-4 md:flex-row md:items-center md:justify-between">
          <p className="label text-black/30">© {new Date().getFullYear()} Eva Gorobets</p>
          <div className="flex gap-5">
            <Link href={`/${locale}/photographer-japan`} className="label text-black/30 hover:text-black/55 transition-colors">Japan</Link>
            <Link href={`/${locale}/photographer-australia`} className="label text-black/30 hover:text-black/55 transition-colors">Australia</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
