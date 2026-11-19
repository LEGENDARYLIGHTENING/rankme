// Single source of truth for Rankur credentials rendered on /about and /certifications.

export const CREDENTIALS = [
  {
    id: 'ga4-certification',
    badge: 'Verified Credential',
    name: 'Google Analytics 4 (GA4) Certification',
    issuer: 'Google Skillshop',
    year: '2024 – Present',
    impact:
      'Instruments consent-clean event measurement, high-intent buyer milestone tracking, and multi-channel attribution across enterprise Next.js systems.',
    verifyUrl:
      'https://skillshop.credential.net/4de8075c-d494-4e05-b6ed-1bb204e4e982#acc.YgFQXSAI',
    verified: true,
    skills: ['Conversion Tracking', 'Attribution Modeling', 'Custom Event Telemetry', 'GA4 Measurement Protocol'],
    credentialId: '4de8075c-d494-4e05-b6ed-1bb204e4e982',
  },
  {
    id: 'hubspot-inbound',
    badge: 'Verified Credential',
    name: 'HubSpot Inbound Marketing Certification',
    issuer: 'HubSpot Academy',
    year: '2024 – Present',
    impact:
      'Full-funnel inbound marketing architecture, buyer persona mapping, friction-free qualification flows, and lead nurturing protocols for high-ticket B2B.',
    verifyUrl:
      'https://app-na2.hubspot.com/academy/achievements/p168r1xl/en/1/parjapati-na/inbound-marketing-certified',
    verified: true,
    skills: ['Inbound Strategy', 'Lead Qualification', 'Content Architecture', 'Conversion Funnel Optimization'],
    credentialId: 'p168r1xl',
  },
  {
    id: 'digital-deepak-mastery',
    badge: 'Verified Program',
    name: 'Digital Marketing Mastery',
    issuer: 'Digital Deepak Internship Program',
    year: '2024',
    impact:
      'Structured practical training across technical search fundamentals, conversion copywriting, customer psychology, and acquisition systems.',
    verifyUrl: null,
    verified: true,
    skills: ['Search Fundamentals', 'B2B Copywriting', 'Technical SEO Architecture', 'Funnel Design'],
    credentialId: null,
  },
];

export const VERIFIED_CREDENTIALS = CREDENTIALS.filter((c) => c.verified);
