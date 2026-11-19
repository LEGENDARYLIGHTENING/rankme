import Process from '../../src/views/Process';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'How I Work: Audit, Build & Growth Process | Rankur',
  description:
    'From initial technical SEO audit to custom Next.js build, GA4 telemetry, and milestone-based sign-off: see how projects run.',
  canonical: '/process',
});

export default function Page() {
  return <Process />;
}
