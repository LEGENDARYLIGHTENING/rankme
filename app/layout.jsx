import '../src/styles/global.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import ConsentBanner from '../src/components/ConsentBanner';

export const metadata = {
  metadataBase: new URL('https://rankursite.com'),
  title: {
    default: 'B2B SEO Consultant & High-Speed Web Engineering | Rankur',
    template: '%s',
  },
  description:
    'I build fast, custom Next.js websites for B2B founders and structure them for Google search, AI answer visibility, and qualified pipeline leads.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/rankur-logo.png', sizes: 'any', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/rankur-logo.png',
  },
  openGraph: {
    title: 'B2B SEO Consultant & High-Speed Web Engineering | Rankur',
    description:
      'I build fast, custom Next.js websites for B2B founders and structure them for Google search, AI answer visibility, and qualified pipeline leads.',
    url: 'https://rankursite.com',
    siteName: 'Rankur',
    images: [
      {
        url: 'https://rankursite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rankur - B2B SEO & Next.js Web Engineering',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B SEO Consultant & High-Speed Web Engineering | Rankur',
    description:
      'I build fast, custom Next.js websites for B2B founders and structure them for Google search, AI answer visibility, and qualified pipeline leads.',
    creator: '@moksh_rankur',
    images: ['https://rankursite.com/twitter-image.jpg'],
  },
};

const masterSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://rankursite.com/#website',
      url: 'https://rankursite.com',
      name: 'Rankur',
      description: 'High-speed Next.js B2B web infrastructure, GEO search optimization, and lead generation systems for founders.',
      publisher: {
        '@id': 'https://rankursite.com/#organization',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': 'https://rankursite.com/#organization',
      name: 'Rankur',
      legalName: 'Moksh Productions',
      url: 'https://rankursite.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rankursite.com/rankur-logo.png',
        width: 420,
        height: 280,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Business Inquiries',
        email: 'contactus@rankursite.com',
        availableLanguage: ['English'],
      },
      sameAs: [
        'https://www.crunchbase.com/organization/rankur-a39c',
        'https://twitter.com/moksh_rankur',
      ],
      founder: {
        '@id': 'https://rankursite.com/#founder',
      },
      knowsAbout: [
        'B2B Web Design',
        'Next.js Engineering',
        'Generative Engine Optimization (GEO)',
        'Technical SEO',
        'Conversion Rate Optimization',
      ],
      workExample: [
        {
          '@type': 'WebSite',
          '@id': 'https://www.wafatrustindia.org/#website',
          name: 'Wafa Educational & Charitable Trust',
          url: 'https://www.wafatrustindia.org/',
          description: 'Client platform: Accessible Next.js web platform built for philanthropic healthcare and community education.',
          creator: { '@id': 'https://rankursite.com/#organization' },
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://rankursite.com/#founder',
      name: 'Moksh Parjapati',
      jobTitle: 'Founder & B2B Web/SEO Engineer',
      url: 'https://rankursite.com/about',
      worksFor: {
        '@id': 'https://rankursite.com/#organization',
      },
      knowsAbout: [
        'B2B Web Design',
        'Next.js Engineering',
        'Generative Engine Optimization (GEO)',
        'Technical SEO',
        'Conversion Rate Optimization',
      ],
      sameAs: [
        'https://linkedin.com/in/moksh-parjapati',
        'https://twitter.com/moksh_rankur',
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Google Analytics 4 (GA4) Certification',
          credentialCategory: 'certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Google Skillshop',
            url: 'https://skillshop.credential.net',
          },
          url: 'https://skillshop.credential.net/4de8075c-d494-4e05-b6ed-1bb204e4e982#acc.YgFQXSAI',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'HubSpot Inbound Marketing Certification',
          credentialCategory: 'certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'HubSpot Academy',
            url: 'https://academy.hubspot.com',
          },
          url: 'https://app-na2.hubspot.com/academy/achievements/p168r1xl/en/1/parjapati-na/inbound-marketing-certified',
        },
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://rankursite.com/#service',
      name: 'Rankur - B2B Web Engineering & Technical SEO',
      url: 'https://rankursite.com',
      parentOrganization: {
        '@id': 'https://rankursite.com/#organization',
      },
      priceRange: '$$$',
      areaServed: ['US', 'GB', 'CA', 'AU', 'AE', 'SA'],
      serviceType: [
        'High-Converting B2B Web Systems',
        'B2B Conversion Rate Optimization',
        'Generative Engine Optimization (GEO)',
        'Technical SEO Auditing',
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/rankur-logo.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(masterSchema) }}
        />
      </head>
      <body>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
        <ConsentBanner />
      </body>
    </html>
  );
}
