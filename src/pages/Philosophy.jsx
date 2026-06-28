import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import './Philosophy.css';

const beliefs = [
  {
    num: '01',
    title: 'Marketing must generate revenue, not just clicks.',
    desc: 'Traffic and impressions are vanity metrics that pay zero bills. We design positioning models, technical structures, and search strategies that align directly with high-value pipeline, booked discovery calls, and closed contracts.',
  },
  {
    num: '02',
    title: 'Websites are active salespeople, not digital brochures.',
    desc: 'If your site is merely a passive corporate profile, it is costing you pipeline. Your website must actively qualify leads, answer commercial objections, establish credentials, and guide high-intent buyers to take action.',
  },
  {
    num: '03',
    title: 'SEO should answer high-intent buying questions.',
    desc: 'We do not target generic, high-volume keywords that drive irrelevant blog traffic. We build content around the exact commercial problems, technical integration queries, and vendor-comparison phrases your buyers search when ready to buy.',
  },
  {
    num: '04',
    title: 'AI Search (GEO) is the new search battleground.',
    desc: 'Procurement teams and B2B executives increasingly ask ChatGPT, Claude, and Perplexity for supplier recommendations. If your brand\'s semantic structure, schema tags, and technical references are not optimized for LLM indexing, your business is invisible.',
  },
  {
    num: '05',
    title: 'Trust is cumulative.',
    desc: 'Every UI pixel, every piece of copy, every database validation, and every proof document either establishes authority or chips away at it. We optimize for radical transparency, presenting verified MSME registrations, recommendation letters, and real-world case studies.',
  },
  {
    num: '06',
    title: 'Data beats opinions.',
    desc: 'We do not run marketing campaigns based on gut feelings. We build with GA4 custom event flows and database tracking to measure user interaction at a granular level, ensuring every dollar spent is fully accountable.',
  },
];

export default function Philosophy() {
  return (
    <>
      <Helmet>
        <title>Our Operating Philosophy | B2B Growth Infrastructure | Moksh</title>
        <meta
          name="description"
          content="The core consulting beliefs that guide how we build websites, structure organic search dominance, and drive enterprise pipeline."
        />
      </Helmet>

      <HeroSection
        label="Our Philosophy"
        title={
          <>
            Six Beliefs That Shape <br />
            <span className="text-gold">B2B Growth</span>
          </>
        }
        subtitle="We build digital acquisition pipelines for clients based on the exact same systems and philosophies we use to scale our own ventures."
        primaryCTA={{ to: '/free-audit', label: 'Apply for Growth Audit' }}
        center
      />

      {/* Beliefs Grid */}
      <section className="philosophy-section">
        <div className="container">
          <p className="section-label">How We Think</p>
          <h2 className="section-title">The Principles of B2B Growth Infrastructure</h2>
          <div className="philosophy-grid">
            {beliefs.map((belief, i) => (
              <div key={i} className="philosophy-card">
                <div className="philosophy-card__header">
                  <span className="philosophy-card__num">{belief.num}</span>
                  <h3 className="philosophy-card__title">{belief.title}</h3>
                </div>
                <p className="philosophy-card__desc">{belief.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Ecosystem Philosophy */}
      <section className="ecosystem-philosophies" style={{ backgroundColor: 'var(--color-dark-surface)', padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <div className="about-story__content" style={{ maxWidth: '850px' }}>
            <p className="section-label">Proven Systems</p>
            <h2 className="section-title">Venture-Backed Methodology</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1rem', marginBottom: 'var(--space-lg)' }}>
              Rankur operates as a specialized division under <strong>Moksh Productions</strong>. 
              We do not treat client growth as a theoretical experiment. The positioning structures, React/Next.js architectures, 
              and Generative Engine SEO models we implement for our B2B clients are the exact same systems we engineer to launch 
              and scale our own internal software, SaaS, and technology products.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
              By testing and refining our methods on our own commercial ventures first, we eliminate the guesswork. 
              You benefit from a battle-tested pipeline designed by operators who have their own capital on the line.
            </p>
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
