#!/usr/bin/env python3
"""
Generate 100 High-Impact, Keyword-Optimized GMB / Profile Reviews.
Optimized for SEO, GEO, Next.js, Technical SEO, Speed, and International Reach
(including Finland, Mauritius, Europe, UK, US, UAE, and Global).

Zero em dashes (—) or en dashes (–).
"""

import csv
import os

REVIEWS = [
    # =========================================================================
    # BATCH 1: INTERNATIONAL & REMOTE (Finland, Mauritius, Europe, Global) - 20 Reviews
    # =========================================================================
    (
        "International / Europe & Nordics",
        "Helsinki, Finland",
        "Next.js Development & B2B SEO",
        "Next.js Development, B2B Technical SEO, Core Web Vitals",
        "We collaborated with Moksh and Rankur on a complete Next.js website overhaul for our European operations. His understanding of technical SEO and Core Web Vitals is top tier. Our site speed is lightning fast across the Nordics and our Google search visibility increased dramatically within weeks. Highly recommended for international web development!"
    ),
    (
        "International / Island & Tourism / Hub",
        "Port Louis, Mauritius",
        "Website Redesign & Local SEO",
        "Website Redesign, Local SEO, Mobile Speed",
        "Moksh helped revamp our business website and optimize our local Google search presence here in Mauritius. The website loads in under a second on mobile and our customer inquiries have doubled. Very professional, responsive across time zones, and extremely skilled developer."
    ),
    (
        "International / Europe & Nordics",
        "Espoo, Finland",
        "Modern Web Engineering & Speed",
        "Web Engineering, Next.js 16, Speed Optimization",
        "Moksh Parjapati is an outstanding web engineer. He migrated our web application to Next.js with clean modular code and zero bloat. The difference in page load speeds across Finland and Europe has been incredible. 5 stars for technical precision and clear communication."
    ),
    (
        "International / Africa & Indian Ocean",
        "Grand Baie, Mauritius",
        "SEO Strategy & E-commerce Catalog",
        "SEO Strategy, E-commerce Web Dev, Google Ranking",
        "Working with Moksh at Rankur was seamless. He restructured our online catalog and implemented technical SEO foundations that helped us rank on page 1 of Google for our key target terms. Always delivers on time and goes the extra mile."
    ),
    (
        "International / Europe & Nordics",
        "Tampere, Finland",
        "Technical SEO Audit & Google Search Console",
        "Technical SEO Audit, GSC Fixes, Organic Traffic",
        "Moksh resolved persistent Google Search Console indexing errors and canonical issues that were holding our site back. His technical SEO audit was crystal clear and his code fixes drove an immediate recovery in our organic search impressions. Fantastic partner."
    ),
    (
        "International / Africa & Indian Ocean",
        "Ebene Cybercity, Mauritius",
        "Custom B2B Website & Conversion Optimization",
        "Custom B2B Website, CRO, Lead Generation",
        "Moksh engineered a custom B2B web platform for our consulting firm in Ebene. His focus on fast page loads, responsive design, and conversion optimization delivered measurable results right from month one. Highly recommend Rankur to any growing business."
    ),
    (
        "International / Europe & UK",
        "London, United Kingdom",
        "Next.js Web Development & Search Authority",
        "Next.js Development, Search Authority, Clean Architecture",
        "Rankur delivered exceptional web development work for us. Moksh built a custom Next.js site that replaced our clunky legacy CMS. The clean code architecture and sub-second loading speeds gave us an immediate edge in competitive search rankings. True professional."
    ),
    (
        "International / Europe & Nordics",
        "Oulu, Finland",
        "Full Stack Development & Site Speed",
        "Full Stack Dev, Site Speed Optimization, React",
        "Super impressed with Moksh's technical depth. He tuned our web application until it achieved perfect green scores on Google PageSpeed Insights. If you need clean Next.js development and serious speed optimization, Moksh is the expert."
    ),
    (
        "International / Africa & Indian Ocean",
        "Curepipe, Mauritius",
        "Google Business Profile & SEO Setup",
        "GMB Optimization, Technical SEO, Fast Website",
        "Moksh helped us set up our website architecture and optimize our Google presence. Very friendly, honest, and easy to work with despite the distance. Inquiries through Google search and direct calls have been consistent ever since."
    ),
    (
        "International / Europe",
        "Amsterdam, Netherlands",
        "Core Web Vitals & GEO AI Search",
        "Core Web Vitals, GEO, AI Search Visibility, Schema",
        "Moksh Parjapati helped us implement structured JSON-LD entity schema and optimize our site for generative search engines. Our brand is now consistently cited in ChatGPT and Perplexity results, while our Core Web Vitals remain at 100/100. Brilliant execution."
    ),
    (
        "International / Europe",
        "Berlin, Germany",
        "Custom Next.js Web Application",
        "Next.js Development, Edge Caching, Web Engineering",
        "Flawless technical execution by Rankur. Moksh engineered our web platform with edge caching and server-side rendering, cutting latency across European traffic. His communication was proactive and milestones were hit without delays."
    ),
    (
        "International / Africa & Indian Ocean",
        "Flic en Flac, Mauritius",
        "Tourism & Hospitality Web Design",
        "Responsive Web Design, Fast Booking, SEO",
        "Moksh designed a sleek, high-speed website for our local hospitality business. Mobile bookings increased significantly because the pages load instantly without any friction. 5-star service from Rankur!"
    ),
    (
        "International / Europe & Nordics",
        "Vantaa, Finland",
        "B2B Technical SEO & Lead Funnels",
        "B2B Technical SEO, Lead Funnel, Conversion Optimization",
        "Moksh knows how B2B buyers search. He restructured our service pages and optimized on-page SEO targeting high-intent industrial queries. The quality of inbound leads has improved noticeably. Reliable and highly recommended."
    ),
    (
        "International / Middle East",
        "Dubai, United Arab Emirates",
        "Enterprise Web Engineering & SEO",
        "Enterprise Web Engineering, Technical SEO, High Speed",
        "Rankur built a world-class digital platform for our regional venture. Moksh ensured the website passes every speed benchmark globally. The full code handover via GitHub gave us complete confidence. Outstanding partner."
    ),
    (
        "International / Europe & Nordics",
        "Turku, Finland",
        "Next.js Frontend & UI Engineering",
        "Next.js Frontend, UI Engineering, Responsive Design",
        "Moksh took our designs and turned them into a blazing fast, fully responsive Next.js frontend. Smooth animations, zero hydration lag, and clean code. Great developer to collaborate with across borders."
    ),
    (
        "International / Africa & Indian Ocean",
        "Tamarin, Mauritius",
        "Service Business Web Revamp & SEO",
        "Website Revamp, SEO Setup, Mobile Optimization",
        "Working with Moksh Parjapati was effortless. He transformed our outdated website into a clean, modern showcase. Local search visibility and client inquiries have grown steadily. Highly satisfied."
    ),
    (
        "International / Europe",
        "Dublin, Ireland",
        "B2B SaaS Web Architecture & Schema",
        "B2B SaaS Web Dev, Schema Markup, Google Indexing",
        "Moksh helped us resolve deep technical SEO roadblocks on our SaaS marketing pages. His schema markup implementation and clean internal linking made indexing instant on Google Search Console. Excellent work."
    ),
    (
        "International / Europe & Nordics",
        "Jyvaskyla, Finland",
        "Speed Optimization & Clean Code",
        "Speed Optimization, Core Web Vitals, Clean Code",
        "Moksh reduced our mobile page load time from 4.8 seconds to 0.7 seconds. That single optimization cut our bounce rate in half. If your website is lagging, Moksh at Rankur is the developer you need to hire."
    ),
    (
        "International / Africa & Indian Ocean",
        "Quatre Bornes, Mauritius",
        "Local Business SEO & Lead Generation",
        "Local Business SEO, Lead Generation, Fast Web Dev",
        "Moksh provides genuine, high-quality web development and SEO. No confusing jargon or false claims, just solid results, fast loading pages, and consistent lead generation. 10/10 recommendation."
    ),
    (
        "International / Europe",
        "Stockholm, Sweden",
        "Modern Frontend Architecture & Speed",
        "Modern Frontend, Next.js, Technical SEO",
        "Moksh combines modern frontend engineering with rock-solid search optimization. The Next.js website he built for us is fast, accessible, and ranks prominently for our primary search terms. Top recommendation."
    ),

    # =========================================================================
    # BATCH 2: NEXT.JS & MODERN WEB ENGINEERING (High Technical Intent) - 20 Reviews
    # =========================================================================
    (
        "Next.js Engineering",
        "Global / Remote",
        "Custom Next.js 16 Web Engineering",
        "Next.js 16, React Server Components, Web Architecture",
        "Moksh built our entire web platform using custom Next.js 16 with React Server Components. The architecture is clean, maintainable, and completely free of heavy third-party dependencies. Our global LCP is under 0.8 seconds. Best web engineering decision we made."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "WordPress to Next.js Migration",
        "WordPress Migration, Next.js, Core Web Vitals",
        "We migrated from a bloated WordPress setup to custom Next.js with Rankur. Moksh handled the entire code migration without losing a single URL or ranking. Our mobile PageSpeed score went from 34 to 99. The site is ridiculously fast now."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Full GitHub Code Ownership",
        "100% Code Ownership, GitHub Handover, Clean Code",
        "What made working with Moksh and Rankur so refreshing was the 100% code ownership. He delivered a clean, fully documented GitHub repository with zero vendor lock-in. His engineering standards and communication are first class."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Dynamic Routing & Fast Rendering",
        "Dynamic Routing, Edge Caching, Server Actions",
        "Moksh implemented dynamic page generation and server actions that made our web application snappy and robust. Form submissions are instant and error-free. Highly skilled modern web developer."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Headless CMS & Next.js Integration",
        "Headless CMS, Next.js Integration, Fast Delivery",
        "Moksh integrated our content management system with a Next.js frontend seamlessly. Content publishes instantly and pages load in milliseconds. Very disciplined engineer with excellent problem-solving ability."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Modular Tailwind & Next.js Components",
        "Tailwind CSS, Next.js, Modular Architecture",
        "Moksh writes clean, modular Tailwind CSS components that are easy for any development team to build on. His attention to semantic HTML, accessibility, and performance is outstanding. 5 stars."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Vercel Edge Deployment & Performance",
        "Vercel Deployment, Edge Networks, Sub-second LCP",
        "Moksh configured our edge caching and asset pipelines on Vercel flawlessly. We now serve customers worldwide with sub-second response times. Moksh Parjapati is a true expert in modern web performance."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "API Integration & Zero Hydration Lag",
        "API Integration, Zero Hydration Lag, React",
        "Working directly with Moksh was great. He solved complex frontend hydration issues and optimized our API data fetching patterns. The entire web experience feels native and instantaneous."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Custom B2B Platform Development",
        "Custom B2B Platform, Next.js, Search Optimization",
        "Rankur built a tailor-made B2B platform that balances high visual aesthetics with hardcore technical performance. Moksh is dependable, communicates clearly, and takes full pride in his code."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Single Page App to Next.js SSR Migration",
        "Next.js SSR, Search Crawlability, React Migration",
        "Our previous single page React app was completely invisible to search engines. Moksh rebuilt it with Next.js server-side rendering, and Google indexed all our product pages within days. Outstanding work."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Mobile-First Responsive Web Design",
        "Mobile-First Design, Responsive Web Dev, Fast UX",
        "Moksh delivered a flawless mobile-first web experience. Layouts adapt perfectly across phones, tablets, and wide monitors with zero visual glitches. Great work by Rankur."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Enterprise Next.js Web Overhaul",
        "Enterprise Web Overhaul, Next.js, Performance",
        "Moksh tackled our website overhaul with total professional rigor. From initial architecture diagrams to final deployment, every milestone was executed with precision. Highly recommended."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Micro-Interactions & Fast UI",
        "Fast UI, Micro-Interactions, Zero Jitter",
        "Clean, modern, and buttery smooth. Moksh built an interface that has zero layout shift or visual jitter. Clients consistently comment on how professional our new site looks."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Security & Production Standards",
        "Production Standards, Clean Headers, Web Security",
        "Moksh configured our security headers, content security policies, and clean environment setups without cutting any corners. Production quality work from day one."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Frontend Replatforming & Speed",
        "Frontend Replatforming, Sub-second Speed, Next.js",
        "Replatforming to Next.js with Moksh was the smoothest development engagement we have had. On-time delivery, zero downtime during launch, and instant speed improvements."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Next.js Image & Font Optimization",
        "Next/Image Optimization, Font Subsetting, Web Vitals",
        "Moksh properly configured modern WebP image delivery and zero-layout-shift font subsetting. That solved our mobile performance issues once and for all. Brilliant engineer."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Clean Git Workflow & Documentation",
        "Git Workflow, Complete Documentation, Code Handover",
        "Every commit was clean, documented, and easy to review. Moksh walked our internal team through the code structure so we could manage updates independently. 100% recommended."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Scalable Web Architecture",
        "Scalable Architecture, Next.js, Technical SEO",
        "If you want to build a scalable digital foundation that will not crash under traffic spikes or fail search audits, hire Moksh Parjapati. Rankur delivers top quality work."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Conversion-Focused Web Engineering",
        "Conversion Architecture, Fast Forms, Next.js",
        "Moksh engineered our inquiry forms to submit directly through server actions with instant feedback. Form abandonments dropped noticeably. Excellent developer."
    ),
    (
        "Next.js Engineering",
        "Global / Remote",
        "Full Development Lifecycle Ownership",
        "Web Development Lifecycle, Technical SEO, Support",
        "Moksh took end-to-end ownership from design review to production release. Reliable, responsive, and technically exceptional. 5 stars for Rankur."
    ),

    # =========================================================================
    # BATCH 3: B2B TECHNICAL SEO & SEARCH ENGINE RANKINGS - 20 Reviews
    # =========================================================================
    (
        "Technical SEO",
        "Global / Remote",
        "B2B Keyword Intent & Page 1 Rankings",
        "B2B Keyword Intent, Page 1 Rankings, Organic Traffic",
        "Moksh Parjapati restructured our core commercial pages around high-intent B2B search terms. Within 60 days, our main service terms moved to page one of Google, bringing in qualified enterprise inquiries. Phenomenal SEO expertise."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Google Search Console Indexing Fixes",
        "GSC Indexing Fix, Crawl Budget, Canonical Tags",
        "We had hundreds of URLs stuck in 'crawled currently not indexed'. Moksh diagnosed the internal duplicate content issues, fixed canonical loops, and cleaned up our sitemaps. Google indexed our money pages within three weeks."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Topical Authority & Content Silos",
        "Topical Authority, Content Silos, Semantic SEO",
        "Rankur helped us build authoritative content clusters with strategic internal linking. Google recognized our domain as a topical authority in our industry, resulting in a 300% lift in organic impressions."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Enterprise Schema Markup & Knowledge Graph",
        "JSON-LD Schema, Organization Entity, Rich Snippets",
        "Moksh implemented comprehensive JSON-LD entity schema linking our brand, founder, and services into Google's Knowledge Graph. We earned rich snippet listings and improved our search brand authority."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Crawl Budget & Redirect Chain Cleanup",
        "Crawl Budget Optimization, Redirect Cleanup, SEO",
        "Moksh audited our 5,000+ page website, eliminated thin redirect chains, and optimized our crawl budget. Google now crawls our new product updates 4x faster than before. Top tier technical SEO."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Organic Lead Generation for B2B",
        "B2B Organic Leads, Technical SEO, High Intent",
        "Unlike agencies that chase vanity traffic, Moksh focused strictly on high-intent commercial keywords. The traffic we get now actually converts into scheduled sales calls. Couldn't be happier."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Sitemap & robots.txt Architecture",
        "Sitemap XML, robots.txt, Search Crawlability",
        "Moksh rebuilt our sitemap index cleanly into segmented feeds and resolved robots.txt blocking rules that were hurting our crawl health. Excellent attention to technical detail."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Semantic HTML & On-Page SEO",
        "Semantic HTML, Heading Hierarchy, On-Page SEO",
        "Moksh structures code with flawless semantic HTML: clean H1-H3 hierarchy, proper aria labels, and zero layout bloat. That is why Google ranks his client platforms so quickly."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Algorithm Update Recovery",
        "SEO Recovery, Core Update Recovery, Technical Fixes",
        "Our website lost significant traffic after a recent Google Core Update. Moksh audited our content depth and technical bottlenecks, removed thin pages, and restored our search traffic within two months. A true SEO strategist."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "International Hreflang & Multi-Geo Targeting",
        "Hreflang Configuration, International SEO, Geo Targeting",
        "Moksh configured our multi-region targeting and hreflang annotations across US, UK, and European markets without indexation conflicts. Flawless execution by Rankur."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "High-Converting Organic Landing Pages",
        "SEO Landing Pages, High Conversion, Search Intent",
        "Moksh designed and optimized landing pages that align perfectly with search intent. Visitors find exactly what they are looking for and conversion rates jumped across all organic channels."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Local & Regional SEO Growth",
        "Local SEO, Google Business Profile, Local Map Pack",
        "Moksh optimized our Google Business listing and on-page location signals. We now show up consistently in the local 3-pack for commercial service queries. Tremendous boost to our business."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Zero-Waste Technical SEO Audits",
        "SEO Audit, Actionable Roadmap, Technical Fixes",
        "Moksh gave us an audit with zero fluff. Every recommendation had clear code snippets and immediate business impact. He implemented the fixes directly, saving us weeks of back-and-forth."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "E-Commerce Catalog Indexation",
        "E-Commerce SEO, Product Schema, Fast Filtering",
        "Our e-commerce product pages were failing to index properly on Google. Moksh restructured our faceted navigation and added product schema. Inbound organic orders doubled."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "404 Error Elimination & Clean 301 Redirects",
        "301 Redirects, 404 Cleanup, Link Equity Preservation",
        "Moksh mapped hundreds of old broken URLs to relevant live pages, preserving our hard-earned domain authority and eliminating 404 crawl errors. Thorough and meticulous work."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "B2B SaaS Technical SEO Strategy",
        "SaaS SEO, Feature Pages, Commercial Search",
        "Moksh understands SaaS search mechanics better than most big agencies. He helped position our software features right where IT decision makers search. High ROI engagement."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Internal Link Automation & Breadcrumbs",
        "Internal Linking, Breadcrumb Schema, Crawl Flow",
        "Rankur built automated internal linking clusters and breadcrumb schemas that helped Google bot discover deep pages effortlessly. Measurable rank increases across our entire site."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Search Intent Mapping & Low Bounce Rates",
        "Search Intent, High Dwell Time, Technical SEO",
        "By aligning page content directly with search intent, Moksh cut our bounce rates and increased session duration. Google rewarded us with higher rankings across all target terms."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Long-Tail Keyword Domination",
        "Long-Tail SEO, Commercial Keywords, Inbound Inquiries",
        "Moksh identified high-value, low-competition commercial search phrases that started generating direct phone and form inquiries within weeks. Highly strategic SEO execution."
    ),
    (
        "Technical SEO",
        "Global / Remote",
        "Transparent Reporting & Honest Guidance",
        "Transparent SEO, Ethical White-Hat, Measurable Growth",
        "Moksh Parjapati is transparent, ethical, and delivers real measurable search growth. No black-hat shortcuts, just rock-solid engineering and sound SEO foundations. 5/5 stars."
    ),

    # =========================================================================
    # BATCH 4: SPEED, CORE WEB VITALS & GEO AI CITATION (20 Reviews)
    # =========================================================================
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Perplexity & ChatGPT AI Citations",
        "GEO Optimization, AI Search Citations, Entity Graphs",
        "Rankur helped us optimize our digital entity for AI search engines. Moksh restructured our content with factual schema markup and direct answer tables. Our brand is now frequently cited in Perplexity and ChatGPT AI overviews. Cutting-edge work."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Largest Contentful Paint Under 0.8s",
        "LCP <0.8s, Core Web Vitals, Mobile Optimization",
        "Our mobile LCP was clocking in at 4.2 seconds, killing our search rankings. Moksh restructured our asset loading and eliminated render blocking JavaScript. Our LCP is now 0.68s globally and we pass Core Web Vitals with flying colors."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Zero Cumulative Layout Shift (CLS)",
        "Zero CLS, Stable Layouts, Core Web Vitals",
        "Moksh fixed all layout shifts by reserving dimensions for images and dynamic blocks. Browsing our site is completely stable without any annoying page jumps. Fantastic UX improvement."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "100/100 Google PageSpeed Score",
        "100 PageSpeed, Lighthouse Green, Fast Next.js",
        "Moksh achieved what three previous agencies said was impossible: a genuine 99-100 PageSpeed score on mobile without disabling analytics or core tracking scripts. Brilliant performance engineering."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Interaction to Next Paint (INP) Optimization",
        "INP Optimization, Fast Main Thread, Responsive UI",
        "Our button clicks and form taps used to feel sluggish on mobile. Moksh optimized the main thread execution and streamlined our React state updates. Everything reacts instantaneously now."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Generative Search Engine Authority",
        "GEO Authority, AI Overviews, Structured Data",
        "Moksh knows how search is evolving with generative AI models. He structured our key service data into clear entity definitions that AI models read and cite accurately. Game changing service."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Asset Compression & Modern Formats",
        "WebP/AVIF Compression, Font Subsetting, Speed",
        "Moksh automated image conversion to modern WebP and AVIF formats, reducing page weight from 8MB down to 450KB. Our mobile bandwidth usage dropped and pages load in the blink of an eye."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Elimination of Third-Party Script Bloat",
        "Script Optimization, Tag Manager Cleanup, Speed",
        "Moksh audited our tag manager, deferred non-critical tracking scripts, and self-hosted fonts. That removed 2.5 seconds of render delay from our pages. Unbelievable difference."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Edge CDN Caching & Global Speed",
        "Edge Caching, CDN Setup, Global Low Latency",
        "Whether visitors load our site from Europe, Asia, or the US, the response time is uniform and blazing fast. Moksh configured our global edge network perfectly."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Mobile Bounce Rate Reduction",
        "Bounce Rate Slashed, Instant Load, Better UX",
        "Our mobile bounce rate dropped from 58% to 29% within two weeks of launching the site Moksh built. When pages load instantly, users stick around and convert. The numbers speak for themselves."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Knowledge Graph Integration",
        "Knowledge Graph, Organization Schema, Brand Entity",
        "Moksh connected our social profiles, business registrations, and service catalog into a connected Knowledge Graph schema. Google immediately recognized our brand identity in search results."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Instant Form Submissions & CRO",
        "Instant Forms, Zero Delay, Conversion Optimization",
        "Moksh optimized our form validation and removed external script bottlenecks. Lead submissions go straight through without timeout errors. Inbound leads are up 35%."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Speed Optimization for B2B RFQs",
        "Fast RFQ Inquiries, High Performance, B2B Site",
        "Procurement managers have zero patience for slow industrial websites. Moksh built an ultra-fast catalog that lets buyers review specifications and submit RFQs effortlessly."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Next.js Turbopack & Clean Builds",
        "Modern Build Pipeline, Zero Bloat, Fast Dev",
        "Moksh sets up modern, reproducible build pipelines with zero legacy baggage. His engineering craft is apparent in every line of code. 5 stars."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Server-Side Rendering Speed",
        "SSR Speed, Edge Functions, Instant HTML",
        "Moksh configured server-side rendering with edge caching so search engines and users receive pre-rendered HTML in under 200ms. Outstanding technical execution."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "AI Search Ranking & Citations",
        "AI Search Ranking, Perplexity Citations, GEO",
        "Rankur is ahead of the curve when it comes to AI search visibility. Moksh showed us exactly how to format data so LLMs reference our business accurately. Highly valuable."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Zero Layout Shift Font Loading",
        "Font Optimization, Zero FOIT/FOUT, CWV",
        "Moksh eliminated annoying font flashing and layout shifts using self-hosted variable fonts and CSS size-adjust rules. Small technical detail that makes a massive difference."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Core Web Vitals Passing Status",
        "Core Web Vitals Pass, Google Search Console, Green",
        "Every single page in our Google Search Console is now marked 'Good' for Core Web Vitals. Our rankings and search impressions started climbing immediately after. Excellent work by Moksh."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "High-Traffic Stress Performance",
        "Stress Tested Speed, High Concurrency, Fast Next.js",
        "During a major campaign surge, our website experienced 10x normal traffic and didn't slow down for a second. Moksh built an architecture that is truly battle-tested."
    ),
    (
        "Speed & GEO Citations",
        "Global / Remote",
        "Technical Speed Audit & Immediate Delivery",
        "Rapid Delivery, Measurable Speed, Top Dev",
        "Moksh audited our performance bottlenecks and had all fixes deployed within 48 hours. Fast, communicative, and technically brilliant. 5 stars for Rankur."
    ),

    # =========================================================================
    # BATCH 5: FULL WEBSITE OVERHAUL, BUSINESS GROWTH & REPUTATION (20 Reviews)
    # =========================================================================
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Complete Brand & Website Redesign",
        "Website Redesign, Modern Branding, Next.js Development",
        "Moksh gave our brand a modern, world-class digital presence. The new design looks sleek, commands trust, and loads instantly. Our clients and industry partners have all complimented the new site. Moksh Parjapati is an exceptional talent."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "High ROI Web Development",
        "High ROI, Transparent Pricing, B2B Web Dev",
        "Working with Rankur provided the highest return on investment of any digital vendor we have engaged. No inflated agency markups, no hidden retainers, just pure technical quality and measurable results."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Direct Communication with Moksh",
        "Direct Communication, Zero Agency Overhead, Rapid Sprints",
        "The best part about working with Rankur is working directly with Moksh. There are no inexperienced account managers in between. Every requirement is understood and coded accurately on the first pass."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "B2B Conversion Rate Optimization",
        "Conversion Optimization, Clear CTAs, Lead Funnel",
        "Moksh restructured our value proposition and call-to-action placement. Website inquiries from decision-makers increased by 45% without spending an extra dollar on marketing. Super strategic partner."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Clean Code & Zero Maintenance Headaches",
        "Clean Code, Zero Maintenance, Reliable Hosting",
        "Our previous site broke every time an update was pushed. The Next.js platform Moksh built has been rock solid since day one. Zero crashes, zero plugin conflicts, zero stress. Highly recommended."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Fast Turnaround & Strict Deadlines",
        "Fast Turnaround, Met All Deadlines, Dedicated Dev",
        "We had a tight 3-week deadline to launch before an international industry conference. Moksh worked tirelessly and delivered a polished, fully tested website two days early. Incredible dedication."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "B2B Professional Services Web Presence",
        "Professional Services Web Dev, High Trust, Modern UI",
        "Moksh understands how to design for high-ticket B2B buyers. The clean layout, clear messaging, and fast performance immediately establish credibility with prospective enterprise clients."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "E-Commerce Catalog Revamp",
        "E-Commerce Revamp, Fast Checkout, Mobile Responsive",
        "Moksh overhauled our product pages, streamlined the navigation, and ensured rapid mobile checkout. Our bounce rate dropped and online sales grew consistently. Great job!"
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Educational & Non-Profit Web Engineering",
        "Non-Profit Web Dev, Accessibility, Trust & Transparency",
        "Moksh helped build and optimize a web platform for our charitable initiatives. He ensured complete accessibility, smooth donation workflows, and rock-solid reliability. A truly dedicated professional."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Consultancy Website & Lead Magnet Architecture",
        "Consultancy Website, Lead Magnets, Form Automation",
        "Moksh designed high-converting service landing pages and automated lead capture. Inquiries from qualified prospective clients have been steady every week. Rankur delivers real business results."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Responsive Touch Targets & UX",
        "Responsive UX, Touch Target Optimization, Clean UI",
        "Every button, navigation menu, and form field on mobile feels effortless to interact with. Moksh takes UX seriously and it reflects in the high conversion rates we are seeing."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Long-Term Technical Partnership",
        "Trusted Partner, Ongoing Optimization, Fast Support",
        "Moksh has been our trusted web engineering partner for months. Anytime we need new features, speed optimizations, or SEO tweaks, he delivers promptly. Unmatched reliability."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Startup Landing Page & Investor Pitch",
        "Startup Landing Page, Fast Launch, High Conversion",
        "We needed a sleek landing page to showcase our venture to prospective investors. Moksh built an ultra-clean Next.js page that looked stunning and loaded instantly. We secured our target meetings effortlessly."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Honest Advice & Ethical Pricing",
        "Honest Advice, Ethical Pricing, Genuine Value",
        "Moksh is one of the most transparent professionals you will meet. He told us exactly what our website needed and what unnecessary extras we could avoid spending money on. That honesty earned our complete trust."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Healthcare & Clinic Web Design",
        "Healthcare Web Design, Clean Forms, Patient Trust",
        "Moksh designed a clean, calming, and highly responsive website for our clinic. Patient inquiries through our appointment forms have been seamless. Thank you Moksh for the excellent work!"
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "B2B SaaS Growth Infrastructure",
        "B2B SaaS Infrastructure, Technical SEO, Fast Next.js",
        "Rankur built the digital growth foundation our software business needed. Lightning fast pages, clear messaging, and automated lead capture. Moksh is a master at his craft."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Corporate Web Revamp & Security",
        "Corporate Web Revamp, High Security, Modern Stack",
        "Moksh modernized our corporate website without any security vulnerabilities or downtime. Fast, secure, and modern. We couldn't be more pleased with the final result."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Complete Web Development & SEO Package",
        "Full Web Dev & SEO, Next.js, Google Ranking",
        "Hiring Moksh at Rankur gives you both world-class web engineering and top-tier SEO in one person. That dual skill set saved us thousands in agency coordination fees. 5 stars!"
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Seamless Client Onboarding & Demos",
        "Smooth Onboarding, Weekly Demos, Reliable Launch",
        "The communication throughout our project was top notch. Moksh provided clear staging links, showed progress at every step, and launched without a hitch. Outstanding service."
    ),
    (
        "Business Growth & Revamp",
        "Global / Remote",
        "Unmatched Dedication & 5-Star Execution",
        "5-Star Execution, Moksh Parjapati, Rankur Web Dev",
        "If you want your website engineered for extreme speed, high search rankings, and real business inquiries, look no further than Moksh Parjapati and Rankur. Simply the best."
    )
]

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    csv_path = os.path.join(root_dir, "GMB_SEO_GEO_100_REVIEWS.csv")
    md_path = os.path.join(root_dir, "GMB_SEO_GEO_100_REVIEWS.md")

    print(f"Total reviews defined: {len(REVIEWS)}")
    assert len(REVIEWS) == 100, f"Expected 100 reviews, got {len(REVIEWS)}"

    # Check for em dashes / en dashes
    for i, item in enumerate(REVIEWS):
        for text in item:
            if '\u2014' in text or '\u2013' in text:
                raise ValueError(f"Review #{i+1} contains em/en dash!")

    # Write CSV
    with open(csv_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, quoting=csv.QUOTE_MINIMAL)
        writer.writerow([
            "Review_ID",
            "Category",
            "Target_Location_or_Context",
            "Review_Headline",
            "Target_SEO_Keywords",
            "Rating",
            "Review_Text_To_Copy"
        ])

        for idx, (cat, loc, headline, kws, review_text) in enumerate(REVIEWS, 1):
            rev_id = f"REV-{idx:03d}"
            writer.writerow([
                rev_id,
                cat,
                loc,
                headline,
                kws,
                "5 Stars",
                review_text
            ])

    # Write Markdown
    with open(md_path, mode="w", encoding="utf-8") as f:
        f.write("# Rankur & Moksh Parjapati: 100 High-Impact Keyword-Optimized GMB Reviews\n\n")
        f.write("> **Purpose**: High-impact, keyword-dense 5-star Google My Business (GMB), Clutch, and GoodFirms reviews designed for maximum search authority and real-world posting by your international network (including friends in Finland, Mauritius, Europe, UK, and worldwide).\n")
        f.write("> **Formatting Guardrails**: Zero em or en dashes. High-intent B2B, Next.js, Core Web Vitals, and Technical SEO keywords embedded naturally.\n\n")
        f.write("---\n\n")
        f.write("## Category Breakdown\n\n")
        f.write("1. **International & Remote (Finland, Mauritius, Europe, UK, Global)** (REV-001 to REV-020): Tailored specifically for friends in Finland (Helsinki, Espoo, Tampere, etc.), Mauritius (Port Louis, Grand Baie, Ebene, etc.), and Europe.\n")
        f.write("2. **Next.js & Modern Web Engineering** (REV-021 to REV-040): Deep keyword focus on Next.js 16, React Server Components, 100% GitHub code ownership, sub-second LCP, and zero bloat.\n")
        f.write("3. **B2B Technical SEO & Search Engine Rankings** (REV-041 to REV-060): High-intent terms for Google Search Console indexing, topical authority, structured JSON-LD schema, and page 1 rankings.\n")
        f.write("4. **Speed, Core Web Vitals & GEO AI Citations** (REV-061 to REV-080): Optimized for LCP <0.8s, 100/100 PageSpeed, Perplexity/ChatGPT AI search citations, and zero layout shift.\n")
        f.write("5. **Business Growth, Full Revamps & High ROI** (REV-081 to REV-100): Highlighting conversion rate optimization, direct collaboration with Moksh, on-time delivery, and B2B lead generation.\n\n")
        f.write("---\n\n")

        current_cat = None
        for idx, (cat, loc, headline, kws, review_text) in enumerate(REVIEWS, 1):
            if cat != current_cat:
                current_cat = cat
                f.write(f"## {cat.upper()}\n\n")

            rev_id = f"REV-{idx:03d}"
            f.write(f"### {rev_id} | {loc} | {headline}\n\n")
            f.write(f"**Target SEO Keywords:** `{kws}`  \n")
            f.write(f"**Rating:** 5 Stars  \n\n")
            f.write(f"**Copy & Paste Text:**\n")
            f.write(f"> \"{review_text}\"\n\n")
            f.write("---\n\n")

    print(f"✓ Successfully generated 100 keyword-optimized reviews in:")
    print(f"  1. CSV: {csv_path}")
    print(f"  2. MD:  {md_path}")

if __name__ == "__main__":
    main()
