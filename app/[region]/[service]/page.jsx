import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

import { cityData } from '../../../src/data/cityData.jsx';
import { countryData } from '../../../src/data/countryData.jsx';
import servicesData from '../../../src/data/servicesData.json';
import NichePage from '../../../src/views/NichePage';

const allRegions = { ...cityData, ...countryData };

export const dynamicParams = true;

function resolveRegionData(slug) {
  if (allRegions[slug]) return { key: slug, data: allRegions[slug] };

  const suffixes = ['-us', '-uk', '-canada', '-australia', '-uae', '-saudi-arabia'];
  for (const suf of suffixes) {
    if (allRegions[`${slug}${suf}`]) {
      return { key: `${slug}${suf}`, data: allRegions[`${slug}${suf}`] };
    }
  }

  return null;
}

const coreSubpageTitles = {
  'services': 'B2B Growth Services',
  'blog': 'Growth Knowledge Base & Founder Guides',
  'about': 'About Rankur B2B Infrastructure',
  'process': 'Audit, Build & Growth Process',
  'certifications': 'Technical Certifications & Performance Standards',
  'contact': 'Initiate Executive Consultation',
  'case-studies': 'Verified Enterprise B2B Case Studies',
  'philosophy': 'Commercial B2B Growth Beliefs & Philosophy',
  'free-audit': 'Claim Free 30-Minute Technical & Pipeline Audit',
  'saas-websites': 'High-Speed B2B SaaS Website Engineering',
};

export async function generateStaticParams() {
  const citySlugs = Object.keys(cityData);
  const coreSubpages = Object.keys(coreSubpageTitles);
  const params = [];

  for (const cSlug of citySlugs) {
    // Matrix services
    for (const sItem of servicesData) {
      params.push({
        region: cSlug,
        service: sItem.slug,
      });
    }
    // Core subpages
    for (const sub of coreSubpages) {
      params.push({
        region: cSlug,
        service: sub,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const regionMatch = resolveRegionData(resolvedParams.region);
  if (!regionMatch) return {};

  const { key, data: regionInfo } = regionMatch;
  const serviceSlug = resolvedParams.service;

  const cityName = regionInfo.props.niche.replace(' B2B', '');
  const canonicalUrl = `https://rankursite.com/${key}/${serviceSlug}`;

  const matrixService = servicesData.find(s => s.slug === serviceSlug);
  const coreTitle = coreSubpageTitles[serviceSlug];

  if (matrixService) {
    const seoTitle = `${matrixService.shortName} in ${cityName} | Rankur`;
    const seoDesc = `Custom ${matrixService.shortName} for B2B companies in ${cityName}. Engineered on high-speed Next.js Edge architecture with a 100% money-back guarantee.`;
    return {
      title: seoTitle,
      description: seoDesc,
      alternates: { canonical: canonicalUrl },
    };
  }

  if (coreTitle) {
    const seoTitle = `${coreTitle} in ${cityName} | Rankur`;
    const seoDesc = `Custom ${coreTitle} tailored for B2B founders and executive teams in ${cityName}. Backed by our 100% risk-free money-back guarantee.`;
    return {
      title: seoTitle,
      description: seoDesc,
      alternates: { canonical: canonicalUrl },
    };
  }

  return {};
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const regionMatch = resolveRegionData(resolvedParams.region);
  if (!regionMatch) notFound();

  const { key, data: regionInfo } = regionMatch;
  const serviceSlug = resolvedParams.service;
  const cityName = regionInfo.props.niche.replace(' B2B', '');

  const matrixService = servicesData.find(s => s.slug === serviceSlug);
  const coreTitle = coreSubpageTitles[serviceSlug];

  if (!matrixService && !coreTitle) {
    notFound();
  }

  // Handle Matrix Services (e.g. /austin/b2b-web-design)
  if (matrixService) {
    const matrixProps = {
      ...regionInfo.props,
      seoTitle: `${matrixService.shortName} in ${cityName} | Rankur`,
      seoDesc: `Custom ${matrixService.shortName} for B2B companies in ${cityName}. Engineered on high-speed Next.js Edge architecture with a 100% money-back guarantee.`,
      niche: `${cityName} ${matrixService.shortName}`,
      heroTitle: (
        <>
          {matrixService.shortName} in <span className="text-gold">{cityName}</span>
        </>
      ),
      heroSubtitle: `Looking for high-impact ${matrixService.shortName.toLowerCase()} in ${cityName}? ${matrixService.headline}. Built on sub-500ms Next.js Edge infrastructure with a 100% money-back guarantee.`,
      problemText: [
        `B2B companies in ${cityName} competing in ${matrixService.shortName.toLowerCase()} face intense regional competition. Standard template sites fail to turn local visitors into sales calls.`,
        `With our specialized ${matrixService.name} infrastructure, we eliminate conversion friction, optimize mobile page speeds to under 1 second, and target high-intent commercial buyers.`,
        `Every deployment is backed by our 100% money-back guarantee: if your new system doesn't go live in ~7 days or fails to meet your performance benchmarks, you don't pay a single dollar.`
      ],
      solutions: matrixService.deliverables.map((deliv) => ({
        icon: matrixService.icon,
        title: deliv,
        desc: `Specialized ${matrixService.shortName.toLowerCase()} implementation engineered specifically for B2B founders and enterprise teams in ${cityName}.`
      })),
    };
    return <NichePage {...matrixProps} />;
  }

  // Handle Core Subpages (e.g. /austin/services, /milan/about, /charlotte/blog, /columbus/process, /durban/certifications, /brussels/contact, /brisbane/case-studies)
  const coreProps = {
    ...regionInfo.props,
    seoTitle: `${coreTitle} in ${cityName} | Rankur`,
    seoDesc: `Custom ${coreTitle} tailored for B2B founders and executive teams in ${cityName}. Backed by our 100% risk-free money-back guarantee.`,
    niche: `${cityName} ${coreTitle}`,
    heroTitle: (
      <>
        {coreTitle} in <span className="text-gold">{cityName}</span>
      </>
    ),
    heroSubtitle: `Explore specialized B2B growth infrastructure, technical web design, and conversion systems built for enterprise leaders in ${cityName}. Backed by a 100% money-back guarantee.`,
  };

  return <NichePage {...coreProps} />;
}
