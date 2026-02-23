import Image from "next/image";
import Link from "next/link";

type PageProps = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      {/* Hero portrait */}
      <section className="relative w-full aspect-16/7 bg-[#1a1916] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1600&q=80"
          alt="Eva Gorobets — photographer"
          fill
          priority
          className="object-cover object-top opacity-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <p className="label text-white/55 mb-4">Photographer</p>
          <h1
            className="text-white text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.93]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            Eva Gorobets
          </h1>
        </div>
      </section>

      {/* Bio + info */}
      <section className="section grid gap-16 border-t border-black/[0.07] md:grid-cols-2">
        <div className="text-sm text-black/65 leading-relaxed space-y-5 max-w-md">
          <p>
            Eva Gorobets is a portrait and corporate photographer with over 15 years
            of international experience, based in Tokyo with a deep Melbourne background.
            Her practice spans executive portraiture, corporate event coverage and
            art-world photography across Japan, Australia and internationally.
          </p>
          <p>
            She holds a Master&rsquo;s degree in Visual Culture and is a PhD candidate
            in Fine and Applied Arts — an academic background that shapes a distinctive
            approach: image-led, concept-aware, and structurally precise.
          </p>
          <p>
            She works with multinational corporations, executives, independent professionals,
            galleries and artists. Her clients include KPMG, Google, McKinsey, SAP,
            General Electric and EY — alongside cultural institutions such as State Library
            Victoria and independent art spaces in Tokyo and Melbourne.
          </p>
          <p>
            Co-founder of Art Flaneur, a platform connecting art discourse between Australia
            and the international contemporary art community. Communication in English,
            Japanese and Russian.
          </p>
        </div>
        <div>
          <ul>
            {[
              ["Experience", "15+ years (since 2008)"],
              ["Education", "MA Visual Culture · PhD candidate, Fine & Applied Arts"],
              ["Languages", "English · Japanese · Russian"],
              ["Based in", "Tokyo, Japan"],
              ["Also working in", "Melbourne, Australia · Worldwide"],
              ["Co-founder", "Art Flaneur"],
            ].map(([label, value]) => (
              <li key={label} className="flex gap-8 border-t border-black/[0.07] py-4 text-sm">
                <span className="label w-36 shrink-0">{label}</span>
                <span className="text-black/70">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clients link */}
      <section className="section border-t border-black/[0.07]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-3">Clients</p>
            <p className="text-sm text-black/55 max-w-sm leading-relaxed">
              Corporate, gallery, media and public-sector clients across Tokyo,
              Melbourne and internationally.
            </p>
          </div>
          <Link href={`/${locale}/clients`} className="btn-ghost shrink-0">
            View client list &rarr;
          </Link>
        </div>
      </section>

      {/* Press / features */}
      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">Press &amp; Features</p>
        <p className="text-sm text-black/40 max-w-sm">
          Press clippings, publication credits and media appearances available on request.
        </p>
      </section>

      {/* Contact CTA */}
      <section className="section border-t border-black/[0.07] py-20">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            Let&rsquo;s work together.
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}

