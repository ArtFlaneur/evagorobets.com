import Image from "next/image";
import Link from "next/link";

import { blogPosts } from "@/lib/blog-data";

type PageProps = { params: Promise<{ locale: string }> };

const ui = {
  en: {
    eyebrow: "Journal",
    h1: ["Notes on photography,", "portraiture and the art world"],
    read: "Read",
    readArrow: "Read →",
    minRead: "min read",
    categories: { guide: "Guide", portrait: "Portraits", corporate: "Corporate", art: "Art & Galleries" },
  },
  jp: {
    eyebrow: "ジャーナル",
    h1: ["写真、ポートレート、", "アートワールドについての記録"],
    read: "読む",
    readArrow: "読む →",
    minRead: "分で読める",
    categories: { guide: "ガイド", portrait: "ポートレート", corporate: "コーポレート", art: "アート＆ギャラリー" },
  },
  ru: {
    eyebrow: "Журнал",
    h1: ["Заметки о фотографии,", "портрете и мире искусства"],
    read: "Читать",
    readArrow: "Читать →",
    minRead: "мин чтения",
    categories: { guide: "Гид", portrait: "Портреты", corporate: "Корпоративное", art: "Арт и галереи" },
  },
} as const;

type Locale = keyof typeof ui;

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const t = ui[(locale as Locale) in ui ? (locale as Locale) : "en"];
  const cat = t.categories;

  return (
    <>
      <section className="section pt-20 md:pt-32">
        <p className="label mb-6">{t.eyebrow}</p>
        <h1
          className="max-w-2xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          {t.h1[0]}<br />{t.h1[1]}
        </h1>
      </section>

      <section className="section pt-0 border-t border-black/[0.07]">
        {/* Featured first post */}
        <Link
          href={`/${locale}/blog/${blogPosts[0].slug}`}
          className="group block mb-16"
        >
          <div className="relative w-full aspect-16/7 overflow-hidden bg-[#f4f2ef]">
            <Image
              src={blogPosts[0].coverSrc}
              alt={blogPosts[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
          </div>
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <p className="label mb-3">
                {cat[blogPosts[0].category as keyof typeof cat]} &nbsp;·&nbsp; {blogPosts[0].date.slice(0, 7)} &nbsp;·&nbsp; {blogPosts[0].readTime} {t.minRead}
              </p>
              <h2
                className="text-[clamp(2rem,4vw,3.5rem)] leading-none"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {blogPosts[0].title}
              </h2>
              <p className="mt-4 text-sm text-black/55 leading-relaxed max-w-lg">
                {blogPosts[0].excerpt}
              </p>
            </div>
            <span className="btn-ghost shrink-0 self-end">{t.read}</span>
          </div>
        </Link>

        {/* Grid for remaining posts */}
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 border-t border-black/[0.07] pt-14">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group flex flex-col gap-4"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#f4f2ef]">
                <Image
                  src={post.coverSrc}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div>
                <p className="label mb-2">
                  {cat[post.category as keyof typeof cat]} &nbsp;·&nbsp; {post.date.slice(0, 7)}
                </p>
                <h3
                  className="text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.05]"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-black/50 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <span className="btn-ghost mt-auto">{t.readArrow}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
