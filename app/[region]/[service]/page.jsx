import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

import { cityData } from '../../../src/data/cityData.jsx';
import servicesData from '../../../src/data/servicesData.json';
import NichePage from '../../../src/views/NichePage';

export const dynamicParams = false;

export async function generateStaticParams() {
  const citySlugs = Object.keys(cityData);
  const params = [];

  for (const cSlug of citySlugs) {
    for (const sItem of servicesData) {
      params.push({
        region: cSlug,
        service: sItem.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const regionSlug = resolvedParams.region;
  const serviceSlug = resolvedParams.service;

  const regionInfo = cityData[regionSlug];
  const serviceInfo = servicesData.find(s => s.slug === serviceSlug);

  if (!regionInfo || !serviceInfo) return {};

  const cityName = regionInfo.props.niche.replace(' B2B', '');
  const canonicalUrl = `https://rankursite.com/${regionSlug}/${serviceSlug}`;
  const seoTitle = `${serviceInfo.shortName} in ${cityName} | Rankur`;
  const seoDesc = `Custom ${serviceInfo.shortName} for B2B companies in ${cityName}. Engineered on high-speed Next.js Edge architecture with a 100% money-back guarantee.`;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const regionSlug = resolvedParams.region;
  const serviceSlug = resolvedParams.service;

  const regionInfo = cityData[regionSlug];
  const serviceInfo = servicesData.find(s => s.slug === serviceSlug);

  if (!regionInfo || !serviceInfo) notFound();

  const cityName = regionInfo.props.niche.replace(' B2B', '');

  // Customized Matrix Props
  const matrixProps = {
    ...regionInfo.props,
    seoTitle: `${serviceInfo.shortName} in ${cityName} | Rankur`,
    seoDesc: `Custom ${serviceInfo.shortName} for B2B companies in ${cityName}. Engineered on high-speed Next.js Edge architecture with a 100% money-back guarantee.`,
    niche: `${cityName} ${serviceInfo.shortName}`,
    heroTitle: (
      <>
        {serviceInfo.shortName} in <span className="text-gold">{cityName}</span>
      </>
    ),
    heroSubtitle: `Looking for high-impact ${serviceInfo.shortName.toLowerCase()} in ${cityName}? ${serviceInfo.headline}. Built on sub-500ms Next.js Edge infrastructure with a 100% money-back guarantee.`,
    problemText: [
      `B2B companies in ${cityName} competing in ${serviceInfo.shortName.toLowerCase()} face intense regional competition. Standard template sites fail to turn local visitors into sales calls.`,
      `With our specialized ${serviceInfo.name} infrastructure, we eliminate conversion friction, optimize mobile page speeds to under 1 second, and target high-intent commercial buyers.`,
      `Every deployment is backed by our 100% money-back guarantee: if your new system doesn't go live in ~7 days or fails to meet your performance benchmarks, you don't pay a single dollar.`
    ],
    solutions: serviceInfo.deliverables.map((deliv, idx) => ({
      icon: serviceInfo.icon,
      title: deliv,
      desc: `Specialized ${serviceInfo.shortName.toLowerCase()} implementation engineered specifically for B2B founders and enterprise teams in ${cityName}.`
    })),
  };

  return <NichePage {...matrixProps} />;
}
