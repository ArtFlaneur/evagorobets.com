export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "portrait" | "corporate" | "art" | "guide";
  coverSrc: string;
  readTime: number; // minutes
  body: string[]; // paragraphs
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-prepare-for-an-executive-headshot",
    title: "How to Prepare for an Executive Headshot in Tokyo",
    excerpt:
      "A practical guide for executives and founders — what to wear, how to move, and what to expect from a session in Tokyo.",
    date: "2026-01-15",
    category: "guide",
    coverSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80",
    readTime: 5,
    body: [
      "An executive headshot is not simply a photograph — it is a professional signal. It appears on your company website, LinkedIn profile, speaker bios, press kits and media coverage. A strong portrait communicates authority, approachability and credibility in one frame.",
      "The most common question I hear from executives before a session: what should I wear? The answer depends on your industry and the intended use. For financial and legal professionals, a well-fitted suit in a mid-tone — navy, charcoal, deep grey — is always reliable. For founders, consultants and creatives, slightly more latitude is appropriate: a structured blazer over a plain shirt, or a minimal roll-neck, both photograph well and avoid the dated formality of a full corporate look.",
      "Avoid busy patterns, large logos, and anything that would date the photograph fast. The goal is a portrait that works for three to five years without looking like it belongs to a specific period. Solid tones photograph cleanly, and dark to mid-tones tend to be more versatile than very light colours depending on the backdrop.",
      "On the day of the session, I recommend arriving a few minutes early — not to rush, but to settle. We run through a brief together in advance (by email, in English, Japanese, or Russian), and I share two or three reference images as a direction before we start. The actual shooting is relaxed. I guide posture and positioning throughout, and we work through two or three different setups within the session.",
      "The entire process — briefing, shooting, delivery — is structured to minimise your time and maximise the quality of the result. Most executive sessions take sixty to ninety minutes. Final retouched images are delivered within three to five business days.",
    ],
  },
  {
    slug: "documenting-vernissage-guide",
    title: "Documenting a Vernissage: What Photography Can and Cannot Do",
    excerpt:
      "Opening nights are chaotic, joyful, and fast. Here is how I approach gallery photography to capture both the art and the room.",
    date: "2026-01-28",
    category: "art",
    coverSrc:
      "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1200&q=80",
    readTime: 6,
    body: [
      "An opening night is one of the most complex events to photograph — and one of the most rewarding. You have the art on the walls (or floor, or suspended from the ceiling), a room filling with people who are there to see it, and a whole set of human interactions that happen only in that specific context: the artist explaining a piece to a collector, a curator talking to a museum director, two strangers in front of a painting they keep returning to.",
      "My approach to vernissage documentation starts with the space, before the room fills. I arrive an hour before opening to photograph the works in isolation — clean, well-lit, without people in the frame. These images are essential for press, catalogues and the gallery's long-term archive. I do not hurry this part, because it is often the most technically demanding: managing reflections on glass, even lighting on textured surfaces, clean edges on sculptural work.",
      "When guests arrive, I move through the room as unobtrusively as possible. I am not using flash at vernissages unless the space makes it unavoidable — available light, often a mix of warm gallery spots and ambient evening light, creates a more faithful record of the atmosphere. I watch for natural groupings, genuine moments, the unguarded second after someone finishes speaking.",
      "The deliverables from an opening typically cover three categories: artwork documentation (clean, usable for print and online); portraits of key people — the artist, curator, collector, director — in context; and atmospheric images of the full room and the event as a whole. These are separated in the delivery gallery and captioned where relevant for press use.",
    ],
  },
  {
    slug: "corporate-event-photography-checklist",
    title: "Corporate Event Photography in Tokyo: A Pre-Production Checklist",
    excerpt:
      "What I ask clients before every event shoot — and why preparation is what separates usable coverage from great coverage.",
    date: "2026-02-04",
    category: "corporate",
    coverSrc:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    readTime: 4,
    body: [
      "Good corporate event photography starts well before the session. The difference between coverage that is technically fine but never quite works, and a set of images the client uses for three years across all channels, usually comes down to preparation: a pre-shoot call, a shared timeline, a shot list, and a clear brief on intended use.",
      "Before any event I shoot, I send a short questionnaire covering: the run-of-show (session order, key moments), a shot list of the five to ten people who must have a portrait, the specific deliverables needed (PR selection, internal gallery, social pack), any access or protocol considerations, and the deadline for delivery.",
      "For international clients working in Tokyo, protocol considerations matter more than many assume. Japanese corporate environments often have specific rules around photography in boardrooms, around senior executives, or during certain parts of internal events. I navigate these with discretion — and where needed, I ask the organiser in advance rather than on the day.",
      "The output from a well-prepared event shoot is clean, usable, and covers the full arc of the session. Not just a stage shot and a room-wide establishing frame — but the room before anyone arrives, the speaker arriving at the podium, the two minutes of conversation in the corridor that shaped the deal, and the working dinner afterwards.",
    ],
  },
  {
    slug: "artist-portrait-in-the-studio",
    title: "Artist Portraits: Why the Studio Matters More Than the Lighting",
    excerpt:
      "On making portraits in artists' workspaces — the tools, the evidence, and the friction that makes a real portrait.",
    date: "2026-02-12",
    category: "portrait",
    coverSrc:
      "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=1200&q=80",
    readTime: 5,
    body: [
      "The most revealing portraits I make are in working studios. Not in clean white rooms with controlled strobes and a seamless backdrop — but in the actual space where work happens. Where paint is on the floor. Where canvases lean against every available wall. Where the subject is surrounded by evidence of what they do.",
      "There is a particular kind of resistance that appears in artists when a camera arrives in their space. It is not shyness exactly, but a kind of wariness about being reduced to a subject. Working in the studio helps dissolve this, because the environment itself is full of things to talk about, to look at, to engage with. A portrait made in a real working space is usually more honest than one made anywhere else.",
      "Technically, studios present challenges: mixed light sources, chaotic backgrounds, tight corners. My practice is to work with what is there — moving around the space to find the best positions, using window light whenever possible, and simplifying the background enough that the person reads clearly without removing everything that makes the space what it is.",
      "For galleries and museums commissioning artist portraits for catalogues or exhibitions, these images serve a double purpose: they record the person, and they document practice at a moment in time. A portrait made in the studio in 2026 will read differently in ten years than it does today. That is not a problem to manage — it is the whole point.",
    ],
  },
  {
    slug: "art-flaneur-tokyo-art-scene",
    title: "Observations: Tokyo's Art Scene and Why It Is Different",
    excerpt:
      "What I have noticed in three years of working in Japanese galleries, and how it's changed my approach to art documentation.",
    date: "2026-02-18",
    category: "art",
    coverSrc:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&q=80",
    readTime: 7,
    body: [
      "Tokyo has one of the most active contemporary art ecosystems I have encountered, and one of the least visible internationally. There are more galleries per square kilometre in Roppongi alone than in most European art districts, but many operate with a discretion that makes them essentially invisible to newcomers. They are not on Google Maps. The address is a floor number in a building with no signage. You find them because a gallerist mentions them, or a collector sends you.",
      "Working in this environment as a photographer requires a different kind of presence than in Melbourne or London. Japanese gallery culture values restraint — in the presence of visitors, in the volume of conversation, in the act of looking itself. Arriving with a camera is a visible intrusion into a quiet space. The work I do in Tokyo galleries is deliberately slower, more considered, and more physically contained than event photography anywhere else I work.",
      "The relationship between artists, galleries and collectors here is also different. There is often a long-term continuity — the same gallerist representing an artist for a decade, the same collectors attending every opening. The photography I make becomes part of a continuous archive of that relationship over time, which changes the purpose of any single image.",
      "From the perspective of Art Flaneur Global — which connects art conversations between Australia and Japan — what interests me most is the difference in how art is discussed publicly. In Sydney or Melbourne, contemporary art operates in a media ecosystem that prizes accessibility and explanation. In Tokyo, the expectation is that the work speaks for itself, and that the audience brings the capacity to receive it. This is not better or worse. It is just a different set of assumptions about what a gallery is for, and who it is for.",
    ],
  },
];
