import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { EditorialGallery } from "@/components/EditorialGallery";
import { getUgcGallery, getUgcPhotoSrc, getUgcReelUrls } from "@/lib/gallery-data";

const BASE_URL = "https://evagorobets.com";

const profile = {
  intro:
    "I'm Eva Gorobets — a Tokyo-based content creator and photographer with a long Melbourne background. I create short-form vertical video and photography for brands in design, culture, hospitality and thoughtful travel across Japan and Australia.",
  facts: [
    ["Based in", "Tokyo, Japan"],
    ["Also working in", "Melbourne, Australia · Worldwide"],
    ["Languages", "English · Russian"],
    ["Focus", "Design · Culture · Hospitality · Thoughtful travel"],
    ["Formats", "Vertical short-form video · Photography for social & web"],
    ["Approach", "Clear · Human · Visually precise · Platform-aware · Culturally informed"],
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/eva_gorobets_/" },
    { label: "YouTube", href: "https://www.youtube.com/@evagorobets" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/evagorobets/" },
    { label: "Facebook", href: "https://www.facebook.com/evgeniya.gorobets" },
  ],
} as const;

const services = [
  {
    title: "Short-form video",
    text: "Platform-ready vertical films for Instagram, TikTok, YouTube Shorts and paid social — from concept and shot list to edit and delivery.",
  },
  {
    title: "Photography for social & web",
    text: "Still images with enough compositional clarity for a feed, a launch page, a press kit or an editorial placement.",
  },
  {
    title: "Creator-led campaigns",
    text: "A focused content package for launches, stays, openings and collaborations, with a coherent visual direction across formats.",
  },
  {
    title: "Tokyo & Melbourne production",
    text: "Local production for international teams: location-sensitive, visually precise and straightforward to commission from abroad.",
  },
] as const;

const shootTypes = [
  "Unboxings",
  "Testimonials / Reviews",
  "Hauls",
  "How-to’s / Tutorials",
  "Product lifestyle integration",
  "Product shots",
] as const;

function getYouTubeId(url: string): string | null {
  try {
    const parsedUrl = new URL(url.trim());
    const parts = parsedUrl.pathname.split("/").filter(Boolean);

    if (parsedUrl.hostname === "youtu.be") return parts[0] ?? null;

    // /shorts/<id>, /embed/<id>, /v/<id>
    const keyed = parts.findIndex((p) => p === "shorts" || p === "embed" || p === "v");
    if (keyed >= 0 && parts[keyed + 1]) return parts[keyed + 1];

    // /watch?v=<id>
    return parsedUrl.searchParams.get("v");
  } catch {
    return null;
  }
}

function parseReels(urls: string[]): string[] {
  return urls
    .map((entry) => getYouTubeId(entry))
    .filter((id): id is string => Boolean(id));
}

export const metadata: Metadata = {
  title: "UGC Content Creator Tokyo & Melbourne — Eva Gorobets | Short-Form Video & Photography",
  description:
    "Eva Gorobets is a UGC content creator and photographer based in Tokyo, working in Melbourne and worldwide. Vertical short-form video and photography for hospitality, design, culture and travel brands in Japan and Australia. Clear, human, platform-aware, culturally informed.",
  keywords: [
    "UGC creator Tokyo",
    "content creator Tokyo",
    "Tokyo content creator",
    "Japan hospitality content creator",
    "UGC creator Japan",
    "short form video creator Tokyo",
    "vertical video creator Japan",
    "social media photographer Tokyo",
    "Melbourne product photographer",
    "Melbourne content creator",
    "UGC creator Melbourne",
    "Japan travel content creator",
    "hospitality videographer Tokyo",
    "brand content creator Japan",
  ],
  alternates: { canonical: `${BASE_URL}/ugc` },
  openGraph: {
    title: "UGC Content Creator Tokyo & Melbourne — Eva Gorobets",
    description:
      "Vertical short-form video and photography for hospitality, design, culture and travel brands in Tokyo, Japan and Melbourne, Australia.",
    url: `${BASE_URL}/ugc`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UGC Content Creator Tokyo & Melbourne — Eva Gorobets",
    description:
      "Vertical short-form video and photography for hospitality, design, culture and travel brands in Tokyo and Melbourne.",
  },
  other: {
    "geo.region": "JP-13",
    "geo.placename": "Tokyo",
    "geo.position": "35.6762;139.6503",
    ICBM: "35.6762, 139.6503",
  },
};

export default async function UgcPage() {
  const reelUrls = await getUgcReelUrls();
  const reelIds = parseReels(reelUrls);
  const photoSrc = await getUgcPhotoSrc();
  const gallery = await getUgcGallery();

  return (
    <>
      <SiteHeader locale="en" />
      <main>
        <section className="section pt-32 md:pt-40">
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] text-balance" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
            <span className="sr-only">UGC Content Creator in Tokyo &amp; Melbourne — </span>Creator-Led Content
          </h1>

          <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
            <div>
              {photoSrc ? (
                <div className="relative aspect-4/5 w-full max-w-sm overflow-hidden bg-black/4">
                  <Image
                    src={photoSrc}
                    alt="Eva Gorobets — UGC content creator and photographer, Tokyo & Melbourne"
                    fill
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="mt-5 flex max-w-sm flex-wrap gap-x-5 gap-y-2">
                {profile.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label text-black/55 hover:text-black transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="max-w-md text-lg leading-relaxed text-black/70" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                {profile.intro}
              </p>
              <ul className="mt-8">
              {profile.facts.map(([label, value]) => (
                <li key={label} className="flex gap-8 border-t border-black/[0.07] py-4 text-sm">
                  <span className="label w-36 shrink-0">{label}</span>
                  <span className="text-black/70">{value}</span>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section border-t border-black/[0.07]">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label mb-4">Selected reels</p>
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.92]" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                See the work.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-black/55">
              A selection of vertical short-form videos, playable in place. Sound on for the full effect.
            </p>
          </div>

          {reelIds.length > 0 ? (
            <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {reelIds.map((id) => (
                <div key={id} className="relative aspect-9/16 overflow-hidden bg-black">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${id}?playsinline=1&modestbranding=1&rel=0`}
                    title="Eva Gorobets — creator-led content reel"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-9/16 overflow-hidden bg-black">
                  <div className="flex h-full flex-col justify-between p-5 text-white">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "var(--font-dm-sans)" }}>Reel {String(i + 1).padStart(2, "0")}</p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-sm">▶</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="section border-t border-black/[0.07]">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label mb-4">Photography</p>
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.92]" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>Selected images.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-black/55">
              Content and product photography for social, web and campaigns — shot in Tokyo, Melbourne and on location.
            </p>
          </div>
          <div className="mt-12">
            <EditorialGallery items={gallery} />
          </div>
        </section>

        <section className="section border-t border-black/[0.07]">
          <p className="label mb-10">Services</p>
          <div className="grid gap-x-12 md:grid-cols-2">
            {services.map(({ title, text }) => (
              <article key={title} className="border-t border-black/[0.07] py-8">
                <h2 className="text-3xl leading-none" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>{title}</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-black/55">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start">
            <p className="label md:pt-1">Shoot types</p>
            <ul className="grid gap-x-12 sm:grid-cols-2">
              {shootTypes.map((type) => (
                <li key={type} className="flex items-baseline gap-3 border-t border-black/[0.07] py-4 text-sm text-black/70">
                  <span className="text-black/30">—</span>
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section border-t border-black/[0.07] py-8!">
          <div className="flex flex-col items-start gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label mb-3">Photography</p>
              <Link href="/en/portfolio" className="text-2xl leading-tight underline decoration-black/25 underline-offset-6 transition-colors hover:decoration-black" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                For editorial and commercial photography, view selected work →
              </Link>
            </div>
            <a href="mailto:eva@evagorobets.com?subject=Creator-led%20content%20enquiry" className="btn">Request a content brief</a>
          </div>
        </section>
      </main>
      <SiteFooter locale="en" />

      <Script id="ugc-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfilePage",
              "@id": `${BASE_URL}/ugc#profilepage`,
              url: `${BASE_URL}/ugc`,
              name: "UGC Content Creator Tokyo & Melbourne — Eva Gorobets",
              inLanguage: "en",
              about: { "@id": `${BASE_URL}/ugc#person` },
              isPartOf: { "@id": `${BASE_URL}/#website` },
            },
            {
              "@type": "Person",
              "@id": `${BASE_URL}/ugc#person`,
              name: "Eva Gorobets",
              ...(photoSrc ? { image: photoSrc } : {}),
              jobTitle: "UGC Content Creator & Photographer",
              description:
                "UGC content creator and photographer based in Tokyo, working in Melbourne and worldwide. Vertical short-form video and photography for hospitality, design, culture and travel brands.",
              knowsLanguage: ["English", "Russian"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tokyo",
                addressCountry: "JP",
              },
              worksFor: { "@id": `${BASE_URL}/#business` },
              sameAs: profile.socials.map((s) => s.href),
            },
            {
              "@type": "Service",
              "@id": `${BASE_URL}/ugc#service`,
              name: "UGC Content Creation — Short-Form Video & Photography",
              description:
                "Creator-led vertical short-form video and photography for hospitality, design, culture and travel brands in Tokyo, Japan and Melbourne, Australia.",
              url: `${BASE_URL}/ugc`,
              serviceType: [
                "UGC content creation",
                "Short-form video production",
                "Social media photography",
                "Product photography",
                "Hospitality content",
              ],
              provider: { "@id": `${BASE_URL}/ugc#person` },
              areaServed: [
                { "@type": "City", name: "Tokyo" },
                { "@type": "City", name: "Melbourne" },
                { "@type": "Country", name: "Japan" },
                { "@type": "Country", name: "Australia" },
              ],
              availableLanguage: ["English", "Russian"],
            },
            {
              "@type": "FAQPage",
              "@id": `${BASE_URL}/ugc#faq`,
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is a UGC content creator?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A UGC (user-generated-content) creator produces native short-form video and photography that brands use on social media and paid ads. Eva Gorobets creates this content for hospitality, design, culture and travel brands in Tokyo and Melbourne.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you create UGC content in Tokyo and Melbourne?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Eva is based in Tokyo, Japan and works in Melbourne, Australia and internationally, with local production for hospitality, product and travel brands.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What kind of content do you produce?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Vertical short-form video for Instagram, TikTok and YouTube Shorts, plus photography for social and web — from concept and scripting to filming and edit.",
                  },
                },
              ],
            },
          ],
        })}
      </Script>
    </>
  );
}