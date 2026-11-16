// Single source of truth for Rankur partner and client testimonials.
// Verified live client feedback.

export const TESTIMONIALS = [
  {
    id: 'wafa-trust',
    quote:
      'Moksh engineered our digital platform and web presence with high dedication, delivering clean, accessible web infrastructure for our organization.',
    name: 'Trust Leadership',
    role: 'Executive Leadership',
    company: 'Wafa Educational & Charitable Trust',
    domain: 'https://www.wafatrustindia.org/',
    linkedin: '',
    relationship: 'client',
    consent: true,
  },
];

export const APPROVED_TESTIMONIALS = TESTIMONIALS.filter(
  (t) => t.consent === true && Boolean(t.name && t.quote)
);
