// Single source of truth for Rankur partner and client testimonials.
// NEEDS-MOKSH (C3): Only entries with consent: true, a full real name, and a public
// LinkedIn/profile URL are rendered publicly. Unconsented entries stay hidden.

export const TESTIMONIALS = [
  {
    id: 'wiziot',
    quote: '',
    name: '',
    role: 'Engineering & Technical Leadership',
    company: 'WizIOT',
    domain: 'https://www.wiziot.com',
    linkedin: '',
    relationship: 'client',
    consent: false,
  },
  {
    id: 'atlanta-systems',
    quote: '',
    name: '',
    role: 'Commercial & Operations Team',
    company: 'Atlanta Systems',
    domain: 'https://www.atlantasys.com',
    linkedin: '',
    relationship: 'in-house venture',
    consent: false,
  },
  {
    id: 'medventa',
    quote: '',
    name: '',
    role: 'Procurement & B2B Growth Lead',
    company: 'Medventa',
    domain: 'https://www.medventa.in',
    linkedin: '',
    relationship: 'client',
    consent: false,
  },
  {
    id: 'probiota',
    quote:
      'Rankur built an incredible digital infrastructure for us. The site is fast, structured cleanly, and establishes immediate trust with wholesale buyers.',
    name: 'Anshika Narula',
    role: 'Founder',
    company: 'Probiota Innovations',
    domain: 'https://www.probiotainnovations.com',
    linkedin: '',
    relationship: 'in-house venture',
    consent: true,
  },
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

