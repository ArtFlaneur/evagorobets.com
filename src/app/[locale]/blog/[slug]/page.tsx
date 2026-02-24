import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import { blogPosts } from "@/lib/blog-data";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const BASE_URL = "https://evagorobets.com";

const categoryLabel: Record<string, string> = {
  guide: "Guide",
  portrait: "Portraits",
  corporate: "Corporate",
  art: "Art & Galleries",
};

export async function generateStaticParams() {
  const locales = ["en", "jp", "ru"];
  return locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Journal — Eva Gorobets",
    };
  }

  const path = `/blog/${post.slug}`;

  return {
    title: `${post.title} — Eva Gorobets Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverSrc }],
      type: "article",
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

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const artFlaneurUrl = "https://www.artflaneur.art";

  function linkifyArtFlaneur(text: string) {
    const parts = text.split(/(Art Flaneur Global|Art Flaneur)/g);
    return parts.map((part, index) => {
      if (part === "Art Flaneur Global" || part === "Art Flaneur") {
        return (
          <a
            key={`${part}-${index}`}
            href={artFlaneurUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  }

  const publishedTime = `${post.date}T00:00:00.000Z`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverSrc],
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      "@type": "Person",
      name: "Eva Gorobets",
    },
    publisher: {
      "@type": "Organization",
      name: "Eva Gorobets Photography",
      url: BASE_URL,
    },
    mainEntityOfPage: `${BASE_URL}/${locale}/blog/${post.slug}`,
    inLanguage: locale === "jp" ? "ja" : locale,
  };

  return (
    <>
      <Script id={`article-schema-${post.slug}`} type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </Script>
      {/* Hero */}
      <section className="relative w-full aspect-16/7 bg-[#1a1916] overflow-hidden">
        <Image
          src={post.coverSrc}
          alt={post.title}
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <p className="label text-white/60 mb-4">
            {categoryLabel[post.category]} &nbsp;·&nbsp; {post.date.slice(0, 7)} &nbsp;·&nbsp; {post.readTime} min read
          </p>
          <h1
            className="max-w-3xl text-white text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="section section-narrow pt-16">
        <p
          className="text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.4] text-black/60 mb-10"
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
        >
          {post.excerpt}
        </p>
        <div className="space-y-6">
          {post.body.map((para, i) => (
            <p key={i} className="text-sm text-black/70 leading-[1.8]">
              {linkifyArtFlaneur(para)}
            </p>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="section section-narrow border-t border-black/[0.07] py-16">
        <p
          className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] mb-8"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          Interested in working together?
        </p>
        <Link href={`/${locale}/contact-booking`} className="btn">
          Enquire
        </Link>
      </section>

      {/* More posts */}
      {others.length > 0 && (
        <section className="section border-t border-black/[0.07]">
          <p className="label mb-10">More from the journal</p>
          <div className="grid gap-8 md:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/${locale}/blog/${other.slug}`}
                className="group flex flex-col gap-3"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-[#f4f2ef]">
                  <Image
                    src={other.coverSrc}
                    alt={other.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="label mt-1">{other.date.slice(0, 7)}</p>
                <h3
                  className="text-xl leading-[1.1]"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {other.title}
                </h3>
                <span className="btn-ghost mt-auto">Read &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
