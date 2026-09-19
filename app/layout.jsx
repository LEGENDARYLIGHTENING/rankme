import '../src/styles/global.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export const metadata = {
  metadataBase: new URL('https://rankursite.com'),
  title: 'B2B Web Design & Lead Generation for Founders | Rankur',
  description: 'I build fast, custom B2B websites that rank on Google and turn visitors into leads - most live in about 7 days, backed by a 100% money-back guarantee.',
  openGraph: {
    title: 'B2B Web Design & Lead Generation for Founders | Rankur',
    description: 'I build fast, custom B2B websites that rank on Google and turn visitors into leads - most live in about 7 days, backed by a 100% money-back guarantee.',
    url: 'https://rankursite.com',
    siteName: 'Rankur',
    images: [
      {
        url: 'https://rankursite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rankur - B2B Web Design & Lead Generation for Founders',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Web Design & Lead Generation for Founders | Rankur',
    description: 'I build fast, custom B2B websites that rank on Google and turn visitors into leads - most live in about 7 days, backed by a 100% money-back guarantee.',
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
      url: 'https://rankursite.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rankursite.com/logo-banner-dark.png',
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
        'Next.js 16 Engineering',
        'Generative Engine Optimization (GEO)',
        'Technical SEO',
        'Conversion Rate Optimization',
        'Enterprise Fleet Telematics Infrastructure',
        'AIS-140 GPS Compliance Architecture',
        'B2B Healthcare Headless Commerce',
        'Nutraceutical CDMO Digital Systems',
      ],
      workExample: [
        {
          '@type': 'WebSite',
          '@id': 'https://www.wiziot.com/#website',
          name: 'WizIOT',
          url: 'https://www.wiziot.com',
          description: 'Enterprise Fleet Telematics, IoT Hardware & Sensor Integration platform built on Next.js 16 + Turbopack (1,040+ static pages).',
          creator: {
            '@id': 'https://rankursite.com/#organization',
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://www.atlantasys.com/#website',
          name: 'Atlanta Systems',
          url: 'https://www.atlantasys.com',
          description: 'AIS-140 Certified GPS & Automotive Telematics Manufacturer web infrastructure built on Next.js 16 (460+ static pages).',
          creator: {
            '@id': 'https://rankursite.com/#organization',
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://www.medventa.in/#website',
          name: 'Medventa',
          url: 'https://www.medventa.in',
          description: 'B2B Medical Supplies, Surgical Sutures & Hospital Procurement headless commerce platform built on Next.js 14 (440+ static pages).',
          creator: {
            '@id': 'https://rankursite.com/#organization',
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://www.probiotainnovations.com/#website',
          name: 'Probiota Innovations',
          url: 'https://www.probiotainnovations.com',
          description: 'US-FDA Registered Probiotic & Functional Gummy CDMO web platform built on Next.js 16 (340+ static pages).',
          creator: {
            '@id': 'https://rankursite.com/#organization',
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://wafatrust.org/#website',
          name: 'Wafa Trust',
          url: 'https://wafatrust.org',
          description: 'Philanthropic Healthcare, Dialysis Support & Education NGO platform.',
          creator: {
            '@id': 'https://rankursite.com/#organization',
          },
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://rankursite.com/#founder',
      name: 'Moksh Parjapati',
      jobTitle: 'Founder & B2B Growth Consultant',
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
        'https://www.crunchbase.com/organization/rankur-a39c',
        'https://twitter.com/moksh_rankur',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://rankursite.com/#service',
      name: 'Rankur - B2B Growth & Web Engineering',
      url: 'https://rankursite.com',
      priceRange: '$$$',
      areaServed: ['US', 'GB', 'CA', 'AU', 'AE', 'DE'],
      serviceType: [
        'Custom React & Next.js Websites',
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
        <link rel="icon" type="image/png" href="/Copilot_20260621_183745.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(masterSchema) }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L49CTLKWYS"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-L49CTLKWYS');
            `,
          }}
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
        <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </body>
    </html>
  );
}
