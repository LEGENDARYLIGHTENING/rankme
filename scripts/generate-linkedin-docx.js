import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
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

const outputPath = path.join(__dirname, '../RANKUR_LINKEDIN_COMPANY_PROFILE_MASTER_SPEC.docx');

const goldColor = 'C9A84C';
const darkColor = '0A0A0A';
const textMuted = '555555';

const thinBorder = {
  style: BorderStyle.SINGLE,
  size: 1,
  color: 'D0D0D0',
};

const cellPadding = {
  top: 140,
  bottom: 140,
  left: 200,
  right: 200,
};

function createHeaderCell(text, widthPercent = 30) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    shading: { fill: '1A1A1A', type: ShadingType.CLEAR },
    margins: cellPadding,
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: true,
            color: 'FFFFFF',
            size: 20,
            font: 'Calibri',
          }),
        ],
      }),
    ],
  });
}

function createDataCell(text, isBold = false, widthPercent = 70) {
  return new TableCell({
    width: { size: widthPercent, type: WidthType.PERCENTAGE },
    margins: cellPadding,
    borders: {
      top: thinBorder,
      bottom: thinBorder,
      left: thinBorder,
      right: thinBorder,
    },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: isBold,
            color: isBold ? '1A1A1A' : '333333',
            size: 20,
            font: 'Calibri',
          }),
        ],
      }),
    ],
  });
}

function createRow(label, value, isBold = false) {
  return new TableRow({
    children: [createHeaderCell(label, 32), createDataCell(value, isBold, 68)],
  });
}

function createSectionHeading(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 140 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 24,
        color: goldColor,
        font: 'Calibri',
      }),
    ],
  });
}

function createCalloutBox(lines) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            shading: { fill: 'F8F9FA', type: ShadingType.CLEAR },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: goldColor },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: goldColor },
              left: { style: BorderStyle.SINGLE, size: 6, color: goldColor },
              right: { style: BorderStyle.SINGLE, size: 2, color: goldColor },
            },
            margins: { top: 180, bottom: 180, left: 240, right: 240 },
            children: lines.map(line => 
              new Paragraph({
                spacing: { before: 60, after: 60 },
                children: [
                  new TextRun({
                    text: line,
                    size: 19,
                    color: '222222',
                    font: 'Calibri',
                  }),
                ],
              })
            ),
          }),
        ],
      }),
    ],
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: 'Calibri',
          size: 21,
          color: '222222',
        },
      },
    },
  },
  sections: [
    {
      properties: {},
      children: [
        // Document Title
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 80 },
          children: [
            new TextRun({
              text: 'RANKUR',
              bold: true,
              size: 42,
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
              text: 'LinkedIn Company Profile Master Specification',
              bold: true,
              size: 26,
              color: darkColor,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 320 },
          children: [
            new TextRun({
              text: 'Official Corporate Page Setup, Positioning, SEO Keywords & Conversion Architecture',
              italics: true,
              size: 20,
              color: textMuted,
              font: 'Calibri',
            }),
          ],
        }),

        // Section 1: Page Identity
        createSectionHeading('1. Page Identity & Core Corporate Details'),
        new Paragraph({
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: 'Use these exact parameters when setting up the company page under LinkedIn Organization Manager:',
              size: 20,
              color: '444444',
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createRow('Company Name', 'Rankur', true),
            createRow('Alternate Display Name', 'Rankur | B2B Web Engineering'),
            createRow('Public LinkedIn URL', 'linkedin.com/company/rankursite (or rankur)'),
            createRow('Website URL', 'https://rankursite.com', true),
            createRow('Primary Industry', 'IT Services and IT Consulting'),
            createRow('Secondary Industry Tag', 'Software Development / Technology, Information and Media'),
            createRow('Company Size', '2 - 10 employees'),
            createRow('Company Type', 'Privately Held'),
            createRow('Year Founded', '2021'),
            createRow('Workplace Type', 'Remote (Global B2B Clients)'),
            createRow('Primary Markets', 'United States, United Kingdom, Canada, UAE, Global'),
          ],
        }),

        // Section 2: Visual Brand Assets
        createSectionHeading('2. Visual Identity & Brand Media Assets'),
        new Paragraph({
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: 'High-resolution image specifications matching your local project assets:',
              size: 20,
              color: '444444',
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createRow('Profile Logo (Square 1:1)', '300 x 300 px PNG | File: prototype/public/logo-square-dark.png', true),
            createRow('Alternate Light Logo', '300 x 300 px PNG | File: prototype/public/logo-square-light.png'),
            createRow('Cover Banner (Horizontal)', '1128 x 191 px PNG | File: prototype/public/logo-banner-dark.png', true),
          ],
        }),

        // Section 3: Tagline Options
        createSectionHeading('3. Official Company Tagline (Strict 120-Character Limit)'),
        new Paragraph({
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: 'LinkedIn strictly caps company taglines at 120 characters. Choose one of these verified high-converting options:',
              size: 20,
              color: '444444',
            }),
          ],
        }),
        createCalloutBox([
          'OPTION 1 — Conversion & Scale Focus (115 chars):',
          'Custom React & Next.js websites, technical SEO, and conversion architecture for high-growth B2B SaaS & enterprises.',
          '',
          'OPTION 2 — Founder & Pipeline Focus (112 chars):',
          'Engineering high-converting React websites, technical SEO architecture & B2B pipeline engines for tech founders.',
          '',
          'OPTION 3 — Performance & Speed Focus (108 chars):',
          'Decoupled React architectures, sub-second page performance, and generative AI search optimization for B2B.',
        ]),

        // Section 4: About / Overview Description
        createSectionHeading('4. Master "About" Overview (Full 2,000-Character Description)'),
        new Paragraph({
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: 'Copy and paste this complete overview into your company page About section:',
              size: 20,
              color: '444444',
            }),
          ],
        }),
        createCalloutBox([
          'Rankur is an engineering-first B2B web development and digital growth agency. We partner with high-growth SaaS founders, industrial manufacturers, and B2B enterprises to transform passive websites into compounding, high-converting revenue engines.',
          '',
          'Most B2B websites fail to produce pipeline because they are built on legacy, monolithic platforms (WordPress, Webflow) loaded with bloated plugins and generic templates. They take 4+ seconds to load, fail Google Core Web Vitals, and remain mathematically invisible to modern search engines and AI discovery tools.',
          '',
          'We treat website development as an engineering discipline, not an art project. By building decoupled, custom-coded React and Next.js front-ends served on global Edge networks, Rankur delivers sub-second page loads, zero-friction conversion architecture, and programmatic search scale.',
          '',
          'Core Capabilities:',
          '• High-Converting B2B Web Design & Rapid 7-Day Sprint Delivery',
          '• Custom React & Next.js Front-End Engineering for SaaS & Tech Startups',
          '• Technical SEO Architecture & Generative Engine Optimization (GEO for ChatGPT & Perplexity)',
          '• Programmatic SEO & Regional High-Intent Landing Page Scalability',
          '• Conversion Rate Optimization (CRO) & Inbound Pipeline Funnel Engineering',
          '• Automated Content Decay & Anomaly Auditing via DecayCheck',
          '',
          'Our Ecosystem:',
          'Beyond custom engineering, Rankur operates DecayCheck—our proprietary SEO diagnostic platform that continuously monitors Google Search Console data to detect content decay, crawl anomalies, and lost rankings before they impact MRR.',
          '',
          'Whether you are preparing for enterprise procurement audits, scaling international inbound pipeline, or migrating away from fragile legacy CMS platforms, Rankur builds digital infrastructure engineered to win.',
          '',
          '📍 Global Service Focus: United States, United Kingdom, Canada, Europe & UAE.',
          '🔗 Explore our engineering case studies & claim your free technical audit: https://rankursite.com',
        ]),

        // Section 5: Custom Action Button
        createSectionHeading('5. Custom Action Button (Lead Capture Funnel)'),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createRow('Button Label', 'Visit website (or Contact us)', true),
            createRow('Destination URL', 'https://rankursite.com?utm_source=linkedin&utm_medium=company_page&utm_campaign=profile_cta', true),
            createRow('Secondary Audit Link', 'https://rankursite.com/free-audit?utm_source=linkedin&utm_medium=company_page'),
          ],
        }),

        // Section 6: Specialties (20 Tags)
        createSectionHeading('6. The 20 Strategic Specialties (Algorithm Grounding)'),
        new Paragraph({
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: 'Add these exact 20 tags to the Specialties field. These directly ground Rankur in LinkedIn search results when enterprise buyers search for vendors:',
              size: 20,
              color: '444444',
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createRow('Specialties 1 - 5', 'B2B Web Development | React.js | Next.js | Technical SEO | Generative Engine Optimization (GEO)'),
            createRow('Specialties 6 - 10', 'SaaS Website Design | Conversion Rate Optimization (CRO) | Headless CMS Architecture | Core Web Vitals Optimization | B2B Lead Generation'),
            createRow('Specialties 11 - 15', 'Inbound Marketing Infrastructure | Programmatic SEO | Enterprise Digital Strategy | Front-End Web Engineering | Search Console Analytics'),
            createRow('Specialties 16 - 20', 'Website Speed Optimization | Custom Software Development | B2B SaaS Growth | DecayCheck SEO Engine | Web Security & Edge Deployment'),
          ],
        }),

        // Section 7: Community Hashtags
        createSectionHeading('7. Official Page Hashtags (3 Tags)'),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createRow('Hashtag 1', '#B2BGrowth', true),
            createRow('Hashtag 2', '#WebDevelopment', true),
            createRow('Hashtag 3', '#SaaS', true),
          ],
        }),

        // Section 8: Founder Integration
        createSectionHeading('8. Founder Profile Integration (Moksh Parjapati)'),
        new Paragraph({
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: 'Link your personal profile to the new company page to establish bilateral Knowledge Graph authority:',
              size: 20,
              color: '444444',
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createRow('Personal Profile Name', 'Moksh Parjapati', true),
            createRow('Job Title', 'Founder & B2B Web Engineer', true),
            createRow('Company Attached', 'Rankur (Select official company page)'),
            createRow('Location', 'Remote / Primary Operating City'),
            createRow('Role Description', 'Founder at Rankur (rankursite.com). Engineering custom React digital engines, technical SEO architectures, and high-converting B2B inbound platforms for SaaS founders and enterprise leaders.'),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Successfully generated: ${outputPath}`);
});
