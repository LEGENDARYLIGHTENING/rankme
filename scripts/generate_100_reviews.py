#!/usr/bin/env python3
"""
Generate 100 Natural, Human-Sounding GMB Review Templates for Friends & Network.
Designed specifically so real friends, colleagues, peers, and clients can post them
from their own genuine Google accounts without sounding like fake corporate personas.

Zero em dashes (—) or en dashes (–).
"""

import csv
import os

REVIEWS = [
    # =========================================================================
    # BATCH 1: SHORT & CASUAL (1-2 lines) - Perfect for friends who want a quick 10-second paste
    # =========================================================================
    ("Short & Casual", "Short", "Moksh, Website Development, SEO",
     "Moksh built our website and handled the SEO setup. Super smooth experience, clean design, and everything was delivered right on time. Highly recommend his work!"),
    ("Short & Casual", "Short", "Rankur, Next.js, Fast Website",
     "Really impressed with Rankur's web development work. Moksh built a blazing fast Next.js site for us. 5 stars all the way."),
    ("Short & Casual", "Short", "Moksh, Web Design, Professional",
     "Great experience working with Moksh. Very professional, responsive, and knows modern web development inside out. Definitely recommend."),
    ("Short & Casual", "Short", "Website Speed, SEO, Moksh",
     "Moksh helped fix our website speed issues and improved our Google visibility. Great work ethic and very easy to communicate with."),
    ("Short & Casual", "Short", "Rankur, Modern Website, Clean UI",
     "If you need a fast and modern website, Moksh at Rankur is your guy. Clean code, great UI, and zero hassle throughout the project."),
    ("Short & Casual", "Short", "Moksh Parjapati, Technical SEO",
     "Moksh Parjapati is hands down one of the most dedicated web developers I have worked with. Strong technical SEO and development skills."),
    ("Short & Casual", "Short", "Next.js, Web Engineering, Rankur",
     "Top notch Next.js web development. Moksh made our site look modern and load instantly. Couldn't have asked for a smoother build."),
    ("Short & Casual", "Short", "Website Revamp, Responsive Design",
     "Moksh redesigned our site from scratch. Mobile responsiveness and speed are 10/10. Great communication from day one."),
    ("Short & Casual", "Short", "SEO Optimization, Google Ranking",
     "Moksh helped us optimize our website for Google search. We started seeing better impressions within weeks. Super knowledgeable guy."),
    ("Short & Casual", "Short", "Web Development, Reliable, Fast",
     "One of the most reliable developers around. Moksh understood our requirements immediately and delivered ahead of the deadline."),
    ("Short & Casual", "Short", "Rankur, Frontend Dev, Next.js",
     "Worked with Moksh on a Next.js web project. His attention to detail and performance optimization is remarkable. 5/5 stars."),
    ("Short & Casual", "Short", "Website Redesign, UI/UX",
     "Had our company site rebuilt by Moksh. The modern look, fast loading speed, and clean layouts exceeded our expectations."),
    ("Short & Casual", "Short", "Technical SEO, Search Console",
     "Moksh fixed our Google Search Console indexing errors and restructured our pages properly. Very thorough and skilled professional."),
    ("Short & Casual", "Short", "Quick Turnaround, Great Service",
     "Fantastic work by Moksh at Rankur! Fast turnaround, clean code, and always available to answer questions or make quick adjustments."),
    ("Short & Casual", "Short", "Core Web Vitals, Speed Optimization",
     "Our website loading time dropped drastically after Moksh optimized the code. Passing Core Web Vitals on mobile now. Huge help!"),
    ("Short & Casual", "Short", "B2B Website, Professionalism",
     "Moksh did an outstanding job setting up our B2B website. Clear communication, solid tech stack, and great design sense."),
    ("Short & Casual", "Short", "Full Stack Dev, Clean Architecture",
     "Great collaboration with Moksh. High quality web development, clean architecture, and very professional approach."),
    ("Short & Casual", "Short", "Web Developer, Highly Recommended",
     "Highly recommend Moksh if you need a website that is both fast and looks great on all devices. Great person to work with."),
    ("Short & Casual", "Short", "Rankur, SEO Setup, Web Design",
     "Moksh helped us revamp our digital presence with Rankur. Fast site, great SEO foundations, and honest advice throughout."),
    ("Short & Casual", "Short", "Great Experience, Top Quality",
     "Had a great experience with Moksh. Delivered exactly what was promised with top quality web engineering. Will definitely hire again."),

    # =========================================================================
    # BATCH 2: DEVELOPER, TECH PEER & FREELANCER FRIENDS (Speaks naturally about code/dev)
    # =========================================================================
    ("Tech Peer / Dev Friend", "Medium", "Next.js, React, Clean Code",
     "I have collaborated with Moksh on multiple web development sprints. His grasp of Next.js, React server components, and performance optimization is genuinely impressive. He writes clean, scalable code and avoids bloated third party dependencies. Great developer and a solid team player."),
    ("Tech Peer / Dev Friend", "Medium", "Technical SEO, Schema Markup, Architecture",
     "Moksh is one of the few frontend developers who truly understands technical SEO at the architecture level. From structured schema markup to clean URL routing, he makes sure the website is built for Google search from day one. Always a pleasure working together."),
    ("Tech Peer / Dev Friend", "Medium", "Core Web Vitals, PageSpeed, Frontend",
     "Reviewed several codebases Moksh built with Rankur. His focus on Core Web Vitals and sub-second loading speeds is legit. He optimizes assets properly, minimizes render blocking scripts, and writes rock solid modern frontend code. Highly recommend his development work."),
    ("Tech Peer / Dev Friend", "Medium", "Full Stack, Git Workflow, Reliability",
     "Worked alongside Moksh on client deliverables. His git workflow, code documentation, and problem solving skills are top tier. When technical bugs or indexing issues come up, he tracks down the root cause fast and fixes it cleanly. 5 stars without hesitation."),
    ("Tech Peer / Dev Friend", "Medium", "Next.js 15, SSR, Modern Web Stack",
     "Moksh really knows modern web architecture. Seeing him build custom Next.js applications with server side rendering and dynamic routing showed his deep technical expertise. If you need serious web engineering without bloated templates, reach out to him."),
    ("Tech Peer / Dev Friend", "Medium", "Frontend Engineering, Responsive UI",
     "Collaborated with Moksh on a responsive frontend interface. He takes Figma designs and translates them into pixel perfect, accessible, and fast loading web pages. Great eye for detail and very smooth communication."),
    ("Tech Peer / Dev Friend", "Medium", "Site Speed, Lighthouse 100, Next.js",
     "Moksh has an obsession with performance. He took a heavy web application and tuned it until it hit green Lighthouse scores across the board. Rare to find developers who combine great design sensibility with hardcore performance engineering."),
    ("Tech Peer / Dev Friend", "Medium", "SEO Architecture, Internal Linking, Dev",
     "I frequently bounce technical SEO questions off Moksh. His understanding of crawl budgets, canonicalization, and semantic HTML structure is top notch. Rankur is building websites the way modern tech companies need them built."),
    ("Tech Peer / Dev Friend", "Medium", "Clean Code, Production Standards, Moksh",
     "Solid engineer with great work ethics. Moksh writes production grade code that does not break down after launch. If you are looking for someone who takes full ownership of the development lifecycle, Moksh is the right person."),
    ("Tech Peer / Dev Friend", "Medium", "Web Performance, Modern JavaScript, Rankur",
     "Having known Moksh in the developer community, his dedication to mastering modern JavaScript and Next.js is inspiring. The platforms he builds under Rankur are snappy, responsive, and technically sound."),
    ("Tech Peer / Dev Friend", "Medium", "Technical Rigor, Debugging, API Integration",
     "Moksh helped debug complex API integrations and server actions on a mutual project. Patient, methodical, and delivered clean working code without cutting corners. Solid 5 star developer."),
    ("Tech Peer / Dev Friend", "Medium", "Next.js Optimization, Edge Rendering",
     "Impressive technical depth from Moksh. His implementation of edge rendering and image optimization makes a noticeable difference in page load speeds. Always glad to recommend his services."),
    ("Tech Peer / Dev Friend", "Medium", "Semantic HTML, Accessibility, SEO",
     "Moksh builds with modern web standards in mind: semantic tags, proper heading hierarchy, and zero bloat. That is why the websites he engineers rank so well on search engines. Top tier peer recommendation."),
    ("Tech Peer / Dev Friend", "Medium", "Freelance Partner, Web Engineering",
     "Partnered with Moksh on a freelance client build. He handled the core frontend and technical SEO setup effortlessly. Clients loved the speed and responsiveness of the final delivery."),
    ("Tech Peer / Dev Friend", "Medium", "DevOps, Vercel Deployment, Custom Next.js",
     "Moksh set up clean CI/CD deployments and configured Vercel edge caching perfectly on our collaborative project. Very skilled and dependable developer."),
    ("Tech Peer / Dev Friend", "Medium", "Modern Web Dev, Speed Optimization",
     "Moksh understands how to squeeze every millisecond out of web performance. His knowledge of asset bundling and font optimization is fantastic. Great dev to work with."),
    ("Tech Peer / Dev Friend", "Medium", "Full Code Ownership, GitHub, Rankur",
     "What I respect most about Moksh and Rankur is their transparent engineering approach. Clean git commits, full code ownership for clients, and zero vendor lock-in. True professional."),
    ("Tech Peer / Dev Friend", "Medium", "Component Architecture, Tailwind, Next.js",
     "Clean modular Tailwind components and crisp Next.js structure. Moksh builds codebases that are easy to maintain and scale. Highly recommended for any web development job."),
    ("Tech Peer / Dev Friend", "Medium", "Tech Lead, Dedication, Problem Solver",
     "Moksh is an exceptional problem solver. When an unexpected production issue popped up, he stayed on it until it was fully resolved. Dependable, skilled, and honest."),
    ("Tech Peer / Dev Friend", "Medium", "Modern SEO & Engineering, Rankur",
     "Moksh Parjapati is bridging the gap between deep web development and modern search optimization. The results speak for themselves. 5 stars."),

    # =========================================================================
    # BATCH 3: STARTUP, BUSINESS & FOUNDER FRIENDS (Speaks about business results & ease)
    # =========================================================================
    ("Startup / Business Friend", "Medium", "Business Website, Lead Generation, Moksh",
     "Moksh helped redesign our business website from the ground up. The previous site was sluggish and was not bringing in inquiries. With the new Next.js platform he built, inquiries started coming in within weeks. He took the time to understand our business goals and delivered an incredible platform."),
    ("Startup / Business Friend", "Medium", "Website Overhaul, Fast Loading, Rankur",
     "Had our entire company website revamped by Rankur. Moksh made the entire process painless. He gave clear weekly updates, explained technical concepts in plain English, and launched our site ahead of schedule. The site loads instantly on mobile and desktop."),
    ("Startup / Business Friend", "Medium", "Local SEO, Google Visibility, Inquiries",
     "Moksh helped us optimize our Google profile and web pages for search. We saw a noticeable jump in direct calls and website form submissions. If you run a growing business and need genuine SEO results, Moksh is your go-to guy."),
    ("Startup / Business Friend", "Medium", "Professional Portfolio, Modern Branding",
     "Moksh built our portfolio website and it looks world class. Clients constantly compliment how sleek and responsive it is. Working with Moksh was one of the smoothest freelance experiences I have had. 100% recommended."),
    ("Startup / Business Friend", "Medium", "E-commerce & Catalog, Fast Checkout",
     "Our product catalog was lagging heavily on our old platform. Moksh rebuilt the frontend architecture and streamlined the entire browsing flow. Page loads went from 4 seconds down to under a second, and our bounce rates dropped noticeably."),
    ("Startup / Business Friend", "Medium", "Consulting, SEO Strategy, Organic Traffic",
     "Moksh provided clear, actionable SEO guidance for our website. Instead of selling vanity metrics, he focused on keyword intent, clean page structure, and high converting landing pages. We are already seeing steady organic growth."),
    ("Startup / Business Friend", "Medium", "B2B Website, Honest Communication, Value",
     "Honest, skilled, and transparent. Moksh Parjapati does not overpromise or hide behind agency buzzwords. He built a high quality B2B web presence for us that actually represents our brand well. Fantastic value and execution."),
    ("Startup / Business Friend", "Medium", "Conversion Optimization, Clean Forms",
     "Moksh redesigned our lead capture forms and cleaned up our site speed. Our conversion rates improved immediately because visitors no longer wait for slow pages to load. He genuinely cares about his clients' growth."),
    ("Startup / Business Friend", "Medium", "Website Revamp, Mobile Optimization",
     "Over 70% of our customers visit from mobile devices, and our previous site looked terrible on phones. Moksh rebuilt everything with a mobile-first design that is fast and easy to navigate. Couldn't be happier with the outcome."),
    ("Startup / Business Friend", "Medium", "Agency Alternative, Direct Access to Moksh",
     "Working with Rankur felt 10 times better than dealing with bulky agencies. We worked directly with Moksh, so there was zero telephone game or delay. Every feedback item was handled quickly and professionally. 5 stars!"),
    ("Startup / Business Friend", "Medium", "Google Search Rankings, Content Structure",
     "Moksh helped restructure our service pages and optimized the on-page SEO. Within a couple of months, our main service terms moved up onto the first page of Google. Great guy and a true SEO expert."),
    ("Startup / Business Friend", "Medium", "Startup MVP, Fast Launch, Next.js",
     "We needed our startup landing page ready before an investor showcase. Moksh pulled through and delivered a custom, blazing fast Next.js site in record time. It worked flawlessly during the launch."),
    ("Startup / Business Friend", "Medium", "Corporate Website, Clean Layouts, Fast",
     "Moksh designed and built a very polished corporate website for our firm. The navigation is intuitive, the pages are lightweight, and our team can easily manage updates. Highly recommend Rankur."),
    ("Startup / Business Friend", "Medium", "SEO Audit, Fix Technical Errors, Rankur",
     "Moksh conducted a detailed website audit for us and uncovered critical indexing and crawl issues our previous agency missed. He fixed all of them within days. Our search impressions have been climbing ever since."),
    ("Startup / Business Friend", "Medium", "Professional Service, Long Term Partner",
     "Moksh is our trusted web and SEO partner. Anytime we need a new feature, landing page, or performance boost, he handles it quickly. Very rare to find someone this reliable in web development."),
    ("Startup / Business Friend", "Medium", "Branding, UI Redesign, Fast Delivery",
     "Our old site looked dated and unprofessional. Moksh gave it a complete visual and technical facelift. Our brand looks premium now and our bounce rate decreased significantly."),
    ("Startup / Business Friend", "Medium", "Search Engine Optimization, Organic Leads",
     "Great results from Moksh and Rankur. He set up our metadata, structured content clusters, and improved site speed. We are getting steady inbound inquiries from Google search every single week."),
    ("Startup / Business Friend", "Medium", "E-commerce Experience, Speed, Mobile",
     "Moksh optimized our online store's category and product pages. The instant page switching on mobile made a huge difference to our customer experience. Excellent developer."),
    ("Startup / Business Friend", "Medium", "Small Business Support, Dedicated Dev",
     "As a small business owner, finding someone trustworthy for web design is tough. Moksh took time to understand our budget and delivered a website that rivals much larger competitors. Very grateful for his help."),
    ("Startup / Business Friend", "Medium", "B2B Growth, Custom Code, No Bloat",
     "No bloated page builders or buggy plugins. Moksh engineered a custom web platform that is bulletproof and fast. Outstanding execution by Rankur."),
    ("Startup / Business Friend", "Medium", "High Converting Landing Page, Moksh",
     "Moksh designed high converting landing pages for our service campaigns. Clean layout, fast load time, and very clear calls to action. The campaign performed significantly better than our previous attempts."),
    ("Startup / Business Friend", "Medium", "Trustworthy, On Time Delivery, Rankur",
     "Delivered on time, within budget, and with zero drama. Moksh is one of the most honest professionals in the web design and SEO space. 5-star experience from start to finish."),
    ("Startup / Business Friend", "Medium", "Client Onboarding, Transparent Process",
     "The onboarding and planning process with Moksh was crystal clear. He mapped out milestones, provided regular demos, and launched on schedule. Rankur is top tier."),
    ("Startup / Business Friend", "Medium", "Modern Search Visibility, SEO Results",
     "If you want your website to actually be found on Google instead of just sitting there, talk to Moksh Parjapati. His SEO strategies are modern, ethical, and effective."),
    ("Startup / Business Friend", "Medium", "Executive Recommendation, 5 Stars",
     "Extremely pleased with the website Moksh built for us. Professional design, lightning fast performance, and unmatched dedication. Highly recommended!"),

    # =========================================================================
    # BATCH 4: FREELANCE CLIENT & PROJECT ENDORSEMENTS (Genuine client tone)
    # =========================================================================
    ("Freelance Client", "Detailed", "Next.js Web Replatform, Mobile Speed",
     "We approached Moksh to rebuild our website after struggling with slow loading speeds and poor mobile performance. He migrated our entire site to Next.js with a clean modern layout. The difference is night and day: the site loads in under a second and our customers love the smooth navigation. Moksh was always reachable and made sure everything was tested thoroughly before launch. Highly recommended!"),
    ("Freelance Client", "Detailed", "Technical SEO Audit, Google Indexing Fix",
     "Our website had dozens of 404 errors, broken redirects, and missing meta tags that were hurting our Google rankings. Moksh Parjapati performed a comprehensive SEO cleanup, fixed our sitemap structure, and resubmitted everything to Search Console. Within three weeks, our indexing recovered and organic impressions started trending upward. Very competent and trustworthy professional."),
    ("Freelance Client", "Detailed", "Custom B2B Website, Lead Funnel, Rankur",
     "Moksh at Rankur built a custom B2B website for our consultancy. He didn't just write code; he helped us organize our service offerings and designed clean conversion points that make it easy for prospective clients to book consultations. Inquiries through the website increased noticeably in the first month. Excellent work."),
    ("Freelance Client", "Detailed", "WordPress to Next.js Migration, Speed Boost",
     "Our old WordPress site was weighed down by 30+ plugins, which made every page sluggish on mobile phones. Moksh rebuilt the frontend cleanly using modern web standards. Our mobile speed score jumped from the 30s to the 90s, and our bounce rate dropped immediately. Great communication and great technical skill."),
    ("Freelance Client", "Detailed", "Local Business Website, Google Business Setup",
     "Moksh set up our business website and helped optimize our Google Business profile. He explained every step clearly and made sure our business information, contact forms, and location maps worked seamlessly. Very polite, helpful, and skilled web developer."),
    ("Freelance Client", "Detailed", "E-commerce Catalog, Fast Navigation",
     "Working with Moksh was a breath of fresh air. He overhauled our product catalog pages, optimized image loading, and ensured that filtering products is instantaneous. Our customers spend more time on the site and checkout issues have disappeared. Definitely working with him again."),
    ("Freelance Client", "Detailed", "Healthcare & Professional Services Web Dev",
     "Moksh created a professional, clean website for our clinic. Patient inquiries through the online appointment form have been steady and smooth. The design is modern, reassuring, and works perfectly on smartphones. Thank you Moksh for the great job!"),
    ("Freelance Client", "Detailed", "Agency Landing Pages, High Converting Design",
     "We needed high converting landing pages for our digital marketing campaigns. Moksh delivered pixel perfect pages with instant load speeds. Our cost per lead dropped because visitors were no longer bouncing due to slow loading pages. 5 stars all around."),
    ("Freelance Client", "Detailed", "SEO Strategy, Content Architecture, Growth",
     "Moksh provided a clear SEO roadmap that helped us target the right search terms. His advice on keyword clustering and internal linking made a massive difference to our organic visibility. He is transparent, honest, and truly knows his craft."),
    ("Freelance Client", "Detailed", "Full Code Handover, Clean GitHub Repo",
     "What set Moksh apart from other freelancers was his professional code handover. He gave us full repository access, clear setup documentation, and walked our team through how to edit content easily. Zero hidden fees or vendor lock-in. A true professional."),
    ("Freelance Client", "Detailed", "B2B Tech Company Site, Clean Branding",
     "Moksh helped our tech firm establish a credible online presence. The site looks sharp, loads fast, and clearly articulates our solutions to prospective buyers. We have received several compliments from partners on the new look."),
    ("Freelance Client", "Detailed", "Redesign & Performance Optimization, 5 Stars",
     "Our previous website redesign with another vendor was a disaster. Moksh came in, audited what went wrong, and rebuilt the critical templates cleanly. He turned a stressful project into a complete success. Highly recommended for any serious web project."),
    ("Freelance Client", "Detailed", "Responsive Design, Fast Forms, HubSpot Telemetry",
     "Moksh integrated our contact forms seamlessly with our CRM and made sure every lead was captured without delay. His attention to detail on responsive breakpoints and mobile touch targets was impressive. Excellent developer."),
    ("Freelance Client", "Detailed", "Consultancy Site, Fast Turnaround, Great Value",
     "Moksh delivered our corporate site within two weeks without cutting any corners. The site looks very polished and loads instantly. He is reliable, quick to respond, and offers exceptional value for modern web development."),
    ("Freelance Client", "Detailed", "Organic Search Traffic, Technical SEO Cleanup",
     "Our organic traffic had stagnated for over a year. Moksh audited our site, fixed crawl bottlenecks, and streamlined our page titles and meta descriptions. We started seeing meaningful organic search improvements within 60 days. Fantastic partner."),
    ("Freelance Client", "Detailed", "Portfolio Website, Smooth Animations, Modern",
     "Moksh built my personal portfolio website and it looks incredible. Smooth micro interactions, zero lag, and beautiful responsive styling. It has helped me land several new freelance contracts. Thank you Moksh!"),
    ("Freelance Client", "Detailed", "Service Pages, Conversion Optimization",
     "Moksh restructured our service landing pages to focus on clear customer pain points and easy quote requests. Inquiries from our target market have noticeably increased. Very smart developer with strong marketing acumen."),
    ("Freelance Client", "Detailed", "Reliable Freelance Developer, Ongoing Maintenance",
     "We have been working with Moksh for ongoing web updates and optimizations. He is always prompt, fixes issues on the first try, and keeps our site running fast. Couldn't ask for a better freelance web partner."),
    ("Freelance Client", "Detailed", "Educational Trust & Non-Profit Website",
     "Moksh helped build and optimize a web platform for our organization. He was patient with our feedback, ensured our donations and inquiry forms worked reliably, and made the site accessible to everyone. Truly appreciate his dedication."),
    ("Freelance Client", "Detailed", "B2B Website Redesign, Measurable Results",
     "Rankur and Moksh Parjapati delivered an outstanding website redesign. Measurable speed improvements, cleaner brand identity, and solid SEO foundations. If you want a developer who delivers real results, hire Moksh."),

    # =========================================================================
    # BATCH 5: SPEED, CORE WEB VITALS & TECHNICAL SEO SPECIFIC
    # =========================================================================
    ("Speed & SEO Specialist", "Medium", "Core Web Vitals, LCP Optimization",
     "Our website was failing Core Web Vitals with an LCP over 4 seconds on mobile. Moksh optimized our font loading, compressed assets, and eliminated unused JavaScript. Our LCP is now comfortably under 1 second and we pass all Google metrics with flying colors."),
    ("Speed & SEO Specialist", "Medium", "Next.js Performance, Image Optimization",
     "Moksh knows how to tune Next.js for maximum performance. By leveraging Next/Image and static site generation, our pages load instantaneously worldwide. Fantastic work from Rankur."),
    ("Speed & SEO Specialist", "Medium", "Google Search Console, Indexing Errors",
     "Had persistent 'crawled currently not indexed' warnings on Google Search Console. Moksh analyzed our internal linking and canonical setups, resolved the duplicate content issues, and got our key pages indexed properly. Great technical SEO work."),
    ("Speed & SEO Specialist", "Medium", "JSON-LD Schema, Structured Data, SEO",
     "Moksh implemented detailed JSON-LD schema markup for our business entity, services, and FAQ sections. Rich snippets started displaying in Google search results shortly after. Very thorough and knowledgeable."),
    ("Speed & SEO Specialist", "Medium", "Mobile PageSpeed, Bounce Rate Reduction",
     "Our mobile bounce rate dropped from 65% to under 40% after Moksh overhauled our frontend performance. When pages load instantly, users actually stick around and read. Moksh delivered exactly what was needed."),
    ("Speed & SEO Specialist", "Medium", "Website Speed Audit, Practical Solutions",
     "Unlike consultants who just hand you a generic automated report, Moksh gave us a hands-on audit and implemented the fixes directly in code. Fast, reliable, and highly effective."),
    ("Speed & SEO Specialist", "Medium", "Search Architecture, Topical Clusters",
     "Moksh helped structure our blog content into clear topical silos with logical internal linking. Our domain topical authority improved and several guide articles reached top 10 positions on Google. Great technical guidance."),
    ("Speed & SEO Specialist", "Medium", "Zero Bloat, Vanilla Code, High Performance",
     "Appreciated Moksh's no-nonsense approach to frontend development. No unnecessary heavy frameworks or bloated scripts. Just clean, optimized code that delivers top-tier speed."),
    ("Speed & SEO Specialist", "Medium", "B2B Search Ranking, Lead Gen Pages",
     "Moksh optimized our core B2B service pages with high-intent keywords and clean HTML semantics. Inquiries through organic search started climbing consistently. Highly recommend his SEO services."),
    ("Speed & SEO Specialist", "Medium", "Speed Optimization, Server Response Time",
     "Moksh diagnosed our slow server response times and optimized our asset delivery pipelines. The entire browsing experience feels snappy and effortless now. 5-star technical proficiency."),
    ("Speed & SEO Specialist", "Medium", "Crawl Budget Optimization, Sitemaps",
     "Moksh cleaned up our sitemap, removed thin redirect chains, and optimized our crawl budget. Google now crawls our new content much faster than before. Very knowledgeable in technical SEO."),
    ("Speed & SEO Specialist", "Medium", "Conversion Architecture, Form Speed",
     "Moksh redesigned our lead forms so they submit instantly without lag. That friction removal noticeably increased our completed inquiries. Great developer with a real eye for user experience."),
    ("Speed & SEO Specialist", "Medium", "Next.js SSR, SEO Friendly React",
     "If you need an SEO-friendly React or Next.js web application, Moksh is the specialist to call. He ensures every page is server rendered properly for search engine crawlers. Outstanding work."),
    ("Speed & SEO Specialist", "Medium", "Technical SEO & Speed Revamp, Rankur",
     "Rankur transformed our site from a slow, neglected page into a high performing business asset. Moksh took ownership of the entire process from speed to SEO. Couldn't recommend him more."),
    ("Speed & SEO Specialist", "Medium", "Core Web Vitals & Google Search Success",
     "Working with Moksh gave our website the technical foundation it needed to compete on Google. Great speeds, clean metadata, and responsive layouts. 5 stars all around.")
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
            "Category_or_Friend_Type",
            "Length_and_Effort",
            "Core_Keywords_Included",
            "Rating",
            "Review_Text_To_Copy",
            "Who_To_Send_To_Notes"
        ])

        for idx, (cat, length, kws, review_text) in enumerate(REVIEWS, 1):
            rev_id = f"REV-{idx:03d}"
            
            if "Short" in cat:
                notes = "Quick 10-second paste: send to any friend or acquaintance who just wants to tap 5 stars and post quickly."
            elif "Tech Peer" in cat:
                notes = "Send to developer friends, tech colleagues, or designer peers who can speak naturally about code, speed, or Next.js."
            elif "Startup" in cat:
                notes = "Send to friends who run a business, agency, startup, or freelance practice who can speak about results and communication."
            elif "Freelance Client" in cat:
                notes = "Send to real clients or close friends who want to post a comprehensive, authentic project review."
            else:
                notes = "Send to anyone to highlight website speed, Core Web Vitals, Google indexing, or SEO fixes."

            writer.writerow([
                rev_id,
                cat,
                length,
                kws,
                "5 Stars",
                review_text,
                notes
            ])

    # Write Markdown
    with open(md_path, mode="w", encoding="utf-8") as f:
        f.write("# Rankur & Moksh Parjapati: 100 Natural GMB Review Templates for Friends & Network\n\n")
        f.write("> **Purpose**: Authentic, human-sounding 5-star Google My Business (GMB) and profile review templates specifically crafted for **real friends, colleagues, tech peers, and clients** to post from their personal Google accounts.\n")
        f.write("> **Formatting Guardrails**: Zero em or en dashes. Natural conversational tone. Real-world phrasing that sounds 100% genuine when posted by an individual account.\n\n")
        f.write("---\n\n")
        f.write("## Table of Categories\n\n")
        f.write("1. **Category 1: Short & Casual (Quick 10-Second Tap)** (REV-001 to REV-020) - 1 to 2 lines. Perfect for friends who don't want to write an essay.\n")
        f.write("2. **Category 2: Developer & Tech Peer Recommendations** (REV-021 to REV-040) - Mentions Next.js, clean code, performance, and collaboration.\n")
        f.write("3. **Category 3: Startup, Business & Founder Friends** (REV-041 to REV-065) - Mentions business growth, reliability, clean UI, and on-time delivery.\n")
        f.write("4. **Category 4: Client & Real Project Endorsements** (REV-066 to REV-085) - Detailed, authentic project reviews covering redesigns, mobile speed, and SEO.\n")
        f.write("5. **Category 5: Speed, Core Web Vitals & SEO Specialists** (REV-086 to REV-100) - Highlights fast loading, Google Search Console fixes, and search ranking.\n\n")
        f.write("---\n\n")

        current_cat = None
        for idx, (cat, length, kws, review_text) in enumerate(REVIEWS, 1):
            if cat != current_cat:
                current_cat = cat
                f.write(f"## {cat.upper()}\n\n")

            rev_id = f"REV-{idx:03d}"
            f.write(f"### {rev_id} | {length} | Keywords: {kws}\n\n")
            f.write(f"**Rating:** 5 Stars\n\n")
            f.write(f"**Copy & Paste Text:**\n")
            f.write(f"> \"{review_text}\"\n\n")
            
            if "Short" in cat:
                f.write("*Best for: Quick paste for any friend on mobile.*\n\n")
            elif "Tech Peer" in cat:
                f.write("*Best for: Fellow developers, programmers, and tech peers.*\n\n")
            elif "Startup" in cat:
                f.write("*Best for: Friends with businesses, agencies, or startups.*\n\n")
            elif "Freelance Client" in cat:
                f.write("*Best for: Real clients or partners wanting a thorough testimonial.*\n\n")
            else:
                f.write("*Best for: Highlighting website speed and technical SEO improvements.*\n\n")

            f.write("---\n\n")

    print(f"✓ Successfully generated 100 friend-ready reviews in:")
    print(f"  1. CSV: {csv_path}")
    print(f"  2. MD:  {md_path}")

if __name__ == "__main__":
    main()
