import Link from "next/link";

type PageProps = { params: Promise<{ locale: string }> };

const clientSectors = [
  {
    sector: "Financial & Professional Services",
    note: "Tokyo · Melbourne · International",
    clients: [
      "KPMG",
      "EY (Ernst & Young)",
      "McKinsey & Company",
      "SAP",
      "General Electric",
      "International management consulting firms, Tokyo",
      "Private equity and legal services groups",
    ],
  },
  {
    sector: "Technology",
    note: "Melbourne · International",
    clients: [
      "Google",
      "SAP",
      "Technology accelerators and innovation hubs",
      "Enterprise software companies, APAC region",
    ],
  },
  {
    sector: "Art & Cultural Institutions",
    note: "Tokyo · Melbourne · International",
    clients: [
      "State Library Victoria",
      "Contemporary art galleries, Tokyo",
      "International gallery groups, vernissages",
      "Art Flaneur (co-founded)",
      "Independent exhibition spaces, Melbourne",
    ],
  },
  {
    sector: "NGOs, Foundations & Public Sector",
    note: "Melbourne · Tokyo",
    clients: [
      "WISE Employment",
      "Cirque du Soleil",
      "Cultural exchange organisations",
      "University and academic institutions",
    ],
  },
  {
    sector: "Hospitality, Food & Lifestyle",
    note: "Melbourne",
    clients: [
      "Sette Bello",
      "High Society",
      "Fordham\u2019s Milk Bar",
      "No.96 Cafe and Restaurant",
      "The Mill · The Palms · White Oaks",
      "WISE cookbook",
    ],
  },
];

export default async function ClientsPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <section className="section pt-32">
        <p className="label mb-6">Clients</p>
        <h1
          className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          Organizations we&rsquo;ve worked with
        </h1>
        <p className="mt-8 max-w-xl text-sm text-black/55 leading-relaxed">
          A selection of clients across corporate, cultural and media sectors —
          Tokyo, Melbourne and internationally. Full client list and references
          available on request.
        </p>
      </section>

      <section className="section border-t border-black/[0.07]">
        <div className="grid gap-y-0 md:grid-cols-2 lg:grid-cols-3">
          {clientSectors.map(({ sector, note, clients }) => (
            <div key={sector} className="border-t border-black/[0.07] py-10 pr-0 md:pr-14">
              <p
                className="text-2xl mb-1"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {sector}
              </p>
              <p className="label mb-6 mt-1">{note}</p>
              <ul>
                {clients.map((client) => (
                  <li
                    key={client}
                    className="border-t border-black/[0.07] py-3 text-sm text-black/60"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-2xl">
          <p
            className="text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] text-black/80"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}
          >
            &ldquo;Client names and specific project details are shared under NDA on request.
            References available from corporate, gallery and media clients.&rdquo;
          </p>
        </blockquote>
      </section>

      {/* Testimonials */}
      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">What clients say</p>
        <div className="grid gap-y-0 md:grid-cols-3">
          {[
            {
              quote:
                "Eva's portraits became the face of our Tokyo leadership team across our global website, annual report and all media coverage.",
              from: "Head of Communications — Global Consulting Firm, Tokyo",
            },
            {
              quote:
                "Three consecutive annual conferences. She anticipates the moments before they happen. Our PR team no longer needs to brief a photographer.",
              from: "Event Director — International Financial Institution, Tokyo",
            },
            {
              quote:
                "Her images from our opening night appeared in two national publications and our international partner's catalogue. Clean, usable, precise.",
              from: "Gallery Director — Contemporary Art Space, Tokyo",
            },
          ].map(({ quote, from }) => (
            <article key={from} className="border-t border-black/[0.07] py-10 pr-0 md:pr-12">
              <p
                className="text-lg leading-[1.35] text-black/75 mb-5"
                style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
              >
                &ldquo;{quote}&rdquo;
              </p>
              <p className="label">{from}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section border-t border-black/[0.07] py-20">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            Start a project.
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
