/**
 * Google Apps Script to automatically generate and format two tabs in Google Sheets:
 * 1. Indian Reviews (50 Reviews)
 * 2. Foreign Reviews (50 Reviews)
 *
 * Includes:
 * - Interactive toggle checkboxes in Column A (Done/Pending)
 * - Review ID in Column B
 * - Review Text in Column C (with text wrap)
 * - Direct GMB Review Link in Column D (https://share.google/CNLAjQV1rH1I9zvLT)
 * - 5 Stars in Column E
 * - Beautiful styling & conditional green highlight when checked!
 *
 * HOW TO USE:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Click Extensions -> Apps Script
 * 3. Delete any default code in Code.gs and paste THIS ENTIRE SCRIPT.
 * 4. Click the 'Run' button (Run -> setupGMBReviewSheets).
 * 5. Grant permissions if prompted.
 * 6. Return to your Google Sheet: Both tabs are created and ready to share!
 */

var DEFAULT_GMB_LINK = "https://share.google/CNLAjQV1rH1I9zvLT";

var INDIAN_REVIEWS = [
  "Moksh built our website and handled the SEO setup. The site loads super fast and looks very clean. Very polite and delivered before deadline. Highly recommended!",
  "Had an amazing experience with Moksh Parjapati. He redesigned our company website with modern Next.js. Speed and mobile UI are top notch. 5 stars!",
  "Moksh helped fix our website loading speed and Google indexing issues. Inquiries started coming in steadily. Very talented and honest developer.",
  "Really impressed with Rankur's web development work. Moksh is super responsive, understands client requirements clearly, and delivers quality work.",
  "Moksh built our business portfolio site. It looks professional and loads in under a second on mobile phones. Best freelance web developer in our network.",
  "Great work by Moksh! He helped us with local SEO and rebuilt our service pages. Our calls and form inquiries improved a lot. Must recommend.",
  "Worked with Moksh on a web development project. His knowledge of Next.js and frontend design is solid. Smooth communication throughout.",
  "Moksh Parjapati is extremely hardworking and reliable. He delivered a fast, responsive website without any bugs or delays. Top class service.",
  "Our old website was slow and unresponsive. Moksh revamped the whole thing cleanly. Fantastic UI, great speed, and very reasonable pricing.",
  "Moksh handled the technical SEO and on-page optimization for our site. We noticed real improvement on Google search within weeks. Highly recommend Rankur.",
  "Super clean web development work by Moksh. Code is well structured, pages load instantly, and he is always available for quick adjustments.",
  "Moksh helped build an e-commerce catalog for our products. The browsing experience is smooth and customer feedback has been great.",
  "Very professional experience working with Moksh at Rankur. He explained everything clearly without technical confusion. Great website delivered.",
  "If you need a modern and fast website, Moksh is the guy to contact. Quick turnaround, clean code, and zero hassle throughout the process.",
  "Moksh fixed our Search Console errors and restructured our sitemaps properly. Google indexed all our key pages shortly after. Great SEO work.",
  "Excellent web design and development by Moksh. Modern layout, fast load time, and very clear call-to-actions. 5/5 stars without a doubt.",
  "Moksh built our startup landing page on Next.js. It looks sleek and loads instantly. Helped us present our venture to investors with confidence.",
  "Solid developer with genuine passion for his craft. Moksh pays attention to small details that make a huge difference in performance.",
  "Helped us revamp our consulting website. Professional design, clean fonts, and fast forms. Inquiries have been very consistent. Thanks Moksh!",
  "Moksh is dependable and delivers what he promises. Great web development skills, honest communication, and fast support. Highly recommended.",
  "Great collaboration with Moksh. The website he built for our brand has received so many compliments. Mobile responsiveness is 10/10.",
  "Moksh optimized our website speed and helped us pass Google Core Web Vitals on mobile. Remarkable difference in performance.",
  "Very pleased with the service from Rankur. Moksh took full ownership from design to launch. Reliable, skilled, and honest professional.",
  "Moksh built a modern B2B website for our firm. Navigation is intuitive and forms work without any lag. Will definitely hire him again.",
  "Top notch web engineering. Moksh replaced our heavy templates with clean custom code. The website feels super snappy now.",
  "Moksh helped us set up our Google Business profile and optimized our website for local search queries. Very helpful and polite.",
  "Delivered our website ahead of schedule with zero errors. Moksh is easily one of the most reliable developers I have worked with.",
  "Moksh gave our brand a complete visual and technical facelift. Our website looks premium and loads fast on all network speeds.",
  "Outstanding SEO and web development support from Moksh. He gave honest advice and delivered measurable improvements. 5 stars!",
  "Moksh built a clean, fast website for our local business. Customer inquiries have increased and managing content is easy.",
  "Collaborated with Moksh on a client delivery. His git workflow, code quality, and problem solving are impressive. Solid tech peer.",
  "Moksh resolved our website redirect issues and improved crawl speed. Very knowledgeable about how Google search works.",
  "Clean layouts, fast loading, and modern design. Moksh delivered exactly what we discussed in our first meeting. Highly recommended.",
  "Moksh engineered our inquiry forms to submit instantly without crashes. Our lead capture rate improved noticeably. Great work!",
  "Exceptional work by Moksh Parjapati. He handled our website revamp with complete dedication. Smooth experience from start to finish.",
  "Moksh helped our educational venture with a clean, accessible website. Great communication, polite attitude, and high technical skill.",
  "No bloated templates or heavy plugins. Moksh builds lightweight, custom websites that actually perform well on Google. Top developer.",
  "Moksh is very approachable and patient with feedback. He made sure every detail was polished before taking the site live.",
  "Our website bounce rate reduced significantly after Moksh optimized the speed and mobile layout. Real results, genuine work.",
  "Moksh Parjapati is a true professional. Delivered a fast Next.js site within budget and with complete code handover. 5 stars.",
  "Great experience with Rankur. Moksh built an intuitive user interface and fast-loading service pages for our agency. Loved the work.",
  "Moksh helped us rank for our primary local business keywords. Transparent approach with zero false promises. Highly trustworthy.",
  "Fast turnaround, great design sense, and excellent communication. Moksh is my first choice for any web dev or SEO requirements.",
  "Moksh built our portfolio showcase with smooth transitions and fast load times. It has helped us attract multiple new clients.",
  "High quality work from Moksh. He understands both frontend design and search engine optimization. Rare combination of skills.",
  "Moksh took care of our website maintenance and speed optimization. Site runs smoothly 24/7 without issues. Great support.",
  "Very happy with the website Moksh built for us. Clear structure, responsive on all devices, and easy contact options for clients.",
  "Moksh is honest, skilled, and delivers top tier results. Our business website looks ten times better than our competitors.",
  "Outstanding service from Moksh at Rankur. Fast delivery, clean Next.js code, and great SEO setup. Highly recommended to everyone.",
  "Moksh Parjapati is one of the most dedicated and talented developers around. 5-star experience across all parameters!"
];

var FOREIGN_REVIEWS = [
  "Collaborated with Moksh and Rankur on a complete Next.js website overhaul for our European operations. His grasp of technical SEO and Core Web Vitals is exceptional. Our site speed is blazing fast across the Nordics and search visibility jumped within weeks. Highly recommended!",
  "Moksh revamped our business website and optimized our local Google search presence here in Mauritius. The site loads in under a second on mobile and inquiries have doubled. Very professional and responsive across time zones.",
  "Moksh Parjapati is an outstanding web engineer. He migrated our platform to Next.js with clean modular code and zero bloat. The difference in page load speeds across Finland and Europe is remarkable. 5 stars for technical precision.",
  "Working with Moksh at Rankur was seamless. He restructured our online catalog and implemented technical SEO foundations that helped us rank on page 1 of Google for our target search queries. Always delivers on time.",
  "Moksh resolved persistent Google Search Console indexing errors and canonical issues for our European platform. His technical audit was clear and his code fixes drove an immediate recovery in our search impressions.",
  "Moksh engineered a custom B2B web platform for our consulting firm in Ebene, Mauritius. Fast page loads, clean responsive design, and solid conversion optimization. Highly recommend Rankur to any international business.",
  "Rankur delivered exceptional web development work for us in the UK. Moksh built a custom Next.js platform that replaced our legacy CMS. Sub-second loading speeds gave us an immediate edge in competitive search rankings.",
  "Super impressed with Moksh's technical depth. He tuned our web application until it achieved perfect green scores on Google PageSpeed Insights. If you need clean Next.js development and serious speed, Moksh is your expert.",
  "Moksh helped us set up our website architecture and optimize our Google presence in Mauritius. Friendly, honest, and easy to work with across borders. Inquiries through Google search have been consistent ever since.",
  "Moksh Parjapati helped us implement structured JSON-LD entity schema and optimize our site for generative search engines. Our brand is now cited in AI Overviews and Core Web Vitals remain at 100/100. Brilliant execution.",
  "Flawless technical execution by Rankur. Moksh engineered our web platform with edge caching and server-side rendering, cutting latency across European traffic. Proactive communication and milestones hit on time.",
  "Moksh designed a sleek, high-speed website for our hospitality business in Mauritius. Mobile bookings increased significantly because the pages load instantly without friction. 5-star service from Rankur!",
  "Moksh understands B2B search intent. He restructured our service pages and optimized on-page SEO targeting industrial search queries. The quality of inbound leads has improved noticeably across Europe. Highly recommended.",
  "Rankur built a world-class digital platform for our regional venture. Moksh ensured the website passes every speed benchmark globally. The full code handover via GitHub gave us complete confidence. Outstanding partner.",
  "Moksh took our designs and turned them into a blazing fast, fully responsive Next.js frontend. Smooth animations, zero hydration lag, and clean code. Great developer to collaborate with across borders.",
  "Working with Moksh Parjapati was effortless. He transformed our outdated website into a clean, modern showcase in Mauritius. Local search visibility and client inquiries have grown steadily. Highly satisfied.",
  "Moksh helped us resolve deep technical SEO roadblocks on our SaaS marketing pages. His schema markup implementation and clean internal linking made indexing instant on Google Search Console. Excellent work.",
  "Moksh reduced our mobile page load time from 4.8s to 0.7s. That single optimization cut our bounce rate in half for our Nordic users. If your website is lagging, Moksh at Rankur is the developer you need.",
  "Moksh provides genuine, high-quality web development and SEO. No confusing jargon or false claims, just solid results, fast loading pages, and consistent lead generation in Mauritius. 10/10 recommendation.",
  "Moksh combines modern frontend engineering with rock-solid search optimization. The Next.js website he built for us in Europe is fast, accessible, and ranks prominently for our primary search terms. Top recommendation.",
  "Replatforming our marketing site to Next.js 16 with Moksh was the best tech investment we made. Our Largest Contentful Paint dropped to 0.68s globally and mobile conversions jumped 35%. Excellent engineering.",
  "Moksh helped fix our crawl budget bottlenecks and cleaned up redirect chains. Google now crawls and indexes our fresh content within hours. Outstanding technical SEO proficiency.",
  "Clean modular Tailwind code and rock-solid Next.js server components. Moksh delivered a codebase that our in-house engineering team loves maintaining. Zero tech debt.",
  "Rankur helped us rank for high-intent B2B search terms across North America. Moksh does not waste time on vanity traffic; he builds pages that actually convert decision-makers into booked calls.",
  "Moksh eliminated all layout shifts and font flashes on our web portal. The browsing experience is buttery smooth and Google Core Web Vitals reports 100% green URLs.",
  "Working directly with Moksh eliminated agency delays and overhead. He understood our software specifications instantly and shipped clean code ahead of deadline. 5 stars.",
  "Moksh implemented comprehensive JSON-LD knowledge graph schema that helped Google recognize our corporate brand entity. Rich snippets appeared in search results within a month.",
  "Our previous WordPress build was suffocating under 40 plugins. Moksh rebuilt the platform with custom Next.js, cutting page weight by 80% while increasing lead inquiries.",
  "Moksh engineered our international multi-language routing and hreflang tags cleanly. We have had zero indexation conflicts across our regional domains. Exceptional expertise.",
  "The full repository transfer and clear documentation provided by Rankur made client handover completely seamless. Moksh is transparent, professional, and reliable.",
  "Moksh built our startup landing page before an international demo day. Fast, responsive, and beautifully styled. We secured our target meetings with zero technical glitches.",
  "Inbound organic inquiries from Google search doubled within 90 days of Moksh auditing and restructuring our website. True master of modern search mechanics.",
  "Moksh optimized our server-side rendering and edge caching on Vercel. Global latency dropped across US, EU, and Asian traffic. Outstanding performance engineer.",
  "Transparent pricing, rapid sprints, and zero excuses. Moksh Parjapati is one of the most reliable freelance engineers in the web development ecosystem.",
  "Moksh helped optimize our brand for generative AI citations. We now appear consistently in Perplexity AI answers for our commercial software category.",
  "Our mobile bounce rate dropped from 62% to under 30% after Moksh deployed our new high-speed website. Speed directly equals revenue, and Moksh delivers speed.",
  "Moksh redesigned our lead generation forms with instant server action validation. Inquiries are captured reliably without script errors or lag. Fantastic partner.",
  "Moksh is an exceptional problem solver. When an indexing anomaly occurred, he identified the canonical loop and fixed it within hours. Highly dependable developer.",
  "The visual polish and technical speed of our new website have significantly boosted our brand authority with prospective B2B clients. Huge credit to Rankur.",
  "Moksh provided high-impact technical SEO advice without trying to upsell unnecessary retainers. His honest, ethical approach earned our long-term business.",
  "Moksh built a lightweight, responsive portfolio platform that showcases our international architecture projects beautifully. Flawless execution.",
  "From initial wireframe review to final DNS cutover, Moksh handled our web relaunch with complete professional control. Zero downtime achieved.",
  "Moksh optimized our image delivery pipelines with automated WebP compression and responsive srcset attributes. Page weight dropped dramatically.",
  "Moksh is one of the few web developers who truly understands how semantic HTML impacts Googlebot crawl efficiency. Our organic traffic growth proves it.",
  "Working across time zones with Moksh was effortless. Clear daily summaries, clean staging links, and rapid turnaround on every feedback request.",
  "Rankur delivered a secure, fast, and scalable web foundation for our venture. Moksh is talented, communicative, and exceptionally dedicated.",
  "Moksh helped clean up 404 crawl errors and restored lost link equity from our previous domain migration. Invaluable technical contribution.",
  "Our website passed every Google PageSpeed benchmark on both mobile and desktop. Moksh Parjapati is a true master of modern web performance.",
  "Moksh built our B2B SaaS marketing site with crisp typography, fast forms, and zero bloat. Inbound demo requests have reached an all-time high.",
  "Exceptional engineering standard and outstanding communication. If you need a website that dominates search and loads instantly, hire Moksh Parjapati."
];

function setupGMBReviewSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Build Indian Reviews Tab
  buildReviewSheet(ss, "Indian Reviews", INDIAN_REVIEWS, "IND", "#1e40af", "#dbeafe");

  // 2. Build Foreign Reviews Tab
  buildReviewSheet(ss, "Foreign Reviews", FOREIGN_REVIEWS, "INT", "#065f46", "#d1fae5");

  // Remove default 'Sheet1' if present and other sheets exist
  var defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && ss.getSheets().length > 1) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {}
  }

  SpreadsheetApp.getUi().alert("Success! Created 'Indian Reviews' and 'Foreign Reviews' tabs with toggle checkboxes.");
}

function buildReviewSheet(ss, sheetName, reviewsArray, prefix, headerBgColor, highlightBgColor) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  } else {
    sheet.clear();
  }

  // Headers
  var headers = [
    ["Done?", "Review ID", "Review Text (Click to Copy)", "Direct Review Link", "Rating"]
  ];
  sheet.getRange(1, 1, 1, 5).setValues(headers);

  // Style Header Row
  var headerRange = sheet.getRange("A1:E1");
  headerRange.setBackground(headerBgColor);
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 40);

  // Prepare Rows
  var rows = [];
  for (var i = 0; i < reviewsArray.length; i++) {
    var num = (i + 1 < 10) ? ("00" + (i + 1)) : ((i + 1 < 100) ? ("0" + (i + 1)) : (i + 1));
    var reviewId = prefix + "-" + num;
    rows.push([false, reviewId, reviewsArray[i], DEFAULT_GMB_LINK, "5 Stars"]);
  }

  // Insert Data
  var dataRange = sheet.getRange(2, 1, rows.length, 5);
  dataRange.setValues(rows);

  // Insert Checkboxes into Column A
  var checkboxRange = sheet.getRange(2, 1, rows.length, 1);
  checkboxRange.insertCheckboxes();
  checkboxRange.setHorizontalAlignment("center");
  checkboxRange.setVerticalAlignment("middle");

  // Format Review IDs (Col B)
  var idRange = sheet.getRange(2, 2, rows.length, 1);
  idRange.setHorizontalAlignment("center");
  idRange.setVerticalAlignment("middle");
  idRange.setFontWeight("bold");
  idRange.setFontColor("#4b5563");

  // Format Review Text (Col C) - Wrap text
  var textRange = sheet.getRange(2, 3, rows.length, 1);
  textRange.setWrap(true);
  textRange.setVerticalAlignment("middle");
  textRange.setFontSize(10);

  // Format Link (Col D)
  var linkRange = sheet.getRange(2, 4, rows.length, 1);
  linkRange.setHorizontalAlignment("center");
  linkRange.setVerticalAlignment("middle");
  linkRange.setFontColor("#2563eb");

  // Format Rating (Col E)
  var ratingRange = sheet.getRange(2, 5, rows.length, 1);
  ratingRange.setHorizontalAlignment("center");
  ratingRange.setVerticalAlignment("middle");
  ratingRange.setFontWeight("bold");
  ratingRange.setFontColor("#d97706");

  // Set Row Heights and Column Widths
  for (var r = 2; r <= rows.length + 1; r++) {
    sheet.setRowHeight(r, 65);
  }
  sheet.setColumnWidth(1, 80);   // Done checkbox
  sheet.setColumnWidth(2, 100);  // Review ID
  sheet.setColumnWidth(3, 560);  // Review Text
  sheet.setColumnWidth(4, 280);  // GMB Link
  sheet.setColumnWidth(5, 90);   // Rating

  // Freeze top row
  sheet.setFrozenRows(1);

  // Conditional Formatting: When checkbox in Column A is TRUE, highlight the row light green
  var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied("=$A2=TRUE")
    .setBackground(highlightBgColor)
    .setFontColor("#1f2937")
    .setRanges([sheet.getRange(2, 1, rows.length, 5)])
    .build();

  sheet.setConditionalFormatRules([rule]);
}
