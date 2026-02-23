import type { Metadata } from "next";
import Link from "next/link";

import { EditorialGallery } from "@/components/EditorialGallery";
import { getArtGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Art Gallery & Exhibition Photography Tokyo | Eva Gorobets",
    description:
      "Photography for galleries, museums and artists in Tokyo and Melbourne. Vernissage coverage, artwork documentation, artist portraits. Catalogue and press-ready files.",
    openGraph: {
      title: "Art Gallery & Exhibition Photography Tokyo",
      description:
        "Gallery openings, artwork documentation and artist portraits in Tokyo and Melbourne. Press and catalogue-ready delivery.",
    },
  };
}

export default async function ArtGalleriesPage({ params }: PageProps) {
  const { locale } = await params;
  const artGallery = await getArtGallery();

  return (
    <>
      <section className="section pt-32">
        <p className="label mb-6">Art & Galleries</p>
        <h1
          className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          Art & Galleries Photography in Tokyo & Melbourne
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="text-sm text-black/60 leading-relaxed">
            For galleries, museums, artists, curators and art consultants who need visual material
            for catalogues, press and online viewing. I work with the pace and protocol of the
            art world — arriving early, moving carefully, delivering files that are usable for print.
          </p>
          <p className="text-sm text-black/60 leading-relaxed">
            As co-founder of Art Flaneur Global, I have spent years embedded in the art scenes
            of Tokyo and Melbourne, which means I understand the context I am entering and
            the relationships involved. I do not need to be managed on the day.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <EditorialGallery items={artGallery} />
      </section>

      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">What I cover</p>
        <div className="grid gap-y-0 md:grid-cols-2">
          {[
            {
              title: "Exhibitions & Vernissages",
              text: "Opening night coverage: the work, the guests, the artist, the atmosphere. Delivered in a set structured for press release and social use.",
            },
            {
              title: "Artist & Curator Portraits",
              text: "Sessions in the studio, the gallery, or on location. Portraits that communicate practice and personality — not just presence.",
            },
            {
              title: "Artwork Documentation",
              text: "Color-accurate, technically clean files for paintings, drawings, sculpture and installations. Suitable for catalogues, insurance, and digital archives.",
            },
            {
              title: "Art Events & Talks",
              text: "Lectures, performances, artist talks and panel discussions. Discreet photography that records the event without disrupting it.",
            },
          ].map(({ title, text }) => (
            <article key={title} className="border-t border-black/[0.07] py-8 pr-0 md:pr-12">
              <h2
                className="text-2xl mb-3"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {title}
              </h2>
              <p className="text-sm text-black/55 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Approach statement */}
      <section className="section border-t border-black/[0.07]">
        <p className="max-w-2xl text-sm text-black/50 leading-relaxed">
          Approach: careful movement in live spaces, respect for viewers and artists,
          colour accuracy for print and screen, and deliverables that the gallery can
          use without further editing. All files are captioned and structured for easy
          integration into press materials and catalogues.
        </p>
      </section>

      {/* Testimonial */}
      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-2xl">
          <p
            className="text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] text-black/80"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}
          >
            “Eva photographed three consecutive openings for us. Her images ended up in our
            annual catalogue, in Japanese press and on our international partner’s website.”
          </p>
          <footer className="mt-5">
            <span className="label">Gallery Director, Contemporary Art Gallery — Tokyo</span>
          </footer>
        </blockquote>
      </section>

      <section className="section border-t border-black/[0.07] py-20">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            Working on an art project?
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">
            Art Project Enquiry
          </Link>
        </div>
      </section>
    </>
  );
}
