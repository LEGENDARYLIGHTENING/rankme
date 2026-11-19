export function fitSeoTitle(rawTitle, maxLen = 60) {
  let t = String(rawTitle || '').replace(/\s+/g, ' ').trim();
  if (t.length <= maxLen) return t;
  // Remove trailing " | Rankur" if present and too long
  const withoutBrand = t.replace(/\s*\|\s*Rankur\s*$/i, '').trim();
  if (withoutBrand.length <= maxLen) return withoutBrand;
  // Trim cleanly at word boundary without adding ellipsis or cutting a word
  const slice = withoutBrand.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(' ');
  const candidate = lastSpace > Math.floor(maxLen * 0.55) ? slice.slice(0, lastSpace) : slice;
  return candidate.replace(/[\s:\-,;|/]+$/, '').trim();
}

export function fitSeoDescription(rawDesc, maxLen = 155) {
  const d = String(rawDesc || '').replace(/\.{3}$/, '').replace(/\u2026$/, '').replace(/\s+/g, ' ').trim();
  if (d.length <= maxLen) return d;
  // Prefer clean sentence boundary if >= 85 chars survive
  const slice = d.slice(0, maxLen);
  const lastPeriod = slice.lastIndexOf('. ');
  if (lastPeriod >= 85) {
    return slice.slice(0, lastPeriod + 1).trim();
  }
  const lastSpace = slice.lastIndexOf(' ');
  const trimmed = lastSpace > 80 ? slice.slice(0, lastSpace) : slice;
  return trimmed.replace(/[\s,;:\-]+$/, '').trim();
}

export function constructMetadata({
  title = 'B2B SEO Consultant & High-Speed Web Engineering | Rankur',
  description = 'Fast, high-converting Next.js websites for B2B founders, engineered to rank on Google and AI search engines. Milestone-based delivery.',
  canonical = 'https://rankursite.com',
  image = 'https://rankursite.com/og-image.jpg',
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt,
  type = 'website',
  noIndex = false,
  robotsFollow = true,
  alternatesLanguages,
  keywords,
} = {}) {
  const cleanPath = canonical === '/' ? '' : canonical;
  const fullCanonical = canonical.startsWith('http')
    ? canonical
    : `https://rankursite.com${cleanPath.startsWith('/') || cleanPath === '' ? cleanPath : `/${cleanPath}`}`;

  const fullImage = image.startsWith('http')
    ? image
    : `https://rankursite.com${image.startsWith('/') ? image : `/${image}`}`;

  const finalTitle = fitSeoTitle(title, 60);
  const finalDesc = fitSeoDescription(description, 155);
  const finalAlt = (imageAlt || finalTitle).trim();

  const alternates = {
    canonical: fullCanonical,
  };
  if (alternatesLanguages) {
    alternates.languages = alternatesLanguages;
  }

  return {
    title: finalTitle,
    description: finalDesc,
    ...(keywords ? { keywords } : {}),
    alternates,
    robots: noIndex
      ? { index: false, follow: robotsFollow }
      : { index: true, follow: true },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url: fullCanonical,
      siteName: 'Rankur',
      locale: 'en_US',
      type,
      images: [
        {
          url: fullImage,
          width: imageWidth,
          height: imageHeight,
          alt: finalAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDesc,
      creator: '@moksh_rankur',
      images: [fullImage],
    },
  };
}
