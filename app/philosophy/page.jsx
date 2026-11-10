import Philosophy from '../../src/views/Philosophy';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'Engineering Philosophy & Principles | Rankur',
  description:
    'Why page speed, clean Next.js architecture, verifiable proof, and honest commercial clarity outperform generic agency templates.',
  canonical: '/philosophy',
});

export default function Page() {
  return <Philosophy />;
}
