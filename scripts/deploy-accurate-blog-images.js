import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const sourceDir = path.join(rootDir, 'images for blogs');
const publicDir = path.join(rootDir, 'public', 'blog-images');
const blogsDir = path.join(rootDir, 'blogs');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const PILLAR_NUM_MAP = {
  115: 'pillar-getting-found-google-chatgpt-perplexity-b2b.md',
  116: 'pillar-how-much-b2b-website-costs-2026.md',
  117: 'pillar-react-vs-wordpress-b2b.md',
  118: 'pillar-signs-website-losing-deals.md',
  119: 'pillar-website-redesign-checklist-founders.md',
  120: 'pillar-why-business-websites-get-zero-leads.md',
};

const allBlogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

// Exact curated mapping of all 120 blogs to their authentic source images
const curatedMap = {
  1: 'Apple_Studio_Display_on_desk_6730cc5a (1).jpg',
  2: 'Executive_tech_consultation_desk…_84fd5a54 (1).jpg',
  3: 'Dual_screen_engineering_workstat…_4e9bd3f5 (1).jpg',
  4: 'Executive_reviewing_AI_search_re…_805c6bf1 (1).jpg',
  5: 'Tech_founder_reading_LinkedIn_me…_460d68b1.jpg',
  6: 'Financial_proposal_and_iPad_display_fd58d646 (1).jpg',
  7: 'Person_holding_tablet_with_growt…_8d829f67 (1).jpg',
  8: 'Monitor_displaying_website_audit…_e2776b0a (1).jpg',
  9: 'MacBook_Pro_showing_scheduling_m…_07e85452 (1).jpg',
  10: 'Digital_tablet_showing_churn_ana…_dc34ea97 (1).jpg',
  11: 'Tablet_displaying_industrial_pro…_209b2d68.jpg',
  12: 'Running_prompt_benchmarks_on_screen_fd81d4b6.jpg',
  13: 'Screen_displaying_semantic_knowl…_42a62807.jpg',
  14: 'MacBook_displaying_Perplexity_Pr…_f5c7f7b8.jpg',
  15: 'Engineer_holding_iPad_with_serve…_7eafef91.jpg',
  16: 'Executive_analytics_dashboard_sh…_c0418e1c.jpg',
  17: 'iPad_Pro_displaying_LinkedIn_art…_f7e440b7.jpg',
  18: 'Display_showing_AI_search_results_89d193fa.jpg',
  19: 'Bar_chart_comparing_sales_results_15b6e66f.jpg',
  20: 'Server_rack_console_displaying_n…_fb7c7b43.jpg',
  21: 'Dual-screen_SEO_comparison_mockup_6f2cea96.jpg',
  22: 'Author_bio_and_editorial_policy_e623cd53.jpg',
  23: 'Magnetic_glass_whiteboard_roadma…_17614c8b.jpg',
  24: 'AI_search_in_boardroom_setting_b6d6646d.jpg',
  25: 'Monitor_displaying_brand_mention…_ffe17905.jpg',
  26: 'SEO_strategy_board_highlighting_…_3174c0e2.jpg',
  27: 'Global_market_console_monitoring…_dbfc9708 (1).jpg',
  28: 'Monitors_displaying_internationa…_fe082141.jpg',
  29: 'CAD_workstation_displaying_RFQ_file_d7074c10.jpg',
  30: 'Dual-screen_lead_nurturing_workf…_8b063407.jpg',
  31: 'Sales_dashboard_displaying_metrics_100b6cae.jpg',
  32: 'Whitepaper_binder_beside_iPad_di…_0758a3ea.jpg',
  33: 'Publishing_workflow_on_display_s…_b94d8ab8.jpg',
  34: 'Case_study_binder_showcasing_tra…_1ec5f4c2.jpg',
  35: '3D_SEO_and_web_funnel_86feed92.jpg',
  36: 'Curved_monitor_displaying_keywor…_edfd5891.jpg',
  37: 'Executive_working_on_laptop_527eb5ac.jpg',
  38: 'Network_visualization_on_interac…_af93a205.jpg',
  39: 'Executive_podcast_and_webinar_st…_45ff4919.jpg',
  40: 'Laptop_showing_engineering_newsl…_30bf9201.jpg',
  41: 'Network_visualization_on_tablet_f85aa43f.jpg',
  42: 'Executive_composing_partnership_…_0ac0837f.jpg',
  43: 'Open_case_study_portfolio_on_0ecfef8b.jpg',
  44: 'IPad_displaying_ROI_calculator_w…_3401c4d8.jpg',
  45: 'Dual_screen_lead_nurturing_workflow_947216fe.jpg',
  46: 'Chart_comparing_traffic_to_sales_3c821d09.jpg',
  47: 'Smartphone_displaying_LinkedIn_c…_47e6df19.jpg',
  48: 'Podcast_studio_with_live_webinar_d03333fc.jpg',
  49: 'Editorial_calendar_on_studio_fla…_68164a19.jpg',
  50: 'Tech_founder_reading_LinkedIn_me…_460d68b1.jpg',
  51: 'iPad_Pro_displaying_metrics_on_e6e6ade5.jpg',
  52: 'Smartphone_displaying_LinkedIn_c…_47e6df19.jpg',
  53: 'IPad_displaying_LinkedIn_article_ce6f742d.jpg',
  54: 'Founder_workspace_with_technical…_51fcc0d0.jpg',
  55: 'Desk_showing_business_growth_met…_79cb22a4.jpg',
  56: 'Editorial_calendar_and_iPad_5f6a2130.jpg',
  57: 'Executive_desk_displaying_analyt…_a3c00597 (1).jpg',
  58: 'Digital_publishing_workflow_on_d…_830af881.jpg',
  59: 'Tech_founder_using_laptop_in_3e600c0e.jpg',
  60: 'Professional_working_late_in_office_00f8c275.jpg',
  61: 'Boardroom_presentation_screen_sh…_36171351.jpg',
  62: 'Smartphone_displaying_LinkedIn_c…_47e6df19.jpg',
  63: 'Podcast_studio_with_live_webinar_d03333fc.jpg',
  64: 'Editorial_calendar_on_studio_fla…_68164a19.jpg',
  65: 'Studio_monitor_showing_brand_men…_15c1529f.jpg',
  66: 'Editorial_calendar_and_iPad_5f6a2130.jpg',
  67: 'Founder_workspace_with_tech_devices_fb2075d4.jpg',
  68: 'Publishing_workflow_on_display_s…_b94d8ab8.jpg',
  69: 'Boardroom_presentation_screen_sh…_36171351.jpg',
  70: 'Professional_working_late_in_office_00f8c275.jpg',
  71: 'Architect_drafting_desk_with_lay…_0f85ef99.jpg',
  72: 'Digital_architecture_blueprint_o…_5dbeef6e.jpg',
  73: 'UX_teardown_session_on_tablet_097540a0.jpg',
  74: 'Comparing_WordPress_and_Next.js_…_9a3a94ed.jpg',
  75: 'Executive_reviewing_global_marke…_236eed7b (1).jpg',
  76: 'iPhone_displaying_B2B_mobile_portal_c69ef451.jpg',
  77: 'Lead_enriching_and_booking_autom…_11b18799.jpg',
  78: 'Binder_showcasing_digital_transf…_35530365.jpg',
  79: 'Enterprise_security_dashboard_di…_9e2da9c7.jpg',
  80: 'Digital_stopwatch_on_keyboard_f040f9d4.jpg',
  81: 'Financial_comparison_sheet_in_fo…_1ecb190d.jpg',
  82: 'Website_personalizing_content_fo…_3b4465d4.jpg',
  83: 'Designing_modern_web_platform_la…_5a61aa6a.jpg',
  84: 'Technical_SEO_crawler_visualizat…_8fddaa43.jpg',
  85: 'Deployment_terminal_during_websi…_2944505c.jpg',
  86: 'Website_featuring_semantic_searc…_834eff2d.jpg',
  87: 'Financial_attribution_model_on_iPad_7587b7f2.jpg',
  88: 'Workspace_showing_competitor_web…_404853f3.jpg',
  89: 'Ultrawide_monitor_displaying_lan…_29d90eca.jpg',
  90: 'Server_console_displaying_global…_a29d479a.jpg',
  91: 'SEO_strategy_board_displaying_ke…_8569e9ad.jpg',
  92: 'Technical_SEO_audit_checklist_fl…_bfc3c7d5.jpg',
  93: 'Keyword_map_on_whiteboard_343a7fad.jpg',
  94: 'Optimizing_industrial_digital_ma…_58e4d47a.jpg',
  95: 'Author_bio_and_editorial_policy_e623cd53.jpg',
  96: 'Backlink_profile_audit_on_display_1bbed042.jpg',
  97: 'Tablet_displaying_industrial_pro…_209b2d68.jpg',
  98: 'Boardroom_screen_showing_revenue…_f0d64443.jpg',
  99: 'Google_search_results_page_visib…_e9b41be4.jpg',
  100: 'Architect_reviewing_digital_cont…_67adda8b (1).jpg',
  101: 'Executive_reviewing_global_marke…_236eed7b (1).jpg',
  102: 'Dual-screen_lead_nurturing_workf…_8b063407.jpg',
  103: 'UX_strategist_analyzing_competit…_5eec6835.jpg',
  104: 'Software_engineer_viewing_IDE_wo…_c3ca2e24.jpg',
  105: 'Desk_with_laptop_and_clock_1ad618f8.jpg',
  106: 'Server_monitoring_station_showin…_10fdfdbc.jpg',
  107: 'SEO_strategy_board_displaying_ke…_8569e9ad.jpg',
  108: 'Digital_audit_report_on_tablet_c027fa3c.jpg',
  109: 'Smart_speaker_on_conference_table_cd4079f4.jpg',
  110: 'Dual_monitor_content_director_wo…_6b2a7468.jpg',
  111: 'Display_showing_AI_search_results_89d193fa.jpg',
  112: 'Strategy_screen_displaying_knowl…_78329abe.jpg',
  113: 'Whitepaper_binder_beside_iPad_di…_0758a3ea.jpg',
  114: 'Dual-screen_SEO_comparison_mockup_6f2cea96.jpg',
  115: 'Devices_displaying_brand_citations_cb7c6063.jpg',
  116: 'Web_development_investment_propo…_1456e189.jpg',
  117: 'Migrating_WordPress_database_to_…_dac1d62e.jpg',
  118: 'Website_diagnostic_screen_highli…_16b21511.jpg',
  119: 'Leather_binder_displaying_redesi…_0c1c4592.jpg',
  120: 'Tech_founder_viewing_analytics_d…_77920a22.jpg',
};

// Parse frontmatter
function parseBlogFrontmatter(file) {
  const p = path.join(blogsDir, file);
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, 'utf8');
  const title = (raw.match(/SEO Title:\s*(.*)/) || raw.match(/title:\s*(.*)/) || ['', file.replace('.md', '')])[1].trim();
  const pk = (raw.match(/Primary Keyword:\s*(.*)/) || ['', title])[1].trim();
  const sk = (raw.match(/Secondary Keywords:\s*(.*)/) || ['', ''])[1].trim();
  const geo = (raw.match(/GEO Phrase:\s*(.*)/) || ['', ''])[1].trim();
  const tag = (raw.match(/Niche Tag:\s*(.*)/) || ['', 'B2B Strategy'])[1].trim();
  return { title, pk, sk, geo, tag };
}

async function run() {
  console.log('========================================================================');
  console.log('DEPLOYING ACCURATE, WATERMARK-FREE BLOG IMAGES TO public/blog-images/');
  console.log('========================================================================\n');

  let processedCount = 0;

  for (let num = 1; num <= 120; num++) {
    const imgName = curatedMap[num];
    if (!imgName) {
      console.warn(`[Skip] No curated image for prompt ${num}`);
      continue;
    }

    const srcFile = path.join(sourceDir, imgName);
    if (!fs.existsSync(srcFile)) {
      console.warn(`[Missing] Source image not found: ${srcFile}`);
      continue;
    }

    // Find blog file
    let blogFile = PILLAR_NUM_MAP[num];
    if (!blogFile) {
      blogFile = allBlogFiles.find(f => {
        const m = f.match(/^blog_0*(\d+)(?:_new)?\.md$/);
        return m && parseInt(m[1], 10) === num;
      });
    }

    const meta = blogFile ? parseBlogFrontmatter(blogFile) : {
      title: `B2B Web Architecture & SEO Guide ${num}`,
      pk: `B2B Web Development Blog ${num}`,
      sk: 'Next.js website, B2B SEO, conversion rate optimization',
      geo: 'How to optimize B2B web architecture for lead generation',
      tag: 'B2B Strategy',
    };

    const targetWebp = path.join(publicDir, `prompt-${num}.webp`);

    // 1. Watermark Removal & High-Quality WebP Conversion
    const srcMeta = await sharp(srcFile).metadata();
    const W = srcMeta.width;
    const H = srcMeta.height;

    // Clone clean background patch from (W - 180, H - 90, 90x90) and composite over watermark at (W - 90, H - 90)
    const patch = await sharp(srcFile)
      .extract({ left: Math.max(0, W - 180), top: Math.max(0, H - 90), width: 90, height: 90 })
      .toBuffer();

    // Composite patch, resize/crop to 1200x630 with top gravity to remove bottom edge
    const keywords = [
      meta.pk,
      meta.sk,
      meta.geo,
      'Rankur',
      'Moksh Parjapati',
      'B2B SEO',
      'Next.js Web Engineering',
      'Generative Engine Optimization',
    ].filter(Boolean).join('; ');

    const description = `${meta.pk}: ${meta.title} | Rankur B2B Growth Platform`;
    const subject = `${meta.pk} | ${meta.tag}`;
    const comment = `Target Search Keyword: ${meta.pk}. Secondary: ${meta.sk}. Optimized for Google and AI search engine visibility.`;

    const webpBuffer = await sharp(srcFile)
      .composite([{ input: patch, left: Math.max(0, W - 90), top: Math.max(0, H - 90) }])
      .resize(1200, 630, { fit: 'cover', position: 'north' })
      .withMetadata({
        exif: {
          IFD0: {
            ImageDescription: description,
            XPTitle: meta.title,
            XPKeywords: keywords,
            XPSubject: subject,
            XPComment: comment,
            Artist: 'Moksh Parjapati',
            Copyright: '© 2026 Moksh Productions / Rankur. All rights reserved.',
            Software: 'Rankur Media Pipeline',
          },
        },
      })
      .webp({ quality: 90 })
      .toBuffer();

    fs.writeFileSync(targetWebp, webpBuffer);
    processedCount++;
    console.log(`✓ [${processedCount}/120] prompt-${num}.webp <- ${imgName} (${meta.title.slice(0, 40)}...)`);
  }

  console.log(`\nSuccessfully deployed ${processedCount} accurate, watermark-free WebP images to public/blog-images/`);

  // 2. Remove irrelevant nutra images from images for blogs/
  const nutraFilesToRemove = [
    'Automated_packaging_and_bottling…_a164d48a.jpg',
    'Automated_packaging_line_in_faci…_eb0eb5b1.jpg',
    'Engineers_inspecting_medical_com…_b913871f.jpg',
    'Laptop_displaying_B2B_supplier_p…_6bf20721.jpg',
    'Laptop_displaying_supplier_profile_b9b1df05.jpg',
    'Manufacturing_supply_chain_displ…_2c4722fb.jpg',
    'Supply_chain_touchscreen_showing…_7e1be267.jpg',
  ];

  let removedNutraCount = 0;
  for (const nf of nutraFilesToRemove) {
    const full = path.join(sourceDir, nf);
    if (fs.existsSync(full)) {
      fs.unlinkSync(full);
      removedNutraCount++;
      console.log(`✓ Removed irrelevant nutra asset: ${nf}`);
    }
  }

  console.log(`\nRemoved ${removedNutraCount} irrelevant nutraceutical assets from images for blogs/`);
}

run().catch(err => {
  console.error('Fatal error deploying blog images:', err);
  process.exit(1);
});
