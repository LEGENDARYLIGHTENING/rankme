import CaseStudies from '../../src/views/CaseStudies';

export const metadata = {
  title: 'Case Studies & Client Results | Rankur',
  description: 'Real results from real B2B clients: see how our custom websites generated 50+ international qualified leads in 30 days and scaled pipeline.',
  alternates: { canonical: 'https://rankursite.com/case-studies' },
};

export default function Page() {
  return <CaseStudies />;
}
