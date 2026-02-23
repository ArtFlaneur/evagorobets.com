import Link from "next/link";

import { EditorialGallery } from "@/components/EditorialGallery";
import { getPortfolioGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params;
  const portfolioGallery = await getPortfolioGallery();

  return (
    <>
      <section className="section pt-32">
        <p className="label mb-6">Portfolio</p>
        <h1
          className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          Selected Work
        </h1>
        <p className="mt-6 max-w-lg text-sm text-black/55 leading-relaxed">
          A curated edit spanning business portraiture, corporate events and art photography —
          Tokyo, Melbourne and international commissions.
        </p>
      </section>

      <section className="section pt-0">
        <EditorialGallery items={portfolioGallery} />
      </section>

      <section className="section border-t border-black/[0.07] py-20">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            Discuss a project.
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}


