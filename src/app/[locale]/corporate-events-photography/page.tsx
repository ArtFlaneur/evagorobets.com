import type { Metadata } from "next";
import Link from "next/link";

import { EditorialGallery } from "@/components/EditorialGallery";
import { getCorporateGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

const BASE_URL = "https://evagorobets.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/corporate-events-photography";

  return {
    title: "Corporate Event Photographer Tokyo — Conferences, Forums & Internal Events | Eva Gorobets",
    description:
      "Structured corporate event photography in Tokyo. Conferences, AGMs, product launches, client receptions. PR and social media delivery sets. Available across Japan.",
    openGraph: {
      title: "Corporate Event Photographer Tokyo",
      description:
        "Coverage for corporate conferences, forums and internal events in Tokyo. Structured process, fast delivery, trilingual communication.",
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: {
        en: `${BASE_URL}/en${path}`,
        ja: `${BASE_URL}/jp${path}`,
        ru: `${BASE_URL}/ru${path}`,
      },
    },
  };
}

export default async function CorporateEventsPage({ params }: PageProps) {
  const { locale } = await params;
  const corporateGallery = await getCorporateGallery();

  return (
    <>
      <section className="section pt-32">
        <p className="label mb-6">Corporate Events</p>
        <h1
          className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          Corporate Events Photography in Tokyo
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="text-sm text-black/60 leading-relaxed">
            Structured, discreet coverage for conferences, internal events, client activations,
            board meetings and product launches. I work from a pre-agreed timeline and shot
            list so you receive everything you need — without directing on the day.
          </p>
          <p className="text-sm text-black/60 leading-relaxed">
            Coverage delivered in separate sets for internal use, PR and social media.
            Fast turnaround as standard. Available for single-day and multi-day events in
            Tokyo and across Japan.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <EditorialGallery items={corporateGallery} />
      </section>

      <section className="section grid gap-16 border-t border-black/[0.07] md:grid-cols-3">
        {[
          {
            title: "Event Types",
            items: [
              "Conferences & forums",
              "Internal team events",
              "Client activations",
              "Board meetings",
              "Product launches",
              "Annual general meetings",
            ],
          },
          {
            title: "Process",
            items: [
              "Pre-event briefing call",
              "Timeline and shot list",
              "On-site discreet coverage",
              "Same-day highlight option",
              "Post-event gallery delivery",
            ],
          },
          {
            title: "Delivery Sets",
            items: [
              "Internal online gallery",
              "Curated PR selection",
              "Social-media pack (cropped)",
              "High-resolution print files",
              "Captioned press set on request",
            ],
          },
        ].map(({ title, items }) => (
          <div key={title}>
            <p className="label mb-8">{title}</p>
            <ul>
              {items.map((item) => (
                <li key={item} className="border-t border-black/[0.07] py-4 text-sm text-black/65">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Testimonial */}
      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-2xl">
          <p
            className="text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] text-black/80"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}
          >
            “We have worked with Eva for three consecutive annual conferences.
            She anticipates the moments we need before we do.”
          </p>
          <footer className="mt-5">
            <span className="label">Event Director, International Financial Institution — Tokyo</span>
          </footer>
        </blockquote>
      </section>

      <section className="section border-t border-black/[0.07] !py-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            Planning an event?
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">
            Enquire about Event Coverage
          </Link>
        </div>
      </section>
    </>
  );
}
