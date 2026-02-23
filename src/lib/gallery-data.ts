export type GalleryImage = {
  src: string;
  alt: string;
  /** "portrait" = vertical 2:3, "landscape" = horizontal 3:2, "square" = 1:1 */
  aspect: "portrait" | "landscape" | "square";
};

// ── Async helpers — Cloudinary-first, static fallback ───────────────────────
// Imported lazily so static builds work without env vars set.

async function fromCloudinary(folder: string): Promise<GalleryImage[]> {
  try {
    const { getCloudinaryImages, cloudinaryConfigured } = await import("./cloudinary");
    if (!cloudinaryConfigured()) return [];
    return await getCloudinaryImages(folder);
  } catch {
    return [];
  }
}

export async function getPortraitsGallery(): Promise<GalleryImage[]> {
  const live = await fromCloudinary("eva/portraits");
  return live.length > 0 ? live : portraitsGallery;
}

export async function getCorporateGallery(): Promise<GalleryImage[]> {
  const live = await fromCloudinary("eva/corporate");
  return live.length > 0 ? live : corporateGallery;
}

export async function getArtGallery(): Promise<GalleryImage[]> {
  const live = await fromCloudinary("eva/art");
  return live.length > 0 ? live : artGallery;
}

export async function getFeaturedGallery(): Promise<GalleryImage[]> {
  try {
    const { getCloudinaryByTag, cloudinaryConfigured } = await import("./cloudinary");
    if (!cloudinaryConfigured()) return featuredGallery;
    const resources = await getCloudinaryByTag("eva_featured");
    if (resources.length === 0) return featuredGallery;
    return resources.map((r) => {
      const ratio = r.width / r.height;
      const aspect: GalleryImage["aspect"] =
        ratio < 0.85 ? "portrait" : ratio > 1.15 ? "landscape" : "square";
      return {
        src: r.secure_url,
        alt: r.context?.custom?.alt ?? "",
        aspect,
      };
    });
  } catch {
    return featuredGallery;
  }
}

export async function getPortfolioGallery(): Promise<GalleryImage[]> {
  const live = await fromCloudinary("eva/portfolio");
  return live.length > 0 ? live : portfolioGallery;
}

// ── Business Portraits ───────────────────────────────────────────────────────

export const portraitsGallery: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
    alt: "Male executive portrait, studio, Tokyo",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80",
    alt: "Professional woman headshot, neutral background",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80",
    alt: "Executive portrait in office corridor",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80",
    alt: "Close-up portrait, editorial style",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=900&q=80",
    alt: "Creative portrait, art director",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=900&q=80",
    alt: "Professional headshot, contemporary style",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=900&q=80",
    alt: "Consultant portrait, window light",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80",
    alt: "Outdoor executive portrait, urban Tokyo",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80",
    alt: "Brand portrait for media kit",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=900&q=80",
    alt: "Founder portrait, co-working space",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80",
    alt: "Creative editorial portrait",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=900&q=80",
    alt: "Team portrait session, corporate branding",
    aspect: "landscape",
  },
];

// ── Corporate Events ─────────────────────────────────────────────────────────

export const corporateGallery: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    alt: "Keynote speaker on stage, Tokyo conference",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
    alt: "Business conference hall, audience",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
    alt: "Networking event, evening reception",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80",
    alt: "Executive team meeting, board table",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=80",
    alt: "Panel discussion, industry forum",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80",
    alt: "Team workshop session, internal event",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1200&q=80",
    alt: "Product launch event, press moment",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
    alt: "Corporate team portrait at event",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?w=1200&q=80",
    alt: "Speaker preparation backstage",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    alt: "Event detail — badge and materials",
    aspect: "square",
  },
];

// ── Art & Galleries ──────────────────────────────────────────────────────────

export const artGallery: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1200&q=80",
    alt: "Gallery visitors at vernissage opening, Tokyo",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&q=80",
    alt: "Contemporary art gallery interior",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&q=80",
    alt: "Museum exhibition hall, installation view",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=1200&q=80",
    alt: "Artwork documentation — large-format painting",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=1200&q=80",
    alt: "Sculpture documentation in white gallery space",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=1200&q=80",
    alt: "Artist curator portrait in studio",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80",
    alt: "Vernissage crowd, gallery opening night Melbourne",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200&q=80",
    alt: "Artist at work — portrait in print studio",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1558618048-fbd3e5bd9cff?w=1200&q=80",
    alt: "Abstract artwork documentation detail",
    aspect: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1583425423988-dcd5f8d0f8a4?w=1200&q=80",
    alt: "Artist talk, audience at gallery event",
    aspect: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=1200&q=80",
    alt: "Curator portrait against gallery wall",
    aspect: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?w=1200&q=80",
    alt: "Performance art documentation",
    aspect: "landscape",
  },
];

// ── Home featured (cross-genre mix) ─────────────────────────────────────────

export const featuredGallery: GalleryImage[] = [
  portraitsGallery[0],
  corporateGallery[0],
  artGallery[0],
  portraitsGallery[3],
  corporateGallery[3],
  artGallery[5],
  portraitsGallery[7],
  artGallery[6],
  corporateGallery[8],
];

// ── Portfolio — curated editorial edit, all genres interleaved ───────────────
// Intentionally varied rhythm: portrait/landscape/square across all three areas.

export const portfolioGallery: GalleryImage[] = [
  portraitsGallery[0],   // portrait — exec headshot
  corporateGallery[0],   // landscape — conference stage
  artGallery[0],         // landscape — vernissage
  portraitsGallery[2],   // portrait — office corridor
  artGallery[4],         // portrait — sculpture
  corporateGallery[2],   // landscape — evening reception
  portraitsGallery[5],   // portrait — contemporary headshot
  artGallery[7],         // portrait — artist in studio
  corporateGallery[4],   // landscape — panel discussion
  portraitsGallery[1],   // portrait — professional woman
  artGallery[6],         // landscape — vernissage crowd
  corporateGallery[7],   // landscape — corporate team
  portraitsGallery[8],   // portrait — brand portrait
  artGallery[3],         // landscape — artwork documentation
  corporateGallery[9],   // square — event badge detail
  portraitsGallery[6],   // portrait — window light
  artGallery[10],        // portrait — curator portrait
  corporateGallery[5],   // landscape — workshop session
  portraitsGallery[10],  // portrait — editorial
  artGallery[9],         // landscape — artist talk
  corporateGallery[8],   // portrait — speaker backstage
  artGallery[8],         // square — abstract detail
  portraitsGallery[11],  // landscape — team portrait
  artGallery[11],        // landscape — performance
  portraitsGallery[4],   // portrait — art director
  corporateGallery[1],   // landscape — conference hall
  artGallery[2],         // landscape — museum hall
  portraitsGallery[9],   // portrait — founder
];
