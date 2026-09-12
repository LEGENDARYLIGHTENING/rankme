import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsedBlogs = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'parsed-blogs.json'), 'utf-8'));

// Helper to construct a bespoke, studio-grade Pomelli photoshoot prompt for each blog
function generatePomelliPrompt(blog) {
  const { id, title, category } = blog;
  
  // Custom bespoke prompt logic tailored to every single title & angle
  const promptsMap = {
    1: {
      scene: "Studio Tabletop & Floating Display Mockup",
      prompt: "Commercial studio photoshoot of an ultra-thin Apple Studio Display on a matte obsidian black oak desk. On screen: a sleek dark-mode B2B SaaS marketing homepage engineered for conversion, displaying real-time analytics with inbound demo requests trending up +140%, clean satin gold accent buttons reading 'Schedule Live Demo', and sub-second speed badges. Warm directional ambient rim lighting, shallow depth of field, 85mm f/1.4 lens, luxury executive tech aesthetic, 8k resolution, crisp commercial photography, zero glare."
    },
    2: {
      scene: "Executive Strategy Workspace",
      prompt: "Editorial commercial photoshoot of an executive tech consultation desk. A premium leather-bound notebook with handwritten B2B pipeline growth KPIs next to a sleek iPad Pro displaying an organic keyword revenue attribution model. Background features a dark minimalist glass architectural partition with soft morning light. Muted charcoal and satin gold tones, shot on Hasselblad H6D-100c, shallow depth of field, sharp focus on screen metrics showing $240k pipeline generated, cinematic depth."
    },
    3: {
      scene: "Engineering Architecture & Performance Lab",
      prompt: "High-end product photography of a dual-screen engineering workstation in a modern minimalist software studio. Left screen displays clean React Next.js server components code; right screen displays Google Lighthouse score glowing at a perfect 100/100 performance. Sleek matte black mechanical keyboard, brushed aluminum mouse pad, subtle gold desk lamp illumination (#C9A84C), ultra-sharp focus, cinematic commercial tech aesthetic, no digital noise."
    },
    4: {
      scene: "Generative AI Search Visualization",
      prompt: "Studio lifestyle photo of a modern B2B tech executive reviewing AI search citation results on a bezel-less laptop. The screen shows ChatGPT and Perplexity citation cards highlighting a SaaS company as the top verified recommendation. Sleek obsidian marble desk surface with subtle golden ambient light reflections, crisp typography on screen, professional editorial framing, 50mm lens, natural daylight blending with warm studio accents."
    },
    5: {
      scene: "Executive Inbound Sales Command Center",
      prompt: "Editorial overhead flat-lay composition of a B2B founder's daily workspace. A dark titanium laptop displaying an active LinkedIn sales pipeline dashboard with qualified executive meeting bookings, a matte black ceramic coffee cup, a brass pen, and an iPhone showing inbound B2B connection requests from VPs of Engineering. Clean negative space, warm side lighting, tactile leather and wood textures, 8k commercial photography."
    },
    6: {
      scene: "Strategic Investment & ROI Breakdown",
      prompt: "Studio photography of a sleek financial and redesign proposal document in a minimalist binder on a dark walnut boardroom table. Beside it, an iPad Pro displays an interactive SaaS website redesign cost versus ROI timeline chart in obsidian black and satin gold. Architectural window with soft diffused daylight in the background, luxury corporate agency vibe, Hasselblad 100MP clarity, crisp typography."
    },
    7: {
      scene: "Organic Growth Velocity Dashboard",
      prompt: "Macro close-up shot of a modern glass tablet held by a tech founder in a navy merino wool sweater. Screen displays an organic B2B MRR growth curve scaling smoothly upward without paid advertising dependencies. Soft bokeh background of a high-ceiling modern glass office, warm ambient fill light, sharp screen clarity, professional corporate editorial photography."
    },
    8: {
      scene: "Conversion Rate Optimization Friction Teardown",
      prompt: "Studio composition of a website audit session. A high-resolution monitor displays a side-by-side UX teardown comparing a cluttered, low-converting SaaS pricing page with a high-converting, friction-free React checkout flow with gold micro-conversion markers. Dark slate desk, designer anodized aluminum notebook, soft directional spotlights, commercial grade product render style."
    },
    9: {
      scene: "High-Intent Demo Booking Flow",
      prompt: "Studio photoshoot of a MacBook Pro resting on a minimalist concrete plinth. The screen showcases an ultra-clean B2B demo scheduling modal with zero form friction, displaying available calendar slots and an instant qualification badge. Dramatic moody studio lighting with satin gold edge luminescence, 85mm portrait lens, luxury SaaS product shoot."
    },
    10: {
      scene: "Customer Retention & Content Lifecycle",
      prompt: "Executive desk setting with a sleek digital tablet displaying an onboarding content hub and churn reduction cohort analysis showing retention increasing to 96%. A small brass geometric sculpture and minimalist matte black notebook rest nearby. Soft diffused studio lighting, deep obsidian blacks and subtle warm gold highlights, crisp 8k editorial capture."
    },
    11: {
      scene: "Topical Authority Cluster Architecture",
      prompt: "Editorial photograph of an architect's design table repurposed for digital content strategy. A large touch screen surface displays an interconnected 3D topical cluster node diagram with core pillar pages linked to high-intent buyer subtopics in glowing gold lines. Modern industrial design studio background, soft daylight from industrial loft windows, sharp focal depth."
    },
    12: {
      scene: "International Market Targeting Matrix",
      prompt: "Studio commercial shot of an illuminated high-tech global market console. An executive monitor displays an international hreflang routing table with US, UK, and European B2B buyer regional traffic funnels. Sleek obsidian desk accessories, subtle warm ambient lighting, crisp typography, clean corporate aesthetic, 8k resolution."
    },
    13: {
      scene: "B2B Lead Quality Diagnostics",
      prompt: "Studio tabletop shot of a digital audit report on a tablet. Screen displays lead qualification scoring comparing low-intent traffic versus high-intent sales-ready pipeline with clear green verification checkmarks. Subtle amber and dark slate lighting, minimalist boardroom setting, professional corporate stock photography style without clichés."
    },
    14: {
      scene: "Competitive Intelligence Command Screen",
      prompt: "Studio photoshoot of an ultrawide curved monitor in an executive analytics suite. Screen shows a detailed competitive gap matrix with market share capture indicators, keyword overlap graphs, and unranked high-intent opportunity zones highlighted in satin gold. Moody dark aesthetic, shallow depth of field, premium agency workspace."
    },
    15: {
      scene: "Structured Data & Semantic Schema Lab",
      prompt: "Close-up commercial photo of a software engineer's workspace. A dual-pane IDE on an Apple Studio display shows structured JSON-LD schema markup with Product, Service, and FAQPage schemas validated with zero warnings alongside rich Google search snippet previews. Clean desk, brushed metal finishes, warm rim lighting."
    },
    16: {
      scene: "Cross-Border Transatlantic Expansion",
      prompt: "Editorial lifestyle shot of an international business consultant's desk. An open laptop displays dual analytics views for US and UK enterprise search queries, paired with an elegant brass world clock showing New York and London times. Dark walnut surface, soft directional window illumination, quiet luxury executive mood."
    },
    17: {
      scene: "Search Algorithm Resilience & Stability",
      prompt: "Studio photograph of a server-grade digital monitoring station. Screen shows a multi-year organic traffic graph maintaining steady upward momentum through major Google core algorithm updates. Obsidian glass desktop with gold subtle accents, sharp focus on analytics stability, cinematic studio lighting."
    },
    18: {
      scene: "Topical Pillar Page Blueprint",
      prompt: "Top-down flat-lay photoshoot of a high-level B2B content architecture blueprint printed on heavy matte stock paper alongside a tablet displaying live interactive pillar page navigation. Clean metallic stylus, black ceramic mug, warm side light, textured editorial composition, 8k resolution."
    },
    19: {
      scene: "Hidden Pipeline Opportunity Audit",
      prompt: "Commercial studio shot of a digital tablet showcasing a comprehensive technical website audit report. Highlighting crawl efficiency, Core Web Vitals optimizations, and untapped commercial search queries. Minimalist obsidian stone desk, sharp focal depth, warm amber studio lighting."
    },
    20: {
      scene: "Executive Voice Search & Conversational Query UI",
      prompt: "Modern smart boardroom setting. A high-end conference room table with a sleek voice-enabled smart speaker interface next to a tablet displaying conversational AI search queries used by Fortune 500 decision makers. Subtle glowing soundwave visualization in warm gold, luxury minimalist architecture."
    },
    21: {
      scene: "Industrial Export Digital Transformation",
      prompt: "Cinematic commercial photo of an industrial manufacturer's modern control office overlooking an advanced robotics assembly line. On a ruggedized tablet in the foreground: an international RFQ portal displaying incoming buyer quote requests from Germany and the US. Dramatic factory lighting balanced with clean screen illumination."
    },
    22: {
      scene: "AI Editorial Scaling & Quality Assurance",
      prompt: "Editorial shot of a content director's workspace in a creative agency. A sleek workstation with an open dual monitor showing AI-assisted topical research on one side and a human editor's rigorous technical polish and fact-checking review on the other. Warm incandescent lamp light, textured dark oak desk."
    },
    23: {
      scene: "GEO Multi-LLM Citation Dominance",
      prompt: "Studio product shot of a floating bezel-less laptop display against a matte dark background. Screen displays multi-engine search visibility across ChatGPT Search, Perplexity Pro, and Google Gemini with a verified B2B brand cited as the primary authority. Subtle golden halo backlighting, crisp 8k clarity."
    },
    24: {
      scene: "Knowledge Graph Entity Mapping",
      prompt: "Commercial photograph of a high-tech strategy screen displaying a semantic knowledge graph. Interconnected corporate entity nodes, founder authority profiles, and verified service credentials forming a secure web of digital trust in glowing gold lines. Moody obsidian studio environment."
    },
    25: {
      scene: "Source-Authoritative Reference Engineering",
      prompt: "Studio flat-lay of an authoritative research whitepaper in a custom debossed dark linen binder, resting beside an iPad showing Perplexity's source citations citing the exact whitepaper data. Sharp macro focus, tactile paper texture, warm directional light."
    },
    26: {
      scene: "Traditional SEO vs GEO Strategic Comparison",
      prompt: "Studio side-by-side comparison mockup on a dual-screen workstation. Left screen displays standard Google SERP ranking positions (#1-#10); right screen displays a synthesized AI Overview answer with direct brand citation cards and follow-up prompts. Modern minimalist desk, neutral lighting, executive agency vibe."
    },
    27: {
      scene: "GEO Prompt Engineering & Benchmark Testing",
      prompt: "Close-up commercial photo of a data scientist's screen running automated prompt benchmarks against LLM search engines. Clean terminal windows showing high citation frequency rates and brand recommendation sentiment scores in gold and white text. Sleek dark aesthetic."
    },
    28: {
      scene: "Entity Authority & Brand Trust Graph",
      prompt: "Studio photography of an executive boardroom screen showcasing a company's verified digital entity graph: Wikidata connections, Crunchbase schema, industry patents, and press authority signals mapped out clearly. Polished conference table reflections, luxury tech atmosphere."
    },
    29: {
      scene: "Perplexity Search Domination Case Study",
      prompt: "Editorial commercial photo of an open MacBook on a granite coffee table in an executive lounge. The screen displays Perplexity Pro answering an enterprise B2B query with a highlighted direct quote and link to the client's case study. Ambient warm architectural lighting."
    },
    30: {
      scene: "Future-Proof Web Architecture Systems",
      prompt: "Studio shot of modular server blades and edge networking hardware in a clean enterprise data room, with an engineer holding an iPad displaying Next.js edge deployment status and sub-100ms response times globally. Obsidian and amber color tones, crisp commercial focus."
    },
    31: {
      scene: "GEO Performance Analytics & Metrics",
      prompt: "Commercial photography of an executive analytics dashboard on a high-resolution display. Graphing AI citation share of voice, synthetic referral traffic, and brand impression metrics from generative engines. Dark UI, satin gold line charts, minimalist desk setup."
    },
    32: {
      scene: "Executive LinkedIn AI Scraping Optimization",
      prompt: "Overhead desk shot of an iPad Pro with an Apple Pencil displaying an optimized LinkedIn long-form thought leadership article with structured data headers designed for LLM indexing. Beside it: a minimalist ceramic cup and brass stationery. Soft morning light."
    },
    33: {
      scene: "Google AI Overviews Click-Through Engine",
      prompt: "Studio close-up of a 4K display showing Google's AI Overview module at the top of search results, featuring an interactive brand citation box with a high click-through rate callout. Professional studio lighting, sharp text clarity, dark slate desk."
    },
    34: {
      scene: "Nutraceutical AI Search Positioning",
      prompt: "Commercial product photography of premium amber glass supplement bottles on a clean travertine stone pedestal, with a tablet in the background displaying top-ranked AI search recommendations for clean-label contract manufacturing. Soft organic lighting, luxury wellness feel."
    },
    35: {
      scene: "Technical Web Infrastructure for AI Crawlers",
      prompt: "Studio shot of a technical web audit terminal showing automated bot access logs for GPTBot, PerplexityBot, and Google-Extended with 200 OK server response codes and sub-second crawl efficiency. Deep obsidian background, gold status highlights."
    },
    36: {
      scene: "Multi-Channel ROI Matrix (SEO vs GEO vs Paid)",
      prompt: "Studio flat-lay of an executive marketing budget matrix on an iPad Pro. Comparing customer acquisition cost (CAC) and customer lifetime value (LTV) across SEO, GEO, and Paid Search with clear organic ROI supremacy. Sleek pen, leather notebook, soft directional light."
    },
    37: {
      scene: "Source-Authoritative Thought Leadership Hub",
      prompt: "Editorial photograph of a published hardcover industry benchmark report resting on a dark walnut executive desk beside an ultra-thin laptop showing the digital interactive version with thousands of organic citations. Cinematic depth of field, luxury editorial styling."
    },
    38: {
      scene: "SaaS GEO Implementation Roadmap",
      prompt: "Studio composition of a magnetic glass whiteboard in a product strategy room with a quarterly GEO sprint roadmap: structured data deployment, entity mapping, and citation expansion stages outlined in crisp black and gold markers. Soft natural light, sharp focus."
    },
    39: {
      scene: "B2B Buyer Decision Journey Research",
      prompt: "Editorial lifestyle photo of a VP of Procurement working late in a glass-walled corner office. Laptop screen displays an AI search session comparing three enterprise vendor solutions before submitting an RFP. City skyline at dusk in the soft bokeh background."
    },
    40: {
      scene: "Real-Time AI Mention & Sentiment Monitor",
      prompt: "Studio monitor display showing a real-time listening feed of brand mentions across ChatGPT, Claude, and Gemini with positive recommendation scores and verified source links. Sleek matte black monitor stand, ambient warm backlighting."
    },
    41: {
      scene: "Omnichannel B2B Growth Engine",
      prompt: "Studio photograph of a 3D isometric diagram displayed on an interactive studio touchscreen, showing the seamless connection between organic SEO, AI search citations, and high-converting React web funnels. Dark moody atmosphere with glowing gold pathways."
    },
    42: {
      scene: "Global Organic Inbound Pipeline",
      prompt: "Commercial photoshoot of an executive desk with a dark-mode interactive map displaying inbound enterprise inquiries flowing from North America, Europe, and Asia into a unified CRM dashboard. Polished dark wood, brass desk accessories, warm studio light."
    },
    43: {
      scene: "High-Value Lead Magnet Architecture",
      prompt: "Studio tabletop shot of an iPad Pro displaying an interactive 'B2B Enterprise Website ROI Calculator' lead magnet, showing user inputs for pipeline value and instant qualification score. Modern marble desk, clean minimalist styling."
    },
    44: {
      scene: "Industrial Manufacturer RFQ Flow",
      prompt: "Commercial photo of an industrial engineering office. A high-spec CAD workstation alongside a screen displaying an incoming digital RFQ with 3D step file attachments and buyer volume specifications. Clean industrial tech environment, warm workshop glow in background."
    },
    45: {
      scene: "Automated Enterprise Lead Nurturing",
      prompt: "Studio shot of a dual-screen setup showing an organic lead nurturing workflow: automated technical case study deliveries triggering high-value demo requests. Obsidian and gold UI elements, sharp lens focus, premium corporate tech aesthetic."
    },
    46: {
      scene: "Predictive Lead Scoring Command Hub",
      prompt: "Close-up commercial photo of a sales operations dashboard displaying automated lead scoring metrics (+85 Sales-Ready SQLs) based on website engagement, technical page views, and company firmographics. Dark theme, gold score badges."
    },
    47: {
      scene: "Gated vs Ungated Content Optimization",
      prompt: "Studio photoshoot of a split screen comparison on a 32-inch 4K monitor: ungated high-authority pillar content driving massive organic search traffic on the left, vs high-value gated interactive tools capturing verified business emails on the right. Elegant desk setup."
    },
    48: {
      scene: "High-Authority Content Syndication Network",
      prompt: "Conceptual studio shot of a digital publishing workflow across an Apple Studio Display: an authoritative technical article syndicating with canonical tags to Medium, LinkedIn, and industry journals. Dark minimalist workspace, warm side lighting."
    },
    49: {
      scene: "Enterprise Inbound Pipeline Case Study",
      prompt: "Editorial photo of a polished hardcover case study portfolio debossed with gold lettering, lying open on an executive boardroom table to reveal a certified $1.2M inbound organic pipeline growth chart. Dramatic shallow depth of field."
    },
    50: {
      scene: "Full-Funnel Organic Conversion Engine",
      prompt: "Studio rendering of a multi-tiered glass funnel model on an executive presentation display: top-of-funnel informational queries transitioning into middle-of-funnel comparison guides and bottom-of-funnel high-ticket contract bookings. Obsidian and gold accents."
    },
    51: {
      scene: "High-Intent Commercial Keyword Matrix",
      prompt: "Studio shot of an ultra-wide curved monitor displaying an advanced keyword research matrix highlighting high-intent B2B search terms ('custom b2b web development company') with high commercial value and low competition. Warm studio illumination."
    },
    52: {
      scene: "Strategic Cross-Border Email Architecture",
      prompt: "Overhead desk photoshoot of an executive composing a personalized, data-backed partnership email on a sleek dark-mode laptop. An espresso cup and minimalist leather planner rest nearby. Soft diffused morning light, quiet luxury mood."
    },
    53: {
      scene: "B2B Organic Referral Engine",
      prompt: "Studio composition of a network visualization on an interactive tablet: existing satisfied enterprise clients generating high-value qualified referrals without paid acquisition costs. Clean black glass surface, gold connection nodes."
    },
    54: {
      scene: "High-Converting Technical B2B Webinar",
      prompt: "Commercial photo of a professional executive podcast and webinar studio: high-end Shure microphone, softbox lighting, and a monitor displaying 300+ live registered B2B decision-makers attending a technical web architecture masterclass."
    },
    55: {
      scene: "Executive Industry Newsletter Publishing",
      prompt: "Overhead flat-lay of an open laptop showing a beautifully formatted, typography-rich B2B engineering newsletter with a 48% open rate among CTOs and founders. Minimalist desk, fountain pen, ceramic cup, soft natural lighting."
    },
    56: {
      scene: "Private B2B Founder Community Ecosystem",
      prompt: "Editorial photo of an executive working in an upscale private members' club lounge. Laptop screen displays an exclusive B2B founder Slack/Discord network discussing enterprise growth and technical web scaling. Warm ambient architectural lighting."
    },
    57: {
      scene: "Co-Marketing Partnership Presentation",
      prompt: "Studio shot of a split boardroom presentation screen displaying a joint web engineering and SEO benchmark report co-branded by two leading tech agencies. Polished walnut table, subtle reflections, luxury corporate feel."
    },
    58: {
      scene: "Proof-Driven Case Study Architecture",
      prompt: "Commercial photoshoot of an iPad Pro mounted on an anodized aluminum stand displaying an enterprise client case study with live interactive metric counters (+310% pipeline velocity, 0.4s load speed). Dark studio backdrop, warm rim lighting."
    },
    59: {
      scene: "Interactive B2B Web ROI Calculator",
      prompt: "Studio close-up of a touchscreen kiosk in a tech demo suite showing an interactive 'B2B Website Redesign ROI & Pipeline Calculator' with custom sliders and instant revenue projections. Brushed aluminum framing, crisp 8k UI."
    },
    60: {
      scene: "Long Sales Cycle Relationship Nurturing",
      prompt: "Atmospheric editorial shot of an executive office at sunset. A laptop displays a 9-month enterprise deal progression timeline from initial organic blog visit to final signed contract. Warm amber rays filtering through floor-to-ceiling windows."
    },
    61: {
      scene: "Lead Quality vs Vanity Metrics Audit",
      prompt: "Studio photoshoot of a dual-bar comparison chart on a monitor: towering vanity page views yielding zero sales calls contrasted with a focused stream of 20 high-value enterprise decision-makers closing $500k in ARR. Dark theme, gold winner badge."
    },
    62: {
      scene: "Founder LinkedIn Authority & Inbound Pipeline",
      prompt: "Executive lifestyle shot of a tech founder sitting in a modern Scandinavian office. Laptop displays an insightful LinkedIn post that generated 12 qualified CEO direct messages and meeting requests. Natural diffused daylight, authentic editorial style."
    },
    63: {
      scene: "Global Personal Branding Command Center",
      prompt: "Overhead studio view of a modern founder's workspace: a sleek microphone, high-end mirrorless camera on a desk arm, iPad with content outline, and laptop showing an international executive audience analytics map. Dark slate and gold aesthetics."
    },
    64: {
      scene: "Strategic B2B Authority Content Calendar",
      prompt: "Studio flat-lay of a physical quarterly editorial calendar printed on heavy matte linen paper alongside an iPad Pro with Notion editorial board. Clean gold wire-bound notebook, brass pen, minimalist aesthetic, 8k resolution."
    },
    65: {
      scene: "High-Value Executive Commenting Strategy",
      prompt: "Close-up commercial shot of a smartphone held in hand displaying insightful, technical comments on an industry leader's LinkedIn post, resulting in an inbound connection request from a Fortune 500 CTO. Soft bokeh background."
    },
    66: {
      scene: "Premier US Industrial Manufacturing Facility",
      prompt: "Cinematic commercial photo of a clean-room precision CNC machining and industrial manufacturing facility in the USA. Warm overhead task lighting illuminating high-tolerance aerospace parts, with an engineer inspecting digital quality blueprints on a tablet."
    },
    67: {
      scene: "Export Trade Compliance & Logistics Hub",
      prompt: "Editorial photoshoot of a modern international shipping logistics control room. Large monitors displaying customs compliance documentation, international bill of lading certifications, and real-time cargo container tracking across global ports."
    },
    68: {
      scene: "Contract Manufacturing Partner Vetting",
      prompt: "Commercial photo of two engineers in sterile clean-room attire inspecting high-precision manufactured medical components under professional studio inspection lighting. Clean stainless steel surfaces, ultra-sharp industrial focus."
    },
    69: {
      scene: "Global Product Sourcing Agency Operations",
      prompt: "Studio shot of an industrial designer's desk with material sample swatches (anodized aluminum, engineered polymers, carbon fiber) next to a laptop displaying factory audit scores and supplier vetting criteria."
    },
    70: {
      scene: "International Trade Compliance Checklist",
      prompt: "Studio flat-lay of an official export compliance audit binder with gold foil debossing, paired with an iPad displaying harmonized tariff codes and US-UK export regulatory certifications. Dark executive wood background."
    },
    71: {
      scene: "OEM Manufacturing Precision Procurement",
      prompt: "Commercial photoshoot of high-precision OEM mechanical assemblies on a dark slate tabletop, surrounded by technical CAD blueprints on a tablet and digital micrometers. Dramatic side lighting, industrial luxury aesthetic."
    },
    72: {
      scene: "Industrial Export Lead Generation Engine",
      prompt: "Modern factory manager's glass-walled mezzanine office overlooking an automated manufacturing floor. On screen: an incoming stream of verified international RFQs from global procurement directors. Warm golden hour light."
    },
    73: {
      scene: "Resilient Global Supply Chain Architecture",
      prompt: "Studio visualization of a diversified global manufacturing supply chain displayed on a large command center touchscreen, showing multi-continent supplier redundancy and risk-mitigated shipping routes. Moody dark interface."
    },
    74: {
      scene: "Global B2B Exporters Directory Optimization",
      prompt: "Studio shot of an executive laptop displaying a premier verified supplier profile on an international B2B directory, featuring 5-star certifications, video factory tours, and direct RFQ submission buttons."
    },
    75: {
      scene: "Private Label Production Scaling Facility",
      prompt: "Cinematic commercial photo of an automated packaging and bottling line in a GMP-certified pharmaceutical facility. Sleek conveyor belts, clean room lighting, and an automated label application system running seamlessly."
    },
    76: {
      scene: "Nutraceutical Contract Manufacturing Audit",
      prompt: "Commercial photoshoot of a modern nutraceutical laboratory. Scientists in lab coats testing raw botanical extract purity with high-performance liquid chromatography equipment. Pristine white and stainless steel environment."
    },
    77: {
      scene: "White Label Wellness Brand Expansion",
      prompt: "Studio product photography of an elegant collection of minimalist wellness supplement jars in amber glass and matte black lids, arranged on a marble riser with soft natural daylight. Luxury cosmetic and nutraceutical appeal."
    },
    78: {
      scene: "Supplement Export Compliance Certification",
      prompt: "Official FDA cGMP and ISO certification documents in a leather portfolio on an executive mahogany desk, next to an iPad showing international regulatory clearance checklists for EU and Middle East markets."
    },
    79: {
      scene: "Nutraceutical Formulation Consulting Session",
      prompt: "Editorial photo of a botanical formulation table with glass beakers containing organic herbal extracts, raw powder samples, and a laptop displaying formulation bioavailability charts and clinical dosage studies."
    },
    80: {
      scene: "Private Label Supplement Manufacturer Comparison",
      prompt: "Studio shot of a comprehensive manufacturer vetting matrix on a 4K monitor, comparing minimum order quantities (MOQs), delivery lead times, GMP testing protocols, and per-unit margins for top contract labs."
    },
    81: {
      scene: "Bioavailable Wellness Formulation Science",
      prompt: "High-end laboratory photoshoot: micro-pipette dispensing a golden botanical lipid extract into a glass test vial, with a digital microscope screen in the background showing cellular nutrient absorption diagrams."
    },
    82: {
      scene: "Global Nutraceutical Distribution Network",
      prompt: "Commercial photo of a temperature-controlled pharmaceutical distribution warehouse with automated guided vehicles moving palletized health products under bright LED high-bay lights. Industrial precision."
    },
    83: {
      scene: "GMP Certified Manufacturing Standard of Excellence",
      prompt: "Close-up commercial photo of an embossed GMP (Good Manufacturing Practice) gold certification seal on a pharmaceutical batch record document, illuminated by clean surgical studio lighting."
    },
    84: {
      scene: "Scaling a Wellness Brand (From Launch to $10M)",
      prompt: "Overhead desk shot of a wellness founder's workstation: branded supplement packaging samples, a financial growth forecast showing 8-figure revenue milestones, and an iPad showing customer subscription retention metrics."
    },
    85: {
      scene: "Clean Label Organic Supplement Science",
      prompt: "Studio product photography of whole-food raw ingredients (reishi mushrooms, ashwagandha root, golden turmeric) arranged beside finished, transparent vegan capsules on an organic slate slab. Natural diffused light."
    },
    86: {
      scene: "High-Converting B2B Web Platform Blueprint",
      prompt: "Studio commercial photo of an architect's drafting desk with wireframe layouts for a modern B2B web platform, alongside an Apple Studio Display rendering the finished site with sub-second page transitions and a 4.8% demo conversion rate."
    },
    87: {
      scene: "Global B2B Web Architecture Blueprint",
      prompt: "Commercial photograph of a digital architecture blueprint showing global CDN edge routing, geo-targeted localized content blocks, and currency/language switching logic rendered on a curved 38-inch monitor."
    },
    88: {
      scene: "Solving International Buyer Drop-off Friction",
      prompt: "Studio composition of a UX teardown session on an interactive tablet: analyzing international checkout friction, timezone misalignments, and slow server response times, paired with high-converting localized solution wireframes."
    },
    89: {
      scene: "Headless CMS vs Traditional CMS ROI Analysis",
      prompt: "Studio side-by-side performance comparison on two matching MacBook Pros: a bloated legacy WordPress site stuttering with 4.5s load times versus a custom Headless Next.js site loading instantly in 0.6s with perfect 100/100 Core Web Vitals."
    },
    90: {
      scene: "Multilingual Expansion for Middle East Markets",
      prompt: "Commercial photo of a luxury executive desk in Dubai. A laptop displays a beautifully designed bilingual English and Arabic B2B corporate portal with flawless right-to-left (RTL) typography. Burj Khalifa skyline blurred in window background."
    },
    91: {
      scene: "Mobile-First Industrial Procurement UX",
      prompt: "Studio photoshoot of an iPhone 16 Pro held on a factory floor, displaying a lightning-fast B2B mobile portal allowing a plant manager to request an industrial quote in under 30 seconds with 2 taps."
    },
    92: {
      scene: "Seamless Website-to-CRM Lead Flow Integration",
      prompt: "Studio shot of an enterprise sales operations screen showing an incoming website lead automatically enriching through Apollo/Clearbit and booking directly into the account executive's calendar via HubSpot/Salesforce."
    },
    93: {
      scene: "Enterprise B2B Web Architecture Case Study",
      prompt: "Editorial commercial photo of an open case study binder showcasing an enterprise client's digital transformation: custom React web architecture that generated 50+ qualified international RFQs in 30 days. Obsidian and gold branding."
    },
    94: {
      scene: "B2B Security & SOC2 Compliance Architecture",
      prompt: "Studio photograph of an enterprise security dashboard on a monitor: SOC2 Type II compliance badge, SSL/TLS A+ encryption rating, DDoS mitigation status, and zero security vulnerability findings on a custom web build."
    },
    95: {
      scene: "Sub-Second Performance & Core Web Vitals Dominance",
      prompt: "Macro studio shot of a digital stopwatch resting on a keyboard next to a Google Lighthouse audit report displaying 100/100 across Performance, Accessibility, Best Practices, and SEO. 0.4s Largest Contentful Paint."
    },
    96: {
      scene: "Custom React Build vs Slow Templates Cost Analysis",
      prompt: "Studio flat-lay of a financial comparison sheet in a black leather folder: showing how a custom React website pays for itself in 90 days through higher conversion rates compared to cheap templates that quietly bleed deals."
    },
    97: {
      scene: "Dynamic Personalization for Enterprise Buying Committees",
      prompt: "Commercial photoshoot of an interactive website demo showing dynamic content personalization: tailoring the homepage hero message automatically based on whether the visitor is a CTO, CFO, or Head of Procurement."
    },
    98: {
      scene: "Designing for Multi-Stakeholder Buying Committees",
      prompt: "Corporate boardroom setting. A large presentation display showing a B2B website's executive summary deck tailored to answer both technical integration questions for engineers and ROI validation for the CFO."
    },
    99: {
      scene: "Technical SEO Foundation & Crawl Architecture",
      prompt: "Studio shot of a technical SEO crawler visualization on an Apple display: perfect crawl depth hierarchy, zero orphan pages, optimized XML sitemaps, and clean canonical URL structures rendered in glowing gold nodes."
    },
    100: {
      scene: "Zero-Downtime Enterprise Website Migration",
      prompt: "Studio photograph of a deployment terminal during a major enterprise website migration: automated 301 redirect validation, DNS propagation status, and zero traffic drops across 50,000 indexed pages."
    },
    101: {
      scene: "AI-Enhanced B2B User Experience & Search",
      prompt: "Studio close-up of a modern B2B SaaS website featuring an intelligent semantic search bar that answers complex technical buyer questions with instant product recommendations and live inventory data."
    },
    102: {
      scene: "Website ROI & Revenue Attribution Modeling",
      prompt: "Editorial flat-lay of a financial attribution model on an iPad Pro: tracing $1.8M in closed enterprise deals back to specific organic blog articles and high-intent landing page visits. Dark walnut desk, fountain pen."
    },
    103: {
      scene: "Competitor Website Architecture Teardown",
      prompt: "Studio photoshoot of a UX strategist's workspace with side-by-side browser teardowns: dissecting top three competitor websites for load speed bottlenecks, conversion friction, and missed keyword opportunities."
    },
    104: {
      scene: "High-Converting B2B Category & Service Pages",
      prompt: "Studio product shot of an ultrawide monitor displaying an impeccably structured B2B category landing page with clear technical specs, social proof, interactive quote builders, and direct calendar booking CTAs."
    },
    105: {
      scene: "Global Edge CDN Performance & Scalability",
      prompt: "Commercial photo of a server rack console displaying worldwide Edge server nodes (Vercel/Cloudflare) serving static pages in under 80ms to visitors in North America, Europe, Asia, and Australia."
    },
    106: {
      scene: "High-Intent Commercial Buyer Keyword Strategy",
      prompt: "Studio shot of an SEO strategy board displaying high-intent commercial keywords mapped directly to sales pipeline revenue, highlighting phrases used exclusively by buyers ready to sign contracts."
    },
    107: {
      scene: "Enterprise Technical SEO Audit Checklist",
      prompt: "Studio flat-lay of a comprehensive 50-point technical SEO audit checklist on a dark clipboard with gold pen, paired with an iPad showing live server response times and schema markup validation."
    },
    108: {
      scene: "Keyword Research for 6-Month B2B Buying Cycles",
      prompt: "Studio composition of a multi-stage keyword map on a whiteboard: problem-aware queries leading to solution comparison searches and final vendor selection keywords across a 6-month enterprise cycle."
    },
    109: {
      scene: "Cross-Border Local & Industrial Export SEO",
      prompt: "Commercial photoshoot of an industrial exporter's digital marketing hub: Google Business Profile optimizations alongside international country-specific search engine rankings in the US, Germany, and UAE."
    },
    110: {
      scene: "E-E-A-T Authority & Executive Credibility",
      prompt: "Studio photoshoot of an authoritative author bio card and verified editorial policy on an enterprise website, showcasing founder credentials, industry publications, and expert peer reviews with gold trust badges."
    },
    111: {
      scene: "High-Authority Editorial Backlink Portfolio",
      prompt: "Studio shot of an organic backlink profile audit on a 4K display: showing natural high-authority links from Forbes, TechCrunch, and industry journals with DA 80+ metrics pointing to core service pages."
    },
    112: {
      scene: "Industrial Product Pages Optimized for High-Ticket RFQs",
      prompt: "Commercial photo of an industrial equipment manufacturer's product page on a ruggedized tablet: technical PDF spec download triggers, 3D CAD viewer, and a streamlined 'Request Formal Quotation' modal."
    },
    113: {
      scene: "Measuring Real Pipeline Revenue vs Vanity SEO",
      prompt: "Executive boardroom presentation screen showing a direct line of revenue attribution: $3.4M in closed-won contracts traced directly to organic search traffic, disproving vanity ranking metrics."
    },
    114: {
      scene: "Zero-Click Search Defense & Brand Ownership",
      prompt: "Studio close-up of a Google search results page where the brand owns the featured snippet, the knowledge panel, and the top organic listing, ensuring maximum visibility even without a direct click."
    },
    115: {
      scene: "Omnichannel GEO: Google, ChatGPT & Perplexity Visibility",
      prompt: "Commercial photoshoot of three floating devices (iPad, MacBook, iPhone) side by side, simultaneously displaying the brand's verified citation across Google Gemini, OpenAI ChatGPT, and Perplexity Search."
    },
    116: {
      scene: "2026 Custom B2B Website Pricing Transparency",
      prompt: "Studio flat-lay of an executive web development investment proposal on a dark slate table: clear fixed-price sprint pricing ($10k-$30k), zero hidden fees, milestone deliverables, and a 100% money-back guarantee clause."
    },
    117: {
      scene: "Enterprise React vs Legacy WordPress Migration",
      prompt: "Studio photograph of an engineering migration sprint in progress: migrating a legacy, slow WordPress database to a lightning-fast React Next.js server components architecture with automated speed improvements."
    },
    118: {
      scene: "5 Silent Website Deal Killers Diagnostic",
      prompt: "Commercial photo of an executive website diagnostic screen highlighting the 5 silent deal killers: 4+ second load times, generic stock photos, buried contact forms, missing pricing context, and poor mobile layout."
    },
    119: {
      scene: "Executive 2026 Website Redesign Checklist",
      prompt: "Studio flat-lay of a premium debossed leather binder titled 'B2B Founder's 2026 Web Redesign Checklist', open to show Core Web Vitals benchmarks, high-converting copy frameworks, and mobile procurement requirements."
    },
    120: {
      scene: "The Zero-Lead B2B Website Turnaround Protocol",
      prompt: "Commercial photoshoot of a tech founder looking at an analytics dashboard undergoing a dramatic turnaround: monthly inbound qualified demo requests surging from 0 to 45+ leads after launching a custom React conversion engine."
    }
  };

  const defaultPrompt = promptsMap[id] || {
    scene: "Executive Digital Strategy Studio",
    prompt: `Commercial studio photoshoot of a high-end B2B tech workspace on a dark obsidian desk. A bezel-less Apple Studio Display features an ultra-clean digital dashboard for ${title}. Subtle satin gold accents (#C9A84C), ambient directional lighting, crisp typography, shot on 85mm f/1.4 lens, 8k resolution, luxury corporate tech aesthetic, zero AI artifacts.`
  };

  return defaultPrompt;
}

async function run() {
  console.log('Generating 120 unique, professional Pomelli photoshoot prompts...');

  let mdContent = `# 📸 Pomelli Photoshoot & Commercial Image Prompts for All 120 Rankur Blogs
**Comprehensive, Professional Studio Prompts for Google Labs Pomelli / Photoshoot Studio**

> **Brand DNA & Photoshoot Guidelines:**
> • **Primary Palette:** Matte Obsidian Black (\`#0A0A0A\`), Satin Gold (\`#C9A84C\`), Warm Amber Glow (\`#F59E0B\`), Deep Slate (\`#1E293B\`), Clean Pure White.
> • **Tone & Aesthetic:** Architectural Digest meets high-end B2B engineering and fintech. Executive, crisp, tactile, commercial credibility.
> • **Zero AI Artifacts:** No cheesy stock-photo handshakes, no glowing cartoon brains, no neon spaghetti, no plastic skin. Real commercial studio photography with natural textures and realistic depth of field.
> • **Recommended Optics:** 85mm f/1.4 or 50mm f/1.8 lens, Hasselblad 100MP clarity, soft directional studio lighting, natural window fill light, subtle golden rim highlights.
> • **Aspect Ratio:** 16:9 (Landscape Editorial Blog Cover & Medium Header) or 1200x630 (Social OpenGraph).

---

`;

  for (let i = 0; i < parsedBlogs.length; i++) {
    const blog = parsedBlogs[i];
    const { id, title, category } = blog;
    const { scene, prompt } = generatePomelliPrompt(blog);

    mdContent += `### Blog ${id}: ${title}\n`;
    mdContent += `* **Category / Industry:** ${category}\n`;
    mdContent += `* **Photoshoot Scene:** ${scene}\n`;
    mdContent += `* **Target Aspect Ratio:** 16:9 (Landscape Editorial)\n`;
    mdContent += `* **Pomelli Prompt:**\n`;
    mdContent += `\`\`\`text\n${prompt}\n\`\`\`\n\n`;
  }

  // Save in prototype/promotions/
  const targetPrototype = path.resolve(__dirname, '../promotions/POMELLI_IMAGE_PROMPTS_FOR_ALL_BLOGS.md');
  fs.writeFileSync(targetPrototype, mdContent, 'utf-8');
  console.log('Saved to:', targetPrototype);

  // Mirror to root promotions/ and root
  const rootPromotionsDir = path.resolve(__dirname, '../../promotions');
  if (!fs.existsSync(rootPromotionsDir)) fs.mkdirSync(rootPromotionsDir, { recursive: true });
  const targetRootPromotions = path.resolve(rootPromotionsDir, 'POMELLI_IMAGE_PROMPTS_FOR_ALL_BLOGS.md');
  fs.writeFileSync(targetRootPromotions, mdContent, 'utf-8');
  console.log('Mirrored to:', targetRootPromotions);

  const targetRoot = path.resolve(__dirname, '../../POMELLI_IMAGE_PROMPTS_FOR_ALL_BLOGS.md');
  fs.writeFileSync(targetRoot, mdContent, 'utf-8');
  console.log('Mirrored to root:', targetRoot);

  console.log('✓ Successfully created Pomelli prompts for all 120 blogs!');
}

run();
