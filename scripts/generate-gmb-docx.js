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

const outputPath = path.join(__dirname, '../RANKUR_GOOGLE_BUSINESS_PROFILE_MASTER_SPEC.docx');

const goldColor = 'C9A84C';
const darkColor = '0A0A0A';
const textMuted = '555555';
const tableBorderColor = 'D4AF37';

const thinBorder = {
  style: BorderStyle.SINGLE,
  size: 1,
  color: 'E0E0E0',
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
            size: 21,
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

function createRow(label, value) {
  return new TableRow({
    children: [createHeaderCell(label, 30), createDataCell(value, false, 70)],
  });
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
        // Document Title
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: 'RANKUR',
              bold: true,
              size: 44,
              color: goldColor,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 200 },
          children: [
            new TextRun({
              text: 'Google Business Profile (GMB) & Entity Authority Master Blueprint',
              bold: true,
              size: 28,
              color: darkColor,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 400 },
          children: [
            new TextRun({
              text: 'High-Impact Local Citation, Knowledge Graph Grounding & Backlink Multiplier System',
              italics: true,
              size: 20,
              color: textMuted,
              font: 'Calibri',
            }),
          ],
        }),

        // Horizontal Divider Rule
        new Paragraph({
          spacing: { before: 100, after: 300 },
          children: [
            new TextRun({
              text: '_________________________________________________________________________________',
              color: goldColor,
              bold: true,
            }),
          ],
        }),

        // Section 1: Executive Overview
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [
            new TextRun({
              text: '1. Executive Strategy: Why Google Business Profile is Essential for Rankur',
              bold: true,
              size: 28,
              color: darkColor,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 150 },
          children: [
            new TextRun({
              text: 'A Google Business Profile (GMB) is not merely for local brick-and-mortar storefronts; it is the primary physical and legal entity node in Google’s Knowledge Graph. By claiming, verifying, and heavily optimizing Rankur’s Google Business Profile, we accomplish three transformative SEO and authority objectives:',
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 50, after: 50 },
          children: [
            new TextRun({
              text: 'Entity Grounding: ',
              bold: true,
              color: goldColor,
            }),
            new TextRun({
              text: 'Google connects the online domain (https://rankursite.com), the MSME corporate registration (Moksh Productions), the founder entity (Moksh Parjapati), and physical contact data into a verified Knowledge Graph entity.',
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 50, after: 50 },
          children: [
            new TextRun({
              text: 'Bidirectional Backlink Anchor: ',
              bold: true,
              color: goldColor,
            }),
            new TextRun({
              text: 'A verified Google Maps listing generates one of the highest domain-authority backlinks available (authority passed directly from google.com/maps).',
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 50, after: 250 },
          children: [
            new TextRun({
              text: 'Cross-Domain Synergy with Live Clients: ',
              bold: true,
              color: goldColor,
            }),
            new TextRun({
              text: 'By publishing weekly GMB Posts and Product Catalog entries citing our 5 live production platforms (WizIOT, Atlanta Systems, Medventa, Probiota Innovations, Wafa Trust), we mirror and reinforce the live footer backlinks across the entire Google ecosystem.',
            }),
          ],
        }),

        // Section 2: Core Profile Data
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 },
          children: [
            new TextRun({
              text: '2. Core Google Business Profile Specifications (Copy & Paste Ready)',
              bold: true,
              size: 28,
              color: darkColor,
            }),
          ],
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            createRow('Business Name', 'Rankur - B2B Web Design & Growth Infrastructure'),
            createRow('Parent Organization', 'Moksh Productions (MSME-Registered Enterprise, India)'),
            createRow('Primary Category', 'Website Designer'),
            createRow(
              'Secondary Categories',
              '• Internet Marketing Service\n• Marketing Consultant\n• Software Company\n• E-Commerce Service\n• Business Management Consultant'
            ),
            createRow(
              'Business Description\n(Optimized for 750 Chars)',
              'Rankur is a founder-led B2B web design and growth consultancy operated by Moksh Parjapati under MSME-registered Moksh Productions. We build custom React & Next.js 16 web applications with sub-1.2s global load times, technical SEO, and Generative Engine Optimization (GEO) for founders across the US, UK, Australia, Canada, and GCC.\n\nWith over 2,280+ static pages actively deployed in production, Rankur is the architecture studio behind verified enterprise platforms including WizIOT (Fleet Telematics & IoT Hardware), Atlanta Systems (AIS-140 GPS Manufacturer), Medventa (B2B Surgical Supplies), and Probiota Innovations (US-FDA Probiotic CDMO). Backed by a 100% money-back guarantee.'
            ),
            createRow('Contact Phone', '+91 95600 76090'),
            createRow('Official Email', 'contactus@rankursite.com'),
            createRow('Website URL', 'https://rankursite.com?utm_source=gmb&utm_medium=organic&utm_campaign=gmb_listing'),
            createRow('Appointment / Audit URL', 'https://rankursite.com/free-audit?utm_source=gmb&utm_medium=organic&utm_campaign=gmb_audit'),
            createRow(
              'Service Areas\n(Domestic & Global)',
              '• Delhi NCR, Gurgaon, Noida, Bangalore, Mumbai, Hyderabad\n• International: United States, United Kingdom, Canada, Australia, UAE (Dubai/Abu Dhabi), Saudi Arabia (Riyadh)'
            ),
            createRow('Operating Hours', 'Monday – Saturday: 9:00 AM – 7:00 PM IST (Online Client Portal 24/7)'),
          ],
        }),

        // Section 3: GMB Products Catalog
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 150 },
          children: [
            new TextRun({
              text: '3. Google Business Products & Services Catalog Setup',
              bold: true,
              size: 28,
              color: darkColor,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 150 },
          children: [
            new TextRun({
              text: 'Add the following 4 core offerings to your GMB "Products" section. Each product links directly to Rankur’s corresponding service pages and features verified client proof points:',
            }),
          ],
        }),

        // Product 1
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: 'Product 01: Custom Next.js 16 B2B Web Infrastructure',
              bold: true,
              size: 24,
              color: goldColor,
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Category: ', bold: true }),
            new TextRun({ text: 'Web Design & Software Architecture' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Price: ', bold: true }),
            new TextRun({ text: 'Custom Quote / Tailored Sprint' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Landing Page URL: ', bold: true }),
            new TextRun({ text: 'https://rankursite.com/services' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Product Description: ', bold: true }),
            new TextRun({
              text: 'We design and code bespoke B2B web applications using React and Next.js 16 with sub-1.2s global speeds, PostgreSQL data layers, and Cloudflare enterprise edge networks. Over 2,280+ static pages deployed in production across enterprise telematics (WizIOT), automotive GPS (Atlanta Systems), and medical e-commerce (Medventa). Zero page builders, zero template bloat, 100% money-back guarantee.',
            }),
          ],
        }),

        // Product 2
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: 'Product 02: Generative Engine Optimization (GEO) & B2B SEO',
              bold: true,
              size: 24,
              color: goldColor,
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Category: ', bold: true }),
            new TextRun({ text: 'Search Engine Optimization (SEO)' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Price: ', bold: true }),
            new TextRun({ text: 'Monthly Retainer Integration' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Landing Page URL: ', bold: true }),
            new TextRun({ text: 'https://rankursite.com/services' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Product Description: ', bold: true }),
            new TextRun({
              text: 'We engineer your digital footprint to dominate traditional Google rankings and generative AI engines including ChatGPT, Perplexity, and Claude. Includes high-intent B2B keyword architecture, JSON-LD Schema.org Knowledge Graph deployment, and LLM citation optimization.',
            }),
          ],
        }),

        // Product 3
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: 'Product 03: B2B Conversion Rate Optimization (CRO) & Funnel Architecture',
              bold: true,
              size: 24,
              color: goldColor,
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Category: ', bold: true }),
            new TextRun({ text: 'Conversion Rate Optimization' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Price: ', bold: true }),
            new TextRun({ text: 'Custom Engagement' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Landing Page URL: ', bold: true }),
            new TextRun({ text: 'https://rankursite.com/services' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Product Description: ', bold: true }),
            new TextRun({
              text: 'We perform deep user-interaction audits and restructure lead-capture funnels. By streamlining inquiry pathways, qualifying enterprise RFQs, and wiring up custom GA4 tracking, we double form conversion rates without increasing marketing spend.',
            }),
          ],
        }),

        // Product 4
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: 'Product 04: Free Diagnostic B2B Website & Performance Audit',
              bold: true,
              size: 24,
              color: goldColor,
            }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Category: ', bold: true }),
            new TextRun({ text: 'Diagnostic Consulting' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Price: ', bold: true }),
            new TextRun({ text: 'Free ($0) · No Sales Pitch' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Landing Page URL: ', bold: true }),
            new TextRun({ text: 'https://rankursite.com/free-audit' }),
          ],
        }),
        new Paragraph({
          bullet: { level: 0 },
          children: [
            new TextRun({ text: 'Product Description: ', bold: true }),
            new TextRun({
              text: 'A complimentary teardown personally recorded by founder Moksh Parjapati. Reviews global load times, Core Web Vitals, Google & AI search presence, and lead drop-off points. Includes actionable recommendations to turn visitors into sales opportunities.',
            }),
          ],
        }),

        // Section 4: Weekly GMB Authority Posts
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 150 },
          children: [
            new TextRun({
              text: '4. High-Authority GMB Update Posts (Schedule & Copy)',
              bold: true,
              size: 28,
              color: darkColor,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 150 },
          children: [
            new TextRun({
              text: 'Publishing weekly GMB updates with outbound links creates an active crawling signal for Googlebot while directly demonstrating our verified client backlink authority:',
            }),
          ],
        }),

        // Post 1
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 150, after: 50 },
          children: [
            new TextRun({
              text: 'GMB Post 01: Client Deployment Showcase — WizIOT (1,040+ Static Pages)',
              bold: true,
              size: 22,
              color: darkColor,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'How does a global IoT fleet telematics provider present complex sensor protocols across EMEA and the GCC without losing site speed or crawl indexation?\n\nRankur engineered the complete Next.js 16 + Turbopack web architecture for WizIOT (wiziot.com), generating over 1,040+ static pages with a sub-0.9s global load time and 100% crawl accuracy.\n\nEvery platform we build is engineered for high-intent buyer acquisition and verified in production.\n\nInspect the live case study and verified production infrastructure:\nhttps://rankursite.com/case-studies\n\nCTA Button: Learn More (URL: https://rankursite.com/case-studies)',
              italics: true,
            }),
          ],
        }),

        // Post 2
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 50 },
          children: [
            new TextRun({
              text: 'GMB Post 02: Automotive Telematics Manufacturing — Atlanta Systems (460+ Pages)',
              bold: true,
              size: 22,
              color: darkColor,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'When commercial transport regulations mandate AIS-140 compliance, automotive manufacturers need rock-solid digital authority to convert government and fleet procurement committees.\n\nRankur designed and deployed 460+ high-performance static pages for Atlanta Systems (atlantasys.com) on Next.js 16, capturing high-volume RFQs with zero maintenance debt.\n\nSee how custom React & Next.js architectures outperform legacy websites:\nhttps://rankursite.com/case-studies\n\nCTA Button: Learn More (URL: https://rankursite.com/case-studies)',
              italics: true,
            }),
          ],
        }),

        // Post 3
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 50 },
          children: [
            new TextRun({
              text: 'GMB Post 03: Headless Medical Procurement — Medventa (440+ SKUs)',
              bold: true,
              size: 22,
              color: darkColor,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Hospital purchase committees do not have time for slow e-commerce catalogs. For Medventa (medventa.in), Rankur built a headless Next.js 14 medical commerce platform spanning 440+ surgical suture and healthcare supply SKUs with sub-second catalog search and bulk RFQ automation.\n\nNeed a high-converting digital platform for complex B2B products?\n\nRequest a free website & conversion audit today:\nhttps://rankursite.com/free-audit\n\nCTA Button: Book (URL: https://rankursite.com/free-audit)',
              italics: true,
            }),
          ],
        }),

        // Section 5: Pre-Seeded Q&A
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 150 },
          children: [
            new TextRun({
              text: '5. Google Business Pre-Seeded Q&A Section (Entity Reinforcement)',
              bold: true,
              size: 28,
              color: darkColor,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 150 },
          children: [
            new TextRun({
              text: 'In GMB, anyone can ask and answer questions. By pre-populating your profile with strategic FAQ pairs, you provide instant answers to prospective clients while feeding Google high-intent semantic keywords:',
            }),
          ],
        }),

        // Q1
        new Paragraph({
          children: [
            new TextRun({ text: 'Q: What kind of websites does Rankur build for B2B companies?', bold: true }),
          ],
        }),
        new Paragraph({
          spacing: { before: 50, after: 150 },
          children: [
            new TextRun({
              text: 'A: We design and engineer custom, high-speed B2B websites using React and Next.js 16. We do not use slow templates or bloated page builders. Every platform is built from scratch to load in under 1.2 seconds globally and rank for high-intent buying searches on both Google and AI search engines (Perplexity, ChatGPT).',
            }),
          ],
        }),

        // Q2
        new Paragraph({
          children: [
            new TextRun({ text: 'Q: What live client platforms has Rankur built?', bold: true }),
          ],
        }),
        new Paragraph({
          spacing: { before: 50, after: 150 },
          children: [
            new TextRun({
              text: 'A: Over 2,280+ static pages are actively in production across verified clients including WizIOT (fleet telematics, 1,040+ pages), Atlanta Systems (AIS-140 GPS manufacturer, 460+ pages), Medventa (medical supplies, 440+ pages), Probiota Innovations (nutraceutical CDMO, 340+ pages), and Wafa Trust. Each platform features a verified site-wide footer backlink confirming Rankur\'s architecture.',
            }),
          ],
        }),

        // Q3
        new Paragraph({
          children: [
            new TextRun({ text: 'Q: How fast can Rankur launch a custom B2B website?', bold: true }),
          ],
        }),
        new Paragraph({
          spacing: { before: 50, after: 150 },
          children: [
            new TextRun({
              text: 'A: Most custom builds go live within a focused 7 to 14-day sprint. Every engagement is personally led by founder Moksh Parjapati with zero junior account handoffs and is backed by a 100% money-back guarantee.',
            }),
          ],
        }),

        // Q4
        new Paragraph({
          children: [
            new TextRun({ text: 'Q: Do you work with international clients outside India?', bold: true }),
          ],
        }),
        new Paragraph({
          spacing: { before: 50, after: 150 },
          children: [
            new TextRun({
              text: 'A: Yes. A substantial portion of our client engagements are across the United States, United Kingdom, Canada, Australia, and the Gulf (UAE, Saudi Arabia, Qatar). We configure international SEO (hreflang, edge CDN routing) tailored to overseas buyers.',
            }),
          ],
        }),

        // Section 6: Client Review Generation Strategy
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 150 },
          children: [
            new TextRun({
              text: '6. Client Review Acquisition System & Outreach Scripts',
              bold: true,
              size: 28,
              color: darkColor,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 150 },
          children: [
            new TextRun({
              text: 'Google Reviews containing relevant keywords (*"Next.js"*, *"B2B leads"*, *"web speed"*, *"SEO"*) dramatically boost your map ranking and domain authority. Use the following outreach message to request 5-star reviews from verified partners and clients:',
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 150, after: 50 },
          children: [
            new TextRun({
              text: 'Client Review Outreach Message (WhatsApp / Email):',
              bold: true,
              size: 22,
              color: goldColor,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: '"Hi [Client Name],\n\nHope all is well with you and the team! As we continue scaling Rankur and helping B2B founders build high-performance web infrastructure, Google Business reviews from verified partners like [Client Company] make a huge difference.\n\nCould you take 60 seconds to share your experience regarding our build speed, Next.js architecture, and lead generation setup?\n\nDirect review link: [Insert Your GMB Shortlink Here]\n\nThank you so much for your partnership!\n— Moksh Parjapati | Rankur"',
              italics: true,
            }),
          ],
        }),

        // Section 7: NAP Local Citation Directory Checklist
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 150 },
          children: [
            new TextRun({
              text: '7. 15-Platform NAP Consistency & Backlink Citation Checklist',
              bold: true,
              size: 28,
              color: darkColor,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 0, after: 150 },
          children: [
            new TextRun({
              text: 'To ensure Google’s algorithm verifies Rankur’s address and phone number with 100% confidence, submit this exact NAP profile across the following 15 high-authority directories:',
            }),
          ],
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createHeaderCell('Platform Name', 30),
                createHeaderCell('Category / Focus', 35),
                createHeaderCell('Authority Value', 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('Google Business Profile (GMB)', true, 30),
                createDataCell('Primary Search & Maps Entity', false, 35),
                createDataCell('Foundational Tier 1 (Google Knowledge Graph)', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('Bing Places for Business', true, 30),
                createDataCell('Microsoft & Copilot Local Search', false, 35),
                createDataCell('Direct feed for Windows & Bing users', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('Apple Business Connect / Maps', true, 30),
                createDataCell('iOS & Siri Map Entity', false, 35),
                createDataCell('Authority anchor for iPhone & Mac ecosystem', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('Crunchbase', true, 30),
                createDataCell('Corporate / Venture Ecosystem', false, 35),
                createDataCell('Live Rankur profile established (DA 91)', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('Clutch.co', true, 30),
                createDataCell('B2B Development & Design Directory', false, 35),
                createDataCell('High-intent buyer referral traffic (DA 89)', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('DesignRush', true, 30),
                createDataCell('Web Design Agency Showcase', false, 35),
                createDataCell('Direct B2B agency backlink citation', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('GoodFirms', true, 30),
                createDataCell('Software & Web Engineering Reviews', false, 35),
                createDataCell('Strong corporate review indexation (DA 86)', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('LinkedIn Company Page', true, 30),
                createDataCell('Professional Corporate Profile', false, 35),
                createDataCell('Core B2B executive social proof', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('Trustpilot', true, 30),
                createDataCell('Public Review Verification', false, 35),
                createDataCell('Starred rich snippet trigger in SERPs', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('IndiaMART', true, 30),
                createDataCell('B2B Enterprise Supplier Portal', false, 35),
                createDataCell('High domestic commercial domain authority', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('Justdial Business', true, 30),
                createDataCell('Local Service Indexation', false, 35),
                createDataCell('Immediate geo-localized NAP signal', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('ZoomInfo / Apollo.io', true, 30),
                createDataCell('B2B Enterprise Firmographic Database', false, 35),
                createDataCell('Enterprise procurement vendor verification', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('GitHub Organization', true, 30),
                createDataCell('Engineering & Developer Authority', false, 35),
                createDataCell('Demonstrates genuine software capability', false, 35),
              ],
            }),
            new TableRow({
              children: [
                createDataCell('Medium Brand Publication', true, 30),
                createDataCell('Content Authority & Thought Leadership', false, 35),
                createDataCell('Syndication backlink to rankursite.com', false, 35),
              ],
            }),
          ],
        }),

        // Closing Note
        new Paragraph({
          spacing: { before: 400, after: 100 },
          children: [
            new TextRun({
              text: 'Execution Priority:',
              bold: true,
              color: goldColor,
            }),
            new TextRun({
              text: ' Complete GMB verification using the exact NAP above. Within 7 days of verification, publish all 4 Products and the first 2 Client Showcase Updates to immediately seed Google with our live backlink infrastructure.',
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated GMB Blueprint Word Document at: ${outputPath}`);
});
