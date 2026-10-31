export function constructMetadata({
  title = 'B2B SEO Consultant & High-Speed Web Engineering | Rankur',
  description = 'I engineer fast, high-converting Next.js B2B websites and search systems that rank on Google and AI engines (ChatGPT, Perplexity). Live in 7-14 days.',
  canonical = 'https://rankursite.com',
  image = 'https://rankursite.com/og-image.jpg',
  type = 'website',
  noIndex = false,
} = {}) {
  const fullCanonical = canonical.startsWith('http')
    ? canonical
    : `https://rankursite.com${canonical.startsWith('/') ? canonical : `/${canonical}`}`;

  return {
    title,
    description,
    alternates: {
      canonical: fullCanonical,
    },
    openGraph: {
      title,
      description,
      url: fullCanonical,
      siteName: 'Rankur',
      locale: 'en_US',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@moksh_rankur',
      images: [image],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

