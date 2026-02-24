import Link from "next/link";

import { Locale, navItems } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-black/[0.07] mt-20">
      <div className="mx-auto w-full max-w-340 px-6 py-12 md:px-10">
        <div className="grid gap-7 md:grid-cols-2 md:items-end">
          <div>
            <p
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.22em", fontWeight: 300, textTransform: "uppercase" }}
            >
              Eva Gorobets
            </p>
            <p className="label mt-2">Tokyo — Melbourne — Worldwide</p>
          </div>

          <div className="md:justify-self-end md:text-right">
            <a href="mailto:eva@artflaneur.com.au" className="label hover:opacity-100 transition-opacity">
              eva@artflaneur.com.au
            </a>
          </div>
        </div>

        <div className="mt-7 border-t border-black/[0.07] pt-5 flex justify-end">
          <nav className="flex w-fit flex-wrap justify-end gap-x-5 gap-y-1 text-right">
            {navItems.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`} className="label hover:opacity-100 transition-opacity">
                {item.labels[locale]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-7 border-t border-black/[0.07] pt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="label">ABN: listed on invoices · GST if applicable</p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/evagorobets/" target="_blank" rel="noreferrer" className="label hover:opacity-100 transition-opacity">Instagram</a>
            <a href="https://www.linkedin.com/in/evgorobets/" target="_blank" rel="noreferrer" className="label hover:opacity-100 transition-opacity">LinkedIn</a>
            <p className="label">© {new Date().getFullYear()} Eva Gorobets</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
