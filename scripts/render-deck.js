import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const logoBannerDarkPath = path.join(publicDir, 'logo-banner-dark.png');
const logoSquareDarkPath = path.join(publicDir, 'logo-square-dark.png');
const logoSquareLightPath = path.join(publicDir, 'logo-square-light.png');

console.log('Reading logo files...');
const logoBannerDarkBase64 = fs.readFileSync(logoBannerDarkPath).toString('base64');
const logoSquareDarkBase64 = fs.readFileSync(logoSquareDarkPath).toString('base64');
const logoSquareLightBase64 = fs.readFileSync(logoSquareLightPath).toString('base64');

const logoBannerDarkDataUri = `data:image/png;base64,${logoBannerDarkBase64}`;
const logoSquareDarkDataUri = `data:image/png;base64,${logoSquareDarkBase64}`;
const logoSquareLightDataUri = `data:image/png;base64,${logoSquareLightBase64}`;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RankurSite.com - B2B Growth Infrastructure Company Profile</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400;1,600&display=swap');

    @page {
      size: 1920px 1080px;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #080A0E;
      color: #F5F5F5;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      padding: 0;
    }

    .slide {
      width: 1920px;
      height: 1080px;
      padding: 85px 120px;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* THEME: DARK SLIDE */
    .slide--dark {
      background-color: #080A0E;
      color: #F5F5F5;
    }

    /* THEME: LIGHT SLIDE */
    .slide--light {
      background-color: #F9F9F8;
      color: #1A1A1A;
    }

    /* DECORATIVE ELEMENTS */
    .slide--dark::after {
      content: '';
      position: absolute;
      right: -100px;
      top: -100px;
      width: 700px;
      height: 700px;
      border: 1px solid rgba(201, 168, 76, 0.08);
      border-radius: 50%;
      pointer-events: none;
    }

    .slide--dark::before {
      content: '';
      position: absolute;
      right: -250px;
      top: -250px;
      width: 1000px;
      height: 1000px;
      border: 1px solid rgba(201, 168, 76, 0.04);
      border-radius: 50%;
      pointer-events: none;
    }

    .slide--light::after {
      content: '';
      position: absolute;
      right: -150px;
      bottom: -150px;
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(201, 168, 76, 0.06) 0%, rgba(249, 249, 248, 0) 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    /* TOP RIGHT BRAND HEADER FOR SLIDES 2-12 */
    .slide-top-brand {
      position: absolute;
      top: 75px;
      right: 120px;
      display: flex;
      align-items: center;
      gap: 14px;
      z-index: 10;
    }

    .slide-top-brand img {
      height: 42px;
      width: auto;
      object-fit: contain;
    }

    .slide-top-brand span {
      font-family: 'Cinzel', serif;
      font-size: 17px;
      font-weight: 800;
      letter-spacing: 0.18em;
    }

    .slide--dark .slide-top-brand span {
      color: #C9A84C;
    }

    .slide--light .slide-top-brand span {
      color: #111111;
    }

    /* TYPOGRAPHY */
    .eyebrow {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    .slide--dark .eyebrow {
      color: #C9A84C;
    }

    .slide--light .eyebrow {
      color: #C9A84C;
    }

    .gold-line {
      width: 75px;
      height: 4px;
      background-color: #C9A84C;
      margin-bottom: 30px;
    }

    .title-serif {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 54px;
      line-height: 1.18;
      font-weight: 700;
      margin-bottom: 22px;
    }

    .slide--dark .title-serif {
      color: #FFFFFF;
    }

    .slide--light .title-serif {
      color: #111111;
    }

    .text-gold {
      color: #C9A84C;
    }

    .lead-p {
      font-size: 21.5px;
      line-height: 1.65;
      max-width: 1280px;
      margin-bottom: 24px;
    }

    .slide--dark .lead-p {
      color: #A0AEC0;
    }

    .slide--light .lead-p {
      color: #4A5568;
    }

    /* BADGES */
    .badge-grid-6 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 35px;
      max-width: 1250px;
    }

    .badge-card {
      border: 1px solid rgba(201, 168, 76, 0.3);
      background: rgba(18, 22, 30, 0.85);
      padding: 16px 22px;
      border-radius: 6px;
      text-align: center;
      font-size: 15.5px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #FFFFFF;
      text-transform: uppercase;
    }

    /* CALLOUT BOX */
    .callout-dark {
      background: #0D111A;
      border-left: 5px solid #C9A84C;
      padding: 28px 38px;
      border-radius: 0 8px 8px 0;
      margin-top: 25px;
    }

    .callout-dark p {
      font-family: 'Playfair Display', Georgia, serif;
      font-style: italic;
      font-size: 25px;
      color: #FFFFFF;
      margin: 0;
    }

    /* 3 COLUMNS */
    .three-cols {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 35px;
      margin-top: 25px;
      flex-grow: 1;
    }

    .col-card-dark {
      background: rgba(16, 20, 28, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 35px 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-meta-tag {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #C9A84C;
      margin-bottom: 12px;
      display: block;
    }

    .card-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 15px;
      line-height: 1.3;
      color: #FFFFFF;
    }

    .card-desc {
      font-size: 16px;
      line-height: 1.65;
      margin-bottom: 20px;
      flex-grow: 1;
      color: #A0AEC0;
    }

    .card-footer-metric {
      padding-top: 20px;
      border-top: 1px solid rgba(201, 168, 76, 0.25);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-metric-val {
      font-size: 22px;
      font-weight: 800;
      color: #C9A84C;
    }

    .card-metric-lbl {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #718096;
    }

    /* 4 COLUMNS */
    .four-cols {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-top: 25px;
      flex-grow: 1;
    }

    .four-col-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 30px 22px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }

    .pill-tag-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 15px 0 20px 0;
    }

    .pill-tag {
      background: #F4F6F8;
      border: 1px solid #E2E8F0;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 600;
      color: #2D3748;
      text-align: center;
    }

    .card-body-text {
      font-size: 14.5px;
      line-height: 1.65;
      color: #4A5568;
      margin-top: auto;
    }

    /* BIG STATS ROW */
    .stats-row {
      display: flex;
      gap: 90px;
      margin-top: 45px;
    }

    .stat-block {
      display: flex;
      flex-direction: column;
    }

    .stat-number {
      font-size: 64px;
      font-weight: 800;
      color: #C9A84C;
      line-height: 1;
      margin-bottom: 12px;
      font-family: 'Playfair Display', Georgia, serif;
    }

    .stat-label {
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #A0AEC0;
      max-width: 260px;
      line-height: 1.5;
    }

    /* CAPABILITIES 3 COLUMNS */
    .cap-cols {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 50px;
      margin-top: 40px;
      flex-grow: 1;
    }

    .cap-col {
      display: flex;
      flex-direction: column;
    }

    .cap-number {
      font-size: 50px;
      font-weight: 800;
      font-family: 'Playfair Display', Georgia, serif;
      margin-bottom: 20px;
      line-height: 1;
    }

    .slide--light .cap-number {
      color: #CBD5E0;
    }

    .slide--dark .cap-number {
      color: #4A5568;
    }

    .cap-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    .slide--dark .cap-title {
      color: #FFFFFF;
    }

    .slide--light .cap-title {
      color: #111111;
    }

    .cap-desc {
      font-size: 17px;
      line-height: 1.65;
    }

    .slide--dark .cap-desc {
      color: #A0AEC0;
    }

    .slide--light .cap-desc {
      color: #4A5568;
    }

    /* FOUNDER SPLIT */
    .split-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      margin-top: 25px;
      align-items: start;
    }

    .stack-cards {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .stack-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 18px 24px;
      font-size: 16px;
      line-height: 1.5;
      color: #2D3748;
      font-weight: 500;
      box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    }

    /* FOOTER STRIP IN SLIDES */
    .slide-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 18px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 13px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .slide--light .slide-footer {
      border-top-color: #E2E8F0;
      color: #718096;
    }

    .slide--dark .slide-footer {
      color: #718096;
    }
  </style>
</head>
<body>

  <!-- ==========================================
       SLIDE 1: COVER (DARK)
       ========================================== -->
  <section class="slide slide--dark">
    <div>
      <div style="margin-bottom: 25px;">
        <img src="${logoBannerDarkDataUri}" alt="RankurSite.com Logo" style="height: 135px; width: auto; max-width: 480px; object-fit: contain; filter: drop-shadow(0 10px 25px rgba(0,0,0,0.7));" />
      </div>
      <div class="eyebrow" style="color: #C9A84C; margin-bottom: 25px;">
        B 2 B &nbsp; G R O W T H &nbsp; I N F R A S T R U C T U R E &nbsp; S T U D I O
      </div>
      <div class="gold-line"></div>
      <h1 class="title-serif" style="font-size: 58px; max-width: 1400px;">
        We build your website. <span class="text-gold">To bring in real, high-value B2B leads.</span>
      </h1>
      <p class="lead-p">
        RankurSite.com is a founder-led B2B growth infrastructure studio operated under MSME-registered Moksh Productions. We design, position, and deploy enterprise digital platforms that rank at the top of Google and AI search, turning global procurement visitors into qualified sales pipeline.
      </p>
    </div>

    <div>
      <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: #C9A84C; margin-bottom: 14px;">
        V E R I F I E D &nbsp; C L I E N T &nbsp; P E R F O R M A N C E &nbsp; C R E D E N T I A L S
      </div>
      <div class="badge-grid-6">
        <div class="badge-card">2,280+ Pages Live in Production</div>
        <div class="badge-card">Sub-Second Global Page Speed</div>
        <div class="badge-card">Google + AI Search Visibility</div>
        <div class="badge-card">MSME-Registered Enterprise (India)</div>
        <div class="badge-card">Mutual NDA Protected</div>
        <div class="badge-card">100% Money-Back Guarantee</div>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · FOUNDER-LED B2B GROWTH INFRASTRUCTURE</span>
      <span>CONFIDENTIAL DECK · 01 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 2: THE PROBLEM WE SOLVED (LIGHT)
       ========================================== -->
  <section class="slide slide--light">
    <div class="slide-top-brand">
      <img src="${logoSquareLightDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div>
      <div class="eyebrow">T H E &nbsp; P R O B L E M &nbsp; W E &nbsp; S O L V E D</div>
      <div class="gold-line"></div>
      <h2 class="title-serif">
        Conventional B2B websites fail before buyers ever get in touch.
      </h2>
      <p class="lead-p">
        Most B2B websites act as digital brochures that nobody visits. They take 4 to 6 seconds to load, fail to rank for high-intent searches, and confuse buyers with generic corporate jargon. By the time a qualified procurement officer arrives, over 70% have already bounced to a competitor.
      </p>
      <p class="lead-p">
        RankurSite.com eliminates this failure mode entirely. We engineer high-speed digital infrastructure that positions your company as the obvious market choice. With sub-second load times anywhere in the world, top-tier discoverability across Google and AI search engines, and automated RFQ capture, we turn your website into your highest-performing salesperson.
      </p>
      <div class="callout-dark">
        <p>This is not a marketing claim. It is verified in production across 2,280+ live client pages.</p>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · THE PROBLEM WE SOLVED</span>
      <span>02 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 3: OUR VERIFIED DEPLOYMENTS (DARK)
       ========================================== -->
  <section class="slide slide--dark">
    <div class="slide-top-brand">
      <img src="${logoSquareDarkDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div>
      <div class="eyebrow">O U R &nbsp; V E R I F I E D &nbsp; D E P L O Y M E N T S</div>
      <div class="gold-line"></div>
      <h2 class="title-serif">
        Three Platforms. <span class="text-gold">Over 1,940 static pages driving daily leads.</span>
      </h2>
      <div class="three-cols">
        <!-- WizIOT -->
        <div class="col-card-dark">
          <div>
            <span class="card-meta-tag">IoT &amp; FLEET TELEMATICS · EMEA &amp; GCC</span>
            <div class="card-title">WizIOT</div>
            <div style="font-size: 13px; color: #C9A84C; font-weight: 700; margin-bottom: 14px;">Enterprise Fleet Infrastructure</div>
            <div class="card-desc">
              Expansive enterprise platform engineered to present complex sensor protocols, fuel monitors, and telematics hardware across Africa, GCC, and Europe. Delivers sub-0.9s load times with zero server lag and direct live footer backlink verification.
            </div>
          </div>
          <div class="card-footer-metric">
            <span class="card-metric-val">1,040+</span>
            <span class="card-metric-lbl">Static Pages Live</span>
          </div>
        </div>

        <!-- Atlanta Systems -->
        <div class="col-card-dark">
          <div>
            <span class="card-meta-tag">AUTOMOTIVE MANUFACTURING · AIS-140</span>
            <div class="card-title">Atlanta Systems</div>
            <div style="font-size: 13px; color: #C9A84C; font-weight: 700; margin-bottom: 14px;">Automotive Hardware Leader</div>
            <div class="card-desc">
              High-performance infrastructure dominating AIS-140 compliance searches for India's leading automotive GPS manufacturer. Achieved 100% crawl indexation on regulatory terms and automated institutional RFQ pipelines.
            </div>
          </div>
          <div class="card-footer-metric">
            <span class="card-metric-val">460+</span>
            <span class="card-metric-lbl">Static Pages Live</span>
          </div>
        </div>

        <!-- Medventa -->
        <div class="col-card-dark">
          <div>
            <span class="card-meta-tag">B2B HEALTHCARE COMMERCE · SURGICAL</span>
            <div class="card-title">Medventa</div>
            <div style="font-size: 13px; color: #C9A84C; font-weight: 700; margin-bottom: 14px;">Hospital Procurement Catalog</div>
            <div class="card-desc">
              Lightning-fast medical supplies platform covering 440+ surgical suture and healthcare SKUs. Enables hospital purchase officers to filter technical needle dimensions and submit bulk institutional quotes in seconds.
            </div>
          </div>
          <div class="card-footer-metric">
            <span class="card-metric-val">440+</span>
            <span class="card-metric-lbl">Static SKUs Live</span>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · VERIFIED CLIENT DEPLOYMENTS</span>
      <span>03 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 4: PORTFOLIO TRANSITION (DARK)
       ========================================== -->
  <section class="slide slide--dark" style="justify-content: center; position: relative;">
    <div class="slide-top-brand">
      <img src="${logoSquareDarkDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div style="max-width: 1200px;">
      <div class="eyebrow">O U R &nbsp; C A P A B I L I T I E S &nbsp; P O R T F O L I O</div>
      <div class="gold-line"></div>
      <h2 class="title-serif" style="font-size: 64px; line-height: 1.15; margin-bottom: 30px;">
        Infrastructure engineered to maximize <br>
        <span class="text-gold">qualified enterprise pipeline.</span>
      </h2>
      <p class="lead-p" style="font-size: 24px;">
        Every capability below is built around one single objective: generating closed-won revenue for your business. We combine sharp commercial positioning, sub-second speed, and AI search dominance to position your brand as the obvious partner for high-ticket contracts.
      </p>
    </div>

    <div style="position: absolute; right: 140px; top: 50%; transform: translateY(-50%); width: 380px; height: 380px; border-radius: 50%; border: 2px solid rgba(201, 168, 76, 0.25); display: flex; align-items: center; justify-content: center;">
      <div style="width: 320px; height: 320px; border-radius: 50%; border: 1px dashed rgba(201, 168, 76, 0.4); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px;">
        <span style="font-size: 36px; font-weight: 800; color: #C9A84C;">2,280+</span>
        <span style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.15em; color: #A0AEC0; margin-top: 6px;">Live Production Pages</span>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · CAPABILITIES OVERVIEW</span>
      <span>04 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 5: SERVICE PORTFOLIO 1 OF 2 (LIGHT)
       ========================================== -->
  <section class="slide slide--light">
    <div class="slide-top-brand">
      <img src="${logoSquareLightDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div>
      <div class="eyebrow">C O R E &nbsp; C A P A B I L I T I E S &nbsp; ( 1 &nbsp; O F &nbsp; 2 )</div>
      <div class="gold-line" style="margin-bottom: 20px;"></div>
      <div class="four-cols">
        <!-- Card 1 -->
        <div class="four-col-card">
          <h3 style="font-size: 22px; font-weight: 700; color: #111;">Ultra-Fast B2B Web Build</h3>
          <span style="font-size: 13px; color: #718096; margin-top: 4px;">Sub-Second Core Speed</span>
          <div class="pill-tag-group">
            <span class="pill-tag">Sub-1.2s Global Speed</span>
            <span class="pill-tag">Zero Page-Builder Lag</span>
            <span class="pill-tag">100% Custom Tailored</span>
          </div>
          <p class="card-body-text">
            Engineered from the ground up for maximum speed and security. Loads instantly anywhere in the world, with automated lead pipelines flowing directly into your sales CRM.
          </p>
        </div>

        <!-- Card 2 -->
        <div class="four-col-card">
          <h3 style="font-size: 22px; font-weight: 700; color: #111;">AI Search &amp; GEO Dominance</h3>
          <span style="font-size: 13px; color: #718096; margin-top: 4px;">Generative Engine Optimization</span>
          <div class="pill-tag-group">
            <span class="pill-tag">ChatGPT &amp; Perplexity</span>
            <span class="pill-tag">Knowledge Graph Priming</span>
            <span class="pill-tag">AI Citation Authority</span>
          </div>
          <p class="card-body-text">
            When procurement executives ask AI engines for top vendor recommendations, our structured knowledge graph ensures your company is cited and recommended as the authority.
          </p>
        </div>

        <!-- Card 3 -->
        <div class="four-col-card">
          <h3 style="font-size: 22px; font-weight: 700; color: #111;">High-Intent B2B SEO</h3>
          <span style="font-size: 13px; color: #718096; margin-top: 4px;">Bottom-of-Funnel Intent</span>
          <div class="pill-tag-group">
            <span class="pill-tag">Buyer Searches Only</span>
            <span class="pill-tag">100% Crawl Indexation</span>
            <span class="pill-tag">Zero Vanity Traffic</span>
          </div>
          <p class="card-body-text">
            We target commercial keywords that represent active buyer intent. We bypass irrelevant search traffic to capture procurement directors ready to sign vendor contracts.
          </p>
        </div>

        <!-- Card 4 -->
        <div class="four-col-card">
          <h3 style="font-size: 22px; font-weight: 700; color: #111;">Conversion Rate Systems</h3>
          <span style="font-size: 13px; color: #718096; margin-top: 4px;">Visitor-to-Lead Engines</span>
          <div class="pill-tag-group">
            <span class="pill-tag">Friction Teardowns</span>
            <span class="pill-tag">Dynamic RFQ Forms</span>
            <span class="pill-tag">Behavioral Funnel Tracking</span>
          </div>
          <p class="card-body-text">
            Traffic without inquiries is wasted spend. We eliminate every point of hesitation in your forms and layout, routinely doubling conversion rates without increasing marketing spend.
          </p>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · CORE CLIENT CAPABILITIES</span>
      <span>05 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 6: SERVICE PORTFOLIO 2 OF 2 (LIGHT)
       ========================================== -->
  <section class="slide slide--light">
    <div class="slide-top-brand">
      <img src="${logoSquareLightDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div>
      <div class="eyebrow">G R O W T H &nbsp; &amp; &nbsp; A U T H O R I T Y &nbsp; ( 2 &nbsp; O F &nbsp; 2 )</div>
      <div class="gold-line" style="margin-bottom: 20px;"></div>
      <div class="four-cols">
        <!-- Card 1 -->
        <div class="four-col-card">
          <h3 style="font-size: 22px; font-weight: 700; color: #111;">Executive Thought Leadership</h3>
          <span style="font-size: 13px; color: #718096; margin-top: 4px;">C-Suite Authority</span>
          <div class="pill-tag-group">
            <span class="pill-tag">Founder Personal Brand</span>
            <span class="pill-tag">Executive Trust Building</span>
            <span class="pill-tag">Organic Deal Inflow</span>
          </div>
          <p class="card-body-text">
            Buyers vet founders before signing six-figure contracts. We deploy authoritative B2B content that builds credibility with executives before your first sales conversation.
          </p>
        </div>

        <!-- Card 2 -->
        <div class="four-col-card">
          <h3 style="font-size: 22px; font-weight: 700; color: #111;">Global Export Channels</h3>
          <span style="font-size: 13px; color: #718096; margin-top: 4px;">International Sourcing</span>
          <div class="pill-tag-group">
            <span class="pill-tag">Alibaba Partner Expertise</span>
            <span class="pill-tag">Cross-Border Funnels</span>
            <span class="pill-tag">Wholesale Distributor RFQs</span>
          </div>
          <p class="card-body-text">
            Drawing on our official Alibaba channel partner background, we structure digital pipelines that connect domestic manufacturers with international buyers in the US, UK, and GCC.
          </p>
        </div>

        <!-- Card 3 -->
        <div class="four-col-card">
          <h3 style="font-size: 22px; font-weight: 700; color: #111;">High-Ticket Conversion Funnels</h3>
          <span style="font-size: 13px; color: #718096; margin-top: 4px;">Performance Acquisition</span>
          <div class="pill-tag-group">
            <span class="pill-tag">Bridge Landing Pages</span>
            <span class="pill-tag">Qualified Pipeline</span>
            <span class="pill-tag">Custom GA4 Tracking</span>
          </div>
          <p class="card-body-text">
            Validated across high-converting platforms like Glitchy (200+ paying customers, 900+ leads), we design bridge pages and redirect engines that turn cold traffic into sales calls.
          </p>
        </div>

        <!-- Card 4 -->
        <div class="four-col-card">
          <h3 style="font-size: 22px; font-weight: 700; color: #111;">Global Edge Performance</h3>
          <span style="font-size: 13px; color: #718096; margin-top: 4px;">Zero Latency Networks</span>
          <div class="pill-tag-group">
            <span class="pill-tag">LCP Under 0.9s Globally</span>
            <span class="pill-tag">280+ City Edge CDN</span>
            <span class="pill-tag">Enterprise Security</span>
          </div>
          <p class="card-body-text">
            We distribute your website across 280+ global cities with automated DDoS protection, SSL encryption, and instant caching, ensuring international buyers experience zero latency.
          </p>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · GROWTH &amp; AUTHORITY SYSTEMS</span>
      <span>06 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 7: WHY RANKURSITE / MANIFESTO (DARK)
       ========================================== -->
  <section class="slide slide--dark">
    <div class="slide-top-brand">
      <img src="${logoSquareDarkDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div>
      <div class="eyebrow">W H Y &nbsp; R A N K U R S I T E . C O M ?</div>
      <div class="gold-line"></div>
      <h2 class="title-serif" style="font-size: 60px;">
        The question worth asking <br>
        <span class="text-gold">before you hire an agency.</span>
      </h2>
      <p class="lead-p" style="font-size: 24px; color: #CBD5E0; line-height: 1.6;">
        Most agencies focus on producing pretty mockups and reporting vanity clicks.<br>
        <strong>We focus on advancing what digital infrastructure actually generates.</strong><br><br>
        From deploying 2,000+ pages that never crash to priming platforms for AI search engines, modern B2B growth demands more than generic templates — it requires engineered solutions.<br><br>
        Because in enterprise B2B, differentiation isn't about what you claim.<br>
        <span class="text-gold" style="font-weight: 700;">It's about what actually performs when real buyers search.</span>
      </p>

      <div class="stats-row">
        <div class="stat-block">
          <span class="stat-number">2,280+</span>
          <span class="stat-label">Static Pages Live in Active Production</span>
        </div>
        <div class="stat-block">
          <span class="stat-number">5</span>
          <span class="stat-label">Verified Production Client Deployments</span>
        </div>
        <div class="stat-block">
          <span class="stat-number">&lt; 0.9s</span>
          <span class="stat-label">Global Largest Contentful Paint (LCP) Benchmark</span>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · OPERATING MANIFESTO</span>
      <span>07 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 8: CAPABILITIES 01, 02, 03 (LIGHT)
       ========================================== -->
  <section class="slide slide--light">
    <div class="slide-top-brand">
      <img src="${logoSquareLightDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div>
      <div class="eyebrow">O U R &nbsp; C A P A B I L I T I E S &nbsp; — &nbsp; T H E &nbsp; A D V A N T A G E</div>
      <div class="gold-line"></div>
      <div class="cap-cols">
        <!-- 01 -->
        <div class="cap-col">
          <div class="cap-number">01</div>
          <div class="gold-line" style="width: 40px; height: 3px; margin-bottom: 20px;"></div>
          <div class="cap-title">Massive Scale Without Crashing</div>
          <p class="cap-desc">
            Our high-performance architecture pre-renders thousands of static pages with zero server lag. As proven on WizIOT (1,040+ pages) and Atlanta Systems (460+ pages), your website never slows down or crashes during sudden traffic surges.
          </p>
        </div>

        <!-- 02 -->
        <div class="cap-col">
          <div class="cap-number">02</div>
          <div class="gold-line" style="width: 40px; height: 3px; margin-bottom: 20px;"></div>
          <div class="cap-title">AI Search &amp; GEO Visibility</div>
          <p class="cap-desc">
            Traditional SEO only targets Google blue links. We build structured knowledge graphs and entity models that force generative AI models (ChatGPT, Perplexity, Claude) to cite your brand when buyers ask for vendor recommendations.
          </p>
        </div>

        <!-- 03 -->
        <div class="cap-col">
          <div class="cap-number">03</div>
          <div class="gold-line" style="width: 40px; height: 3px; margin-bottom: 20px;"></div>
          <div class="cap-title">Verified Live Provenance</div>
          <p class="cap-desc">
            We don't hide behind empty claims without proof. Prospective clients can inspect live production platforms (WizIOT, Atlanta Systems, Medventa, Probiota Innovations) and click through the verified <em>"Designed and built by Rankur"</em> (RankurSite.com) footer links.
          </p>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · CAPABILITIES BREAKDOWN</span>
      <span>08 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 9: CAPABILITIES 04, 05, 06 (DARK)
       ========================================== -->
  <section class="slide slide--dark">
    <div class="slide-top-brand">
      <img src="${logoSquareDarkDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div>
      <div class="eyebrow">O U R &nbsp; C A P A B I L I T I E S &nbsp; ( C O N T I N U E D )</div>
      <div class="gold-line"></div>
      <div class="cap-cols">
        <!-- 04 -->
        <div class="cap-col">
          <div class="cap-number">04</div>
          <div class="gold-line" style="width: 40px; height: 3px; margin-bottom: 20px;"></div>
          <div class="cap-title">Rapid 7–14 Day Delivery Sprint</div>
          <p class="cap-desc">
            While traditional agencies take 4 to 6 months in endless committee meetings, RankurSite.com executes the entire build sprint in 7 to 14 days. We eliminate agency bureaucracy so your business begins capturing inbound leads immediately.
          </p>
        </div>

        <!-- 05 -->
        <div class="cap-col">
          <div class="cap-number">05</div>
          <div class="gold-line" style="width: 40px; height: 3px; margin-bottom: 20px;"></div>
          <div class="cap-title">Founder-Led Execution</div>
          <p class="cap-desc">
            Every engagement is personally designed, structured, and deployed by founder Moksh Parjapati. You never get handed off to a junior account manager. You speak directly to the strategist driving your digital acquisition.
          </p>
        </div>

        <!-- 06 -->
        <div class="cap-col">
          <div class="cap-number">06</div>
          <div class="gold-line" style="width: 40px; height: 3px; margin-bottom: 20px;"></div>
          <div class="cap-title">100% Money-Back Guarantee</div>
          <p class="cap-desc">
            We remove all risk from the engagement. If your custom website does not achieve the speed benchmarks, search indexation quality, and conversion standards agreed upon, we refund 100% of your investment. Zero debate.
          </p>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · CAPABILITIES BREAKDOWN</span>
      <span>09 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 10: FOUNDER & LEADERSHIP (LIGHT)
       ========================================== -->
  <section class="slide slide--light">
    <div class="slide-top-brand">
      <img src="${logoSquareLightDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div>
      <div class="eyebrow">T H E &nbsp; L E A D E R S H I P &nbsp; B E H I N D &nbsp; T H E &nbsp; S T U D I O</div>
      <div class="gold-line"></div>
      <div class="split-layout">
        <!-- Left Column -->
        <div>
          <h2 class="title-serif" style="font-size: 50px; line-height: 1.15; margin-bottom: 15px;">
            Built by a strategist.<br>
            Not by account managers.
          </h2>
          <div style="font-size: 26px; font-weight: 700; color: #111;">Moksh Parjapati</div>
          <div style="font-size: 16px; color: #C9A84C; font-weight: 600; margin-bottom: 25px;">
            Founder &amp; B2B Growth Consultant | RankurSite.com &amp; Moksh Productions
          </div>

          <div style="border-left: 4px solid #C9A84C; padding: 20px 24px; background: rgba(0,0,0,0.03); margin-bottom: 25px;">
            <p style="font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 20px; color: #2D3748; line-height: 1.6;">
              "We do not build generic digital brochures. We build high-speed revenue engines. And we do it with uncompromising technical integrity."
            </p>
          </div>

          <p style="font-size: 16px; line-height: 1.7; color: #4A5568;">
            This principle guides every decision at RankurSite.com. We operate as an elite growth partner. Your brand, your market, your equity. We provide the architecture, the search visibility, the compliance foundation, and the lead generation muscle.
          </p>
        </div>

        <!-- Right Column Stack -->
        <div class="stack-cards">
          <div class="stack-card">
            Founder &amp; Principal Architect behind 2,280+ static pages in active production
          </div>
          <div class="stack-card">
            Official Google Analytics 4 (GA4) Certified Growth Consultant
          </div>
          <div class="stack-card">
            Digital Deepak Marketing Mastery Certified &amp; Commercial Strategist
          </div>
          <div class="stack-card">
            Executive Channel Partner &amp; Sourcing Integrator with official Alibaba channels
          </div>
          <div class="stack-card">
            High-speed custom infrastructure expertise delivering sub-second global performance
          </div>
          <div class="stack-card">
            Proven track record delivering qualified enterprise pipeline across US, UK, Australia, and GCC
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · LEADERSHIP &amp; EXPERTISE</span>
      <span>10 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 11: INSTITUTIONAL CREDENTIALS (DARK)
       ========================================== -->
  <section class="slide slide--dark">
    <div class="slide-top-brand">
      <img src="${logoSquareDarkDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div>
      <div class="eyebrow">I N S T I T U T I O N A L &nbsp; C R E D E N T I A L S</div>
      <div class="gold-line"></div>
      <h2 class="title-serif">
        Infrastructure built for global enterprises.
      </h2>
      <p class="lead-p">
        RankurSite.com operates as an official division of Moksh Productions. Every engagement is backed by formal government registrations, enterprise confidentiality agreements, and modern cloud deployment standards.
      </p>

      <div class="three-cols" style="margin-top: 45px;">
        <div class="col-card-dark" style="padding: 45px 35px;">
          <span class="card-meta-tag">GOVERNMENT OF INDIA</span>
          <div class="card-title" style="font-size: 32px; color: #C9A84C;">MSME REGISTERED</div>
          <div class="gold-line" style="width: 50px; height: 3px; margin: 15px 0;"></div>
          <p class="card-desc" style="font-size: 18px;">
            Registered enterprise under Moksh Productions with the Ministry of Micro, Small and Medium Enterprises, ensuring institutional accountability and billing integrity.
          </p>
        </div>

        <div class="col-card-dark" style="padding: 45px 35px;">
          <span class="card-meta-tag">LEGAL CONFIDENTIALITY</span>
          <div class="card-title" style="font-size: 32px; color: #C9A84C;">MUTUAL NDA</div>
          <div class="gold-line" style="width: 50px; height: 3px; margin: 15px 0;"></div>
          <p class="card-desc" style="font-size: 18px;">
            Strict contract protection. We execute mutual non-disclosure agreements before reviewing proprietary formulas, commercial supply chains, or enterprise CRM metrics.
          </p>
        </div>

        <div class="col-card-dark" style="padding: 45px 35px;">
          <span class="card-meta-tag">GLOBAL CDN DEPLOYMENT</span>
          <div class="card-title" style="font-size: 32px; color: #C9A84C;">EDGE SECURITY</div>
          <div class="gold-line" style="width: 50px; height: 3px; margin: 15px 0;"></div>
          <p class="card-desc" style="font-size: 18px;">
            Enterprise edge network distribution across 280+ global cities with automated SSL/TLS encryption, DDoS protection, and sub-second caching.
          </p>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · CORPORATE COMPLIANCE &amp; SECURITY</span>
      <span>11 / 12</span>
    </div>
  </section>

  <!-- ==========================================
       SLIDE 12: CONTACT & CLOSING (LIGHT)
       ========================================== -->
  <section class="slide slide--light" style="justify-content: space-between;">
    <div class="slide-top-brand">
      <img src="${logoSquareLightDataUri}" alt="RankurSite.com" />
      <span>RANKURSITE.COM</span>
    </div>

    <div>
      <div class="eyebrow">L E T ' S &nbsp; B U I L D &nbsp; S O M E T H I N G &nbsp; T O G E T H E R</div>
      <div class="gold-line"></div>
      <h2 class="title-serif" style="font-size: 64px; line-height: 1.15; max-width: 1200px; margin-bottom: 25px;">
        Your business deserves a website that brings in real leads.
      </h2>
      <p class="lead-p" style="font-size: 26px; font-style: italic; color: #4A5568; margin-bottom: 50px;">
        If you are evaluating digital partners to rebuild your website, optimize conversion rates, or dominate AI search, we welcome a conversation.
      </p>

      <div style="display: flex; flex-direction: column; gap: 24px; font-size: 22px; color: #2D3748; margin-top: 20px;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <span style="font-size: 26px; color: #C9A84C; font-weight: 700;">@</span>
          <a href="mailto:contactus@rankursite.com" style="color: #111; text-decoration: none; font-weight: 600;">contactus@rankursite.com</a>
        </div>

        <div style="display: flex; align-items: center; gap: 20px;">
          <span style="font-size: 26px; color: #C9A84C; font-weight: 700;">☎</span>
          <a href="tel:+919560076090" style="color: #111; text-decoration: none; font-weight: 600;">+91 95600 76090</a>
        </div>

        <div style="display: flex; align-items: center; gap: 20px;">
          <span style="font-size: 26px; color: #C9A84C; font-weight: 700;">◉</span>
          <span>Corporate Entity: Moksh Productions · Headquarters: India · Operating Markets: US · UK · Canada · AU · UAE · Saudi Arabia</span>
        </div>

        <div style="display: flex; align-items: center; gap: 20px;">
          <span style="font-size: 26px; color: #C9A84C; font-weight: 700;">↗</span>
          <span>Free Diagnostic Audit &amp; Verified Proof: <a href="https://rankursite.com/free-audit" style="color: #C9A84C; font-weight: 700; text-decoration: none;">rankursite.com/free-audit</a></span>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span>RANKURSITE.COM · B2B GROWTH INFRASTRUCTURE STUDIO</span>
      <span>12 / 12</span>
    </div>
  </section>

</body>
</html>
`;

const htmlFilePath = path.join(__dirname, 'rankur-deck.html');
fs.writeFileSync(htmlFilePath, htmlContent);
console.log('Successfully wrote rankur-deck.html with embedded base64 logos and full RankurSite.com branding!');

// Print to PDF with Microsoft Edge
const pdfOutputPath = path.join(__dirname, '../RANKUR_COMPANY_PROFILE_DECK.pdf');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

console.log('Rendering PDF via Microsoft Edge headless...');
const cmd = `"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --virtual-time-budget=5000 --no-pdf-header-footer --print-to-pdf="${pdfOutputPath}" "file:///${htmlFilePath.replace(/\\\\/g, '/')}"`;

execSync(cmd, { stdio: 'inherit' });
console.log(`Successfully generated PDF at: ${pdfOutputPath}`);
