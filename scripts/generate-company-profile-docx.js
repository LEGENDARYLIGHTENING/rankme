import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, '../RANKUR_COMPANY_PROFILE_DECK.docx');
const logoBannerPath = path.join(__dirname, '../public/logo-banner-dark.png');
const logoBannerBuffer = fs.readFileSync(logoBannerPath);

const goldColor = 'C9A84C';
const darkColor = '0A0C10';

const thinBorder = {
  style: BorderStyle.SINGLE,
  size: 1,
  color: 'D0D7DE',
};

const cellPadding = {
  top: 140,
  bottom: 140,
  left: 200,
  right: 200,
};

function createSlideHeader(slideNumber, slideTitle, isDark = false) {
  return [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 240, after: 100 },
      children: [
        new TextRun({
          text: `SLIDE ${slideNumber} OF 12 · ${isDark ? 'DARK SLIDE' : 'LIGHT SLIDE'}`,
          size: 18,
          bold: true,
          color: goldColor,
          font: 'Calibri',
        }),
      ],
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 100, after: 150 },
      children: [
        new TextRun({
          text: slideTitle,
          size: 32,
          bold: true,
          color: isDark ? '1A1A1A' : darkColor,
          font: 'Calibri',
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 260 },
      children: [
        new TextRun({
          text: '_________________________________________________________________________________',
          color: goldColor,
          bold: true,
        }),
      ],
    }),
  ];
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: 'Calibri',
          size: 22,
          color: '222222',
        },
      },
    },
  },
  sections: [
    {
      properties: {},
      children: [
        // Title Block with Logo
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 },
          children: [
            new ImageRun({
              data: logoBannerBuffer,
              transformation: {
                width: 320,
                height: 125,
              },
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 80 },
          children: [
            new TextRun({
              text: 'RANKURSITE.COM',
              bold: true,
              size: 44,
              color: goldColor,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: 'B2B Growth Infrastructure Studio · Company Profile & Capabilities Master Deck',
              bold: true,
              size: 26,
              color: darkColor,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 360 },
          children: [
            new TextRun({
              text: 'High-Performance Web Infrastructure, Sub-Second Page Speed & Inbound B2B Lead Engines',
              italics: true,
              size: 21,
              color: '555555',
            }),
          ],
        }),

        // ==========================================
        // SLIDE 1
        // ==========================================
        ...createSlideHeader('01', 'Slide 1: Cover & Verified Performance Credentials', true),
        new Paragraph({
          children: [
            new TextRun({ text: 'Studio Brand: ', bold: true, color: goldColor }),
            new TextRun({ text: 'RankurSite.com (Moksh Productions)\n', bold: true }),
            new TextRun({ text: 'Eyebrow: ', bold: true, color: goldColor }),
            new TextRun({ text: 'B2B GROWTH INFRASTRUCTURE STUDIO\n' }),
            new TextRun({ text: 'Headline: ', bold: true }),
            new TextRun({ text: 'We build your website. To bring in real, high-value B2B leads.\n', bold: true }),
            new TextRun({ text: 'Lead Narrative: ', bold: true }),
            new TextRun({ text: 'RankurSite.com is a founder-led B2B growth infrastructure studio operated under MSME-registered Moksh Productions. We design, position, and deploy enterprise digital platforms that rank at the top of Google and AI search, turning global procurement visitors into qualified sales pipeline.\n' }),
          ],
        }),
        new Paragraph({
          spacing: { before: 150, after: 300 },
          children: [
            new TextRun({ text: 'Verified Performance Badges (What Clients Actually Care About):\n', bold: true }),
            new TextRun({ text: '• 2,280+ Pages Live in Production (Zero crashes, flawless stability)\n' }),
            new TextRun({ text: '• Sub-Second Global Page Speed (LCP < 0.9s across 280+ edge cities)\n' }),
            new TextRun({ text: '• Google + AI Search Visibility (Dominating buyer search & AI citations)\n' }),
            new TextRun({ text: '• MSME-Registered Enterprise (India Government Verified)\n' }),
            new TextRun({ text: '• Mutual NDA Protected (Enterprise-grade IP & data confidentiality)\n' }),
            new TextRun({ text: '• 100% Money-Back Guarantee (Zero risk, unconditional performance promise)' }),
          ],
        }),

        // ==========================================
        // SLIDE 2
        // ==========================================
        ...createSlideHeader('02', 'Slide 2: The Problem We Solved', false),
        new Paragraph({
          children: [
            new TextRun({ text: 'Headline: ', bold: true }),
            new TextRun({ text: 'Conventional B2B websites fail before buyers ever get in touch.\n\n', bold: true }),
            new TextRun({ text: 'The Industry Problem:\n', bold: true }),
            new TextRun({ text: 'Most B2B websites act as digital brochures that nobody visits. They take 4 to 6 seconds to load, fail to rank for high-intent searches, and confuse buyers with generic corporate jargon. By the time a qualified procurement officer arrives, over 70% have already bounced to a competitor.\n\n' }),
            new TextRun({ text: 'The RankurSite.com Solution:\n', bold: true }),
            new TextRun({ text: 'RankurSite.com eliminates this failure mode entirely. We engineer high-speed digital infrastructure that positions your company as the obvious market choice. With sub-second load times anywhere in the world, top-tier discoverability across Google and AI search engines, and automated RFQ capture, we turn your website into your highest-performing salesperson.\n\n' }),
            new TextRun({ text: 'Verified Callout: ', bold: true, color: goldColor }),
            new TextRun({ text: '"This is not a marketing claim. It is verified in production across 2,280+ live client pages."', italics: true, bold: true }),
          ],
        }),

        // ==========================================
        // SLIDE 3
        // ==========================================
        ...createSlideHeader('03', 'Slide 3: Verified Client Deployments Portfolio', true),
        new Paragraph({
          children: [
            new TextRun({ text: 'Headline: ', bold: true }),
            new TextRun({ text: 'Three Platforms. Over 1,940 static pages driving daily leads.\n\n', bold: true }),
            new TextRun({ text: '1. WizIOT (Fleet Telematics & IoT Hardware · EMEA & GCC):\n', bold: true, color: goldColor }),
            new TextRun({ text: 'Expansive enterprise platform engineered to present complex sensor protocols, fuel monitors, and telematics hardware across Africa, GCC, and Europe. Delivers sub-0.9s load times with zero server lag and direct live footer backlink verification.\n' }),
            new TextRun({ text: 'Performance Scale: 1,040+ Static Pages Live in Production.\n\n', bold: true }),
            new TextRun({ text: '2. Atlanta Systems (Automotive Manufacturing · AIS-140):\n', bold: true, color: goldColor }),
            new TextRun({ text: 'High-performance infrastructure dominating AIS-140 compliance searches for India\'s leading automotive GPS manufacturer. Achieved 100% crawl indexation on regulatory terms and automated institutional RFQ pipelines.\n' }),
            new TextRun({ text: 'Performance Scale: 460+ Static Pages Live in Production.\n\n', bold: true }),
            new TextRun({ text: '3. Medventa (B2B Healthcare Commerce · Surgical Supplies):\n', bold: true, color: goldColor }),
            new TextRun({ text: 'Lightning-fast medical supplies platform covering 440+ surgical suture and healthcare SKUs. Enables hospital purchase officers to filter technical needle dimensions and submit bulk institutional quotes in seconds.\n' }),
            new TextRun({ text: 'Performance Scale: 440+ Static SKUs Live in Production.' }),
          ],
        }),

        // ==========================================
        // SLIDE 4
        // ==========================================
        ...createSlideHeader('04', 'Slide 4: Capabilities Portfolio Transition', true),
        new Paragraph({
          children: [
            new TextRun({ text: 'Headline: ', bold: true }),
            new TextRun({ text: 'Infrastructure engineered to maximize qualified enterprise pipeline.\n\n', bold: true }),
            new TextRun({ text: 'Commercial Focus:\n', bold: true }),
            new TextRun({ text: 'Every capability below is built around one single objective: generating closed-won revenue for your business. We combine sharp commercial positioning, sub-second speed, and AI search dominance to position your brand as the obvious partner for high-ticket contracts.\n\n' }),
            new TextRun({ text: 'Key Production Metric: ', bold: true, color: goldColor }),
            new TextRun({ text: '2,280+ Pages Live in Production Across 5 Client Platforms.' }),
          ],
        }),

        // ==========================================
        // SLIDE 5 & 6
        // ==========================================
        ...createSlideHeader('05 & 06', 'Slides 5 & 6: Comprehensive Service Portfolio (8 Core Offerings)', false),
        new Paragraph({
          children: [
            new TextRun({ text: 'Core Client Capabilities (Part 1):\n', bold: true, color: goldColor }),
            new TextRun({ text: '1. Ultra-Fast B2B Web Build: Sub-second global speed (<1.2s), zero page-builder bloat, and automated lead capture routing to CRM.\n' }),
            new TextRun({ text: '2. AI Search & GEO Dominance: Structured knowledge graphs priming ChatGPT, Perplexity, and Claude to cite and recommend your brand.\n' }),
            new TextRun({ text: '3. High-Intent B2B SEO: Targeting active buyer-intent keywords that capture procurement directors ready to sign vendor contracts.\n' }),
            new TextRun({ text: '4. Conversion Rate Systems (CRO): Eliminating form and layout friction, routinely doubling inquiry conversion rates without extra ad spend.\n\n' }),
            new TextRun({ text: 'Growth & Authority Systems (Part 2):\n', bold: true, color: goldColor }),
            new TextRun({ text: '5. Executive Thought Leadership: Strategic founder authority content that builds credibility before sales discovery calls.\n' }),
            new TextRun({ text: '6. Global Export Channels: Sourcing infrastructure connecting domestic manufacturers to US, UK, and GCC buyers.\n' }),
            new TextRun({ text: '7. High-Ticket Conversion Funnels: Bridge pages and qualification funnels turning cold traffic into booked sales calls.\n' }),
            new TextRun({ text: '8. Global Edge Performance: Sub-0.9s LCP across 280+ global cities with automated SSL encryption and DDoS protection.' }),
          ],
        }),

        // ==========================================
        // SLIDE 7
        // ==========================================
        ...createSlideHeader('07', 'Slide 7: Why RankurSite.com — The Operating Manifesto', true),
        new Paragraph({
          children: [
            new TextRun({ text: 'Headline: ', bold: true }),
            new TextRun({ text: 'The question worth asking before you hire an agency.\n\n', bold: true }),
            new TextRun({ text: 'Operating Manifesto:\n', bold: true }),
            new TextRun({ text: 'Most agencies focus on producing pretty mockups and reporting vanity clicks.\nWe focus on advancing what digital infrastructure actually generates.\n\nFrom deploying 2,000+ pages that never crash to priming platforms for AI search engines, modern B2B growth demands more than generic templates — it requires engineered solutions.\n\nBecause in enterprise B2B, differentiation isn\'t about what you claim.\nIt\'s about what actually performs when real buyers search.\n\n' }),
            new TextRun({ text: 'Verified Production Benchmarks:\n', bold: true, color: goldColor }),
            new TextRun({ text: '• 2,280+ Static Pages Live in Active Production\n• 5 Verified Production Client Deployments\n• < 0.9s Global Largest Contentful Paint (LCP) Benchmark' }),
          ],
        }),

        // ==========================================
        // SLIDE 8 & 9
        // ==========================================
        ...createSlideHeader('08 & 09', 'Slides 8 & 9: Six Uncompromising Capabilities', false),
        new Paragraph({
          children: [
            new TextRun({ text: '01. Massive Scale Without Crashing: ', bold: true, color: goldColor }),
            new TextRun({ text: 'High-performance pre-rendered architecture handles 2,000+ pages with zero server lag or database slowdowns during heavy traffic surges.\n\n' }),
            new TextRun({ text: '02. AI Search & GEO Visibility: ', bold: true, color: goldColor }),
            new TextRun({ text: 'Structured entity models force generative AI engines (ChatGPT, Perplexity, Claude) to cite and recommend your brand for vendor queries.\n\n' }),
            new TextRun({ text: '03. Verified Live Provenance: ', bold: true, color: goldColor }),
            new TextRun({ text: 'Inspect live production platforms (WizIOT, Atlanta Systems, Medventa, Probiota Innovations) and click through the verified "Designed and built by Rankur" (RankurSite.com) footer links.\n\n' }),
            new TextRun({ text: '04. Rapid 7–14 Day Delivery Sprint: ', bold: true, color: goldColor }),
            new TextRun({ text: 'Zero bureaucratic agency delays; launch your custom high-converting website in 7 to 14 days, not 6 months.\n\n' }),
            new TextRun({ text: '05. Founder-Led Execution: ', bold: true, color: goldColor }),
            new TextRun({ text: 'Moksh Parjapati personally designs, strategizes, and deploys every engagement; zero junior account manager handoffs.\n\n' }),
            new TextRun({ text: '06. 100% Money-Back Guarantee: ', bold: true, color: goldColor }),
            new TextRun({ text: 'If your platform does not meet the agreed speed benchmarks, search indexation quality, and conversion standards, 100% full refund. Zero debate.' }),
          ],
        }),

        // ==========================================
        // SLIDE 10
        // ==========================================
        ...createSlideHeader('10', 'Slide 10: Founder & Leadership Architecture', false),
        new Paragraph({
          children: [
            new TextRun({ text: 'Headline: ', bold: true }),
            new TextRun({ text: 'Built by a strategist. Not by account managers.\n\n', bold: true }),
            new TextRun({ text: 'Founder Profile:\n', bold: true }),
            new TextRun({ text: 'Moksh Parjapati — Founder & B2B Growth Consultant | RankurSite.com & Moksh Productions\n\n' }),
            new TextRun({ text: 'Founder Creed: ', bold: true, color: goldColor }),
            new TextRun({ text: '"We do not build generic digital brochures. We build high-speed revenue engines. And we do it with uncompromising technical integrity."\n\n', italics: true }),
            new TextRun({ text: 'Credentials Ledger:\n', bold: true }),
            new TextRun({ text: '• Founder & Principal Architect behind 2,280+ static pages in active production\n• Official Google Analytics 4 (GA4) Certified Growth Consultant\n• Digital Deepak Marketing Mastery Certified & Commercial Strategist\n• Executive Channel Partner & Sourcing Integrator with official Alibaba channels\n• High-speed custom infrastructure expertise delivering sub-second global performance\n• Proven track record delivering qualified enterprise pipeline across US, UK, Australia, and GCC' }),
          ],
        }),

        // ==========================================
        // SLIDE 11
        // ==========================================
        ...createSlideHeader('11', 'Slide 11: Institutional & Corporate Credentials', true),
        new Paragraph({
          children: [
            new TextRun({ text: 'Headline: ', bold: true }),
            new TextRun({ text: 'Infrastructure built for global enterprises.\n\n', bold: true }),
            new TextRun({ text: '1. MSME REGISTERED (GOVERNMENT OF INDIA): ', bold: true, color: goldColor }),
            new TextRun({ text: 'Official enterprise status under Moksh Productions with the Ministry of MSME, ensuring institutional billing and legal compliance.\n\n' }),
            new TextRun({ text: '2. MUTUAL NDA PROTECTED: ', bold: true, color: goldColor }),
            new TextRun({ text: 'Full contractual confidentiality before reviewing proprietary formulas, commercial supply chains, or internal CRM metrics.\n\n' }),
            new TextRun({ text: '3. GLOBAL EDGE CDN & SECURITY: ', bold: true, color: goldColor }),
            new TextRun({ text: 'Enterprise edge distribution across 280+ global cities with automated SSL/TLS encryption, DDoS mitigation, and sub-second caching.' }),
          ],
        }),

        // ==========================================
        // SLIDE 12
        // ==========================================
        ...createSlideHeader('12', "Slide 12: Next Steps & Let's Build Together", false),
        new Paragraph({
          children: [
            new TextRun({ text: 'Headline: ', bold: true }),
            new TextRun({ text: 'Your business deserves a website that brings in real leads.\n\n', bold: true }),
            new TextRun({ text: 'Official Contact Channels:\n', bold: true }),
            new TextRun({ text: '• Email: contactus@rankursite.com\n' }),
            new TextRun({ text: '• Direct Phone / WhatsApp: +91 95600 76090\n' }),
            new TextRun({ text: '• Corporate Entity: Moksh Productions · Headquarters: India\n' }),
            new TextRun({ text: '• Operating Markets: United States · United Kingdom · Canada · Australia · UAE · Saudi Arabia\n' }),
            new TextRun({ text: '• Free Video Diagnostic Audit & Portfolio: https://rankursite.com/free-audit\n' }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated Company Profile Deck Word Document at: ${outputPath}`);
});
