import NichePage from '../../src/views/NichePage';
import { nicheData } from '../../src/data/nicheData';

export const metadata = {
  title: 'B2B SaaS Website Design & Lead Gen | React Expert',
  description: 'B2B SaaS website design and lead generation. I build React JS marketing sites optimized for demo conversions, AI search visibility, and inbound pipeline.',
  alternates: {
    canonical: 'https://rankursite.com/saas-websites',
  },
  openGraph: {
    title: 'B2B SaaS Website Design & Lead Gen | React Expert',
    description: 'B2B SaaS website design and lead generation. I build React JS marketing sites optimized for demo conversions, AI search visibility, and inbound pipeline.',
    url: 'https://rankursite.com/saas-websites',
    siteName: 'Rankur',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B SaaS Website Design & Lead Gen | React Expert',
    description: 'B2B SaaS website design and lead generation. I build React JS marketing sites optimized for demo conversions, AI search visibility, and inbound pipeline.',
    images: ['/twitter-image.jpg'],
  },
};

export default function Page() {
  return <NichePage {...nicheData.saas.props} />;
}
