// Single source of truth for Rankur credentials rendered on /about and /certifications.
// NEEDS-MOKSH (T5): Supply verification URLs for ConversionXL and Alibaba Channel Partner before marking verified: true.

export const CREDENTIALS = [
  {
    id: 'ga4-certification',
    badge: '✓',
    name: 'Google Analytics 4 (GA4) Certification',
    issuer: 'Google Skillshop',
    year: '2024',
    impact:
      'Instruments precision conversion tracking, qualified buyer milestones, and channel attribution across custom platforms.',
    verifyUrl:
      'https://skillshop.docebosaas.com/learn/courses/18609/google-analytics-certification-2026?hash=68065f5c06f16d1e2f97e157c19473356d171fc5&generated_by=12413115',
    verified: true,
  },
  {
    id: 'digital-deepak-mastery',
    badge: '★',
    name: 'Digital Marketing Mastery',
    issuer: 'Digital Deepak Internship Program',
    year: '2024',
    impact:
      'Structured practical training across search fundamentals, conversion copywriting, and acquisition funnels.',
    verifyUrl: null,
    verified: true,
  },
  {
    id: 'cxl-cro',
    badge: '—',
    name: 'Advanced Conversion Optimization & Tracking Masterclass',
    issuer: 'ConversionXL Institute',
    year: null,
    impact: 'Pending public verification link.',
    verifyUrl: null,
    verified: false,
  },
  {
    id: 'alibaba-channel',
    badge: '—',
    name: 'B2B Digital Sourcing & Channel Integration',
    issuer: 'Alibaba Channel Operations Partner',
    year: null,
    impact: 'Pending public verification link.',
    verifyUrl: null,
    verified: false,
  },
];

export const VERIFIED_CREDENTIALS = CREDENTIALS.filter((c) => c.verified);

