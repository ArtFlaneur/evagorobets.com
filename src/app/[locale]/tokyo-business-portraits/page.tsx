import type { Metadata } from "next";
import Link from "next/link";

import { CurrencyOptions } from "@/components/CurrencyOptions";
import { EditorialGallery } from "@/components/EditorialGallery";
import { getPortraitsGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Executive Headshots & Business Portraits Tokyo | Eva Gorobets",
    description:
      "Professional executive headshots and leadership portraits in Tokyo. Studio and on-location. Used for company websites, LinkedIn, annual reports and press. Trilingual briefing.",
    openGraph: {
      title: "Executive Headshots & Business Portraits Tokyo",
      description:
        "Studio and on-location portrait sessions for executives, founders and leadership teams in Tokyo. Fast delivery, trilingual communication.",
    },
  };
}

export default async function BusinessPortraitsPage({ params }: PageProps) {
  const { locale } = await params;
  const portraitsGallery = await getPortraitsGallery();

  return (
    <>
      <section className="section pt-32">
        <p className="label mb-6">Business Portraits</p>
        <h1
          className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          Tokyo Business Portraits & Executive Headshots
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="text-sm text-black/60 leading-relaxed">
            Professional portraits for executives, founders, consultants, artists and art managers
            who need a premium, credible visual identity. Sessions are designed around brand
            positioning, communication goals and practical usage across websites, media kits
            and speaking profiles.
          </p>
          <p className="text-sm text-black/60 leading-relaxed">
            Based in Tokyo and available in Melbourne and internationally. Briefing and communication
            available in English, Japanese and Russian. Final retouched images delivered within
            three to five business days.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <EditorialGallery items={portraitsGallery} />
      </section>

      <section className="section grid gap-16 border-t border-black/[0.07] md:grid-cols-2">
        <div>
          <p className="label mb-8">Session Types</p>
          <ul>
            {[
              {
                title: "Studio",
                text: "Controlled environment with seamless or textured backdrop. Clean, timeless results suitable for any editorial use.",
              },
              {
                title: "On-location",
                text: "Office, co-working space, hotel or urban environment. The background reinforces the context of your work.",
              },
              {
                title: "Creative Editorial",
                text: "Art-directed portraits for artists, curators and creative professionals. More latitude, more character.",
              },
            ].map(({ title, text }) => (
              <li key={title} className="border-t border-black/[0.07] py-6">
                <span
                  className="block text-2xl mb-2"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {title}
                </span>
                <span className="text-sm text-black/55 leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-8">Process</p>
          <ol>
            {[
              ["1", "Brief", "We discuss your goals, intended use and visual direction — in EN, JP or RU."],
              ["2", "Moodboard", "I share two or three reference images as a starting point before we meet."],
              ["3", "Session", "60–90 minutes. Guided, relaxed, efficient. You do not need to know how to pose."],
              ["4", "Selection", "You receive a proof gallery and choose your favourite frames."],
              ["5", "Delivery", "Retouched web and print-ready files. Delivered within 3–5 business days."],
            ].map(([n, step, detail]) => (
              <li key={step} className="flex gap-6 border-t border-black/[0.07] py-5">
                <span className="label w-4 pt-1">{n}</span>
                <div>
                  <span
                    className="block text-xl mb-1"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                  >
                    {step}
                  </span>
                  <span className="text-xs text-black/50 leading-relaxed">{detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-2xl">
          <p
            className="text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] text-black/80"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}
          >
            “The portraits Eva made for our Tokyo leadership team were used on the company website,
            in our annual report and across all press materials. The process was completely smooth.”
          </p>
          <footer className="mt-5">
            <span className="label">Head of Communications, Global Consulting Firm — Tokyo</span>
          </footer>
        </blockquote>
      </section>

      <section className="section border-t border-black/[0.07]">
        <CurrencyOptions />
      </section>

      <section className="section border-t border-black/[0.07] py-20">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            Let’s create your portrait.
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">
            Enquire for a Business Portrait
          </Link>
        </div>
      </section>
    </>
  );
}
