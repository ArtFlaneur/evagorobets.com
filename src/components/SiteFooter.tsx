import Link from "next/link";

import { Locale, navItems } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const footerLinks = [
    ...navItems.map((item) => ({ href: item.href, label: item.labels[locale], external: false })),
    { href: "/photographer-japan", label: "Japan", external: false },
    { href: "/photographer-australia", label: "Australia", external: false },
  ];

  return (
    <footer className="border-t border-black/[0.07] mt-20">
      <div className="mx-auto w-full max-w-340 px-6 py-10 md:px-10 md:py-11">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.22em", fontWeight: 300, textTransform: "uppercase" }}
            >
              Eva Gorobets
            </p>
            <p className="label mt-2">Tokyo — Melbourne — Worldwide</p>
          </div>

          <div className="md:text-right">
            <a href="mailto:eva@artflaneur.com.au" className="label hover:opacity-100 transition-opacity">
              eva@artflaneur.com.au
            </a>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-black/[0.07] pt-4 md:flex-row md:items-start md:justify-between">
          <nav className="flex max-w-3xl flex-wrap gap-x-4 gap-y-2 md:gap-x-5">
            {footerLinks.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`} className="label hover:opacity-100 transition-opacity">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:max-w-xs md:justify-end md:text-right">
            <a href="https://www.instagram.com/eva_gorobets_/" target="_blank" rel="noreferrer" className="label hover:opacity-100 transition-opacity">Instagram</a>
            <a href="https://www.linkedin.com/in/evagorobets/" target="_blank" rel="noreferrer" className="label hover:opacity-100 transition-opacity">LinkedIn</a>
            <a href="https://www.artflaneur.art/stories" target="_blank" rel="noreferrer" className="label hover:opacity-100 transition-opacity">Stories</a>
            <p className="label">© {new Date().getFullYear()} Eva Gorobets</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
