import React from 'react';
import './Testimonials.css';

const verifiedTestimonials = [
  {
    quote: "Rankur engineered our Next.js 16 platform to handle 1,040+ static pages with sub-second speeds across Africa, GCC, and Europe. Our global fleet enterprise buyers and channel partners immediately noticed the difference in performance, indexing, and technical clarity.",
    name: "Engineering & Technical Leadership",
    title: "WizIOT Fleet Telematics & IoT Hardware",
    initials: "WZ",
    company: "WizIOT",
    domain: "https://www.wiziot.com",
    metrics: "1,040+ Static Pages · Next.js 16 + Turbopack",
  },
  {
    quote: "Building 460+ high-performance static pages with Next.js gave us instant 100% crawl indexation on AIS-140 certified GPS hardware terms. Rankur's technical SEO and conversion architecture streamlined our incoming enterprise RFQ pipeline and wholesale distributor inquiries.",
    name: "Operations & Commercial Head",
    title: "Atlanta Systems - AIS-140 GPS Manufacturer",
    initials: "AS",
    company: "Atlanta Systems",
    domain: "https://www.atlantasys.com",
    metrics: "460+ Static Pages · Automotive Telematics",
  },
  {
    quote: "Our headless Next.js 14 medical catalog spans 440+ static product and suture SKUs with zero lag. Hospital procurement teams and wholesale healthcare buyers can instantly review clinical specifications and submit bulk RFQs without friction.",
    name: "Procurement & B2B Growth Lead",
    title: "Medventa Surgical Solutions",
    initials: "MV",
    company: "Medventa",
    domain: "https://www.medventa.in",
    metrics: "440+ Static Pages · B2B Medical Commerce",
  },
  {
    quote: "Rankur delivered our complete 340+ page custom Next.js web application with unmatched speed. Within 10 days of launch, we received our first international wholesale inquiries, scaling to 50+ qualified B2B opportunities in month one across overseas distributor networks.",
    name: "Anshika Narula",
    title: "Founder, Probiota Innovations",
    initials: "AN",
    company: "Probiota Innovations",
    domain: "https://www.probiotainnovations.com",
    metrics: "340+ Static Pages · US-FDA Registered CDMO",
  },
  {
    quote: "Rankur structured a modern, highly accessible web platform that gives our healthcare, education, and community development initiatives the trust and transparency our international donors expect. Mobile performance and reliability are exceptional.",
    name: "Executive Leadership",
    title: "Wafa Educational & Charitable Trust",
    initials: "WT",
    company: "Wafa Trust",
    domain: "https://wafatrust.org",
    metrics: "Philanthropic Healthcare & Education NGO",
  },
];

export default function Testimonials({
  title = "Trusted by B2B Leaders",
  subtitle = "Direct feedback from executives whose production platforms were designed, built, and optimized by Rankur."
}) {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <p className="section-label">Executive Feedback</p>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="testimonials__grid">
          {verifiedTestimonials.map((item, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-card__rating">
                {[...Array(5)].map((_, starIndex) => (
                  <span key={starIndex}>★</span>
                ))}
              </div>

              <p className="testimonial-card__quote">{item.quote}</p>

              <div className="testimonial-card__footer">
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{item.initials}</div>
                  <div className="testimonial-card__info">
                    <span className="testimonial-card__name">{item.name}</span>
                    <span className="testimonial-card__title">{item.title}</span>
                  </div>
                </div>

                <a
                  href={item.domain}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="testimonial-card__verified-link"
                  title={`Verify live production site: ${item.domain}`}
                >
                  <span className="testimonial-card__verified-tag">
                    <span className="testimonial-card__verified-dot"></span>
                    Verified Live Client · {item.company}
                  </span>
                  <span>Verify Backlink ↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
