import Philosophy from '../../src/views/Philosophy';
import { constructMetadata } from '../../src/utils/seo';

export const metadata = constructMetadata({
  title: 'Our Engineering Philosophy | Rankur',
  description: 'Why speed, clean code, transparent deliverables, and commercial accountability matter more than trendy agency buzzwords.',
  canonical: '/philosophy',
});

export default function Page() {
  return <Philosophy />;
}
