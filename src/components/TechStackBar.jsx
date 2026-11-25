"use client";

import React from 'react';
import './TechStackBar.css';

const TECH_ECOSYSTEM = [
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Edge Framework',
    renderIcon: () => (
      <svg width="28" height="28" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="90" fill="#000" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M149.508 157.438L69.1438 54H54V125.975H66.6713V69.9575L139.736 164.71C143.155 162.532 146.425 160.098 149.508 157.438Z" fill="url(#next_paint0)" />
        <rect x="115.328" y="54" width="12.6712" height="71.975" fill="url(#next_paint1)" />
        <defs>
          <linearGradient id="next_paint0" x1="109.5" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="next_paint1" x1="121.664" y1="54" x2="121.664" y2="104.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React',
    category: 'Component Architecture',
    renderIcon: () => (
      <svg width="30" height="30" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Type-Safe Engineering',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" rx="40" fill="#3178C6" />
        <path d="M150.96 160.33c4.86 8.35 12.33 13.91 22.39 13.91 10.26 0 16.73-5.22 16.73-12.7 0-9.22-7.83-12.7-20.88-18.44-16.7-7.3-27.49-16.88-27.49-33.4 0-16.53 13.05-28.71 33.4-28.71 14.79 0 25.4 6.44 32.54 18.96l-13.74 8.7c-4.18-7.66-9.74-10.96-18.8-10.96-9.05 0-14.79 4.87-14.79 11.48 0 7.83 6.09 11.31 18.96 16.88 18.1 7.83 29.58 16.7 29.58 35.14 0 19.31-14.96 30.62-36.01 30.62-19.14 0-32.01-8.7-38.62-22.97l16.73-8.51zm-75.16-56.55h-32.9V86h83.85v17.78h-32.9v103.51h-18.05V103.78z" fill="#FFF" />
      </svg>
    ),
  },
  {
    id: 'ga4',
    name: 'Google Analytics 4',
    category: 'Verified Telemetry',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 18.5a3.5 3.5 0 0 1-7 0V5.5a3.5 3.5 0 0 1 7 0v13z" fill="#F9AB00" />
        <path d="M15 18.5a3.5 3.5 0 0 1-7 0v-6a3.5 3.5 0 0 1 7 0v6z" fill="#E37400" />
        <circle cx="4.5" cy="18.5" r="2.5" fill="#E37400" />
      </svg>
    ),
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'Inbound Certified',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.8 7.2V4.8C18.9 4.4 19.7 3.3 19.7 2c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 1.3.8 2.4 1.9 2.8v2.4c-1.4.3-2.6 1.1-3.3 2.2L6.8 6.1c.1-.4.2-.7.2-1.1 0-2.2-1.8-4-4-4S-1 2.8-1 5s1.8 4 4 4c.6 0 1.2-.1 1.7-.4l5.4 3.2c-.4.9-.7 1.8-.7 2.8 0 1.1.3 2.1.8 3l-2.6 2.6c-.4-.2-.8-.3-1.3-.3-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.5-.1-.9-.3-1.3l2.6-2.6c1.1.7 2.4 1.1 3.7 1.1 3.9 0 7-3.1 7-7 0-2.4-1.2-4.5-3-5.7zM16.7 20c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z" transform="translate(2, 2) scale(0.85)" fill="#FF7A59" />
      </svg>
    ),
  },
  {
    id: 'gsc',
    name: 'Search Console',
    category: 'Deterministic Indexing',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4285F4" />
      </svg>
    ),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Design Systems',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    id: 'vercel',
    name: 'Vercel Edge',
    category: 'Global Edge CDN',
    renderIcon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L24 22H0L12 1Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Enterprise Data',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" fill="#336791" />
      </svg>
    ),
  },
  {
    id: 'git',
    name: 'GitHub Repository',
    category: '100% IP Codebase Transfer',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#FFF" />
      </svg>
    ),
  },
  {
    id: 'jsonld',
    name: 'JSON-LD Schema',
    category: 'Knowledge Graph Integration',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="rgba(201, 168, 76, 0.12)" stroke="var(--color-gold)" strokeWidth="1.6" />
        <path d="M7 12h10M12 7v10" stroke="var(--color-gold)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="#06080b" stroke="var(--color-gold)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'cwv',
    name: 'Core Web Vitals',
    category: 'Web Performance Auditing',
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12a8 8 0 0 1 14.93-4" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function TechStackBar({
  title = "Production Infrastructure & Performance Standards",
  subtitle = "Custom Next.js platforms engineered with verified analytics telemetry, search indexing, and modern edge performance.",
}) {
  return (
    <section className="tech-stack-bar" id="tech-stack-bar">
      <div className="container">
        <div className="tech-stack-bar__header">
          <div className="tech-stack-bar__tag">
            <span className="tech-stack-bar__dot"></span>
            Production Tech Stack &amp; Infrastructure Standards
          </div>
          <h3 className="tech-stack-bar__title">{title}</h3>
          <p className="tech-stack-bar__subtitle">{subtitle}</p>
        </div>

        <div className="tech-stack-bar__grid">
          {TECH_ECOSYSTEM.map((tech) => (
            <div key={tech.id} className="tech-item-card">
              <div className="tech-item-card__icon-wrap">{tech.renderIcon()}</div>
              <span className="tech-item-card__label">{tech.name}</span>
              <span className="tech-item-card__sublabel">{tech.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
