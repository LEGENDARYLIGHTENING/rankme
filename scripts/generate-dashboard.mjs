import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const raw = fs.readFileSync(path.join(rootDir, 'RANKUR_MEDIUM_POSTS.md'), 'utf8');
const blocks = raw.split(/## Article \d+:\s*/).slice(1);

const articles = blocks.map((block, index) => {
  const lines = block.split('\n');
  const titleLine = lines.find(l => l.startsWith('**Medium Title:**'));
  const tagsLine = lines.find(l => l.startsWith('**Tags:**'));
  const canonicalLine = lines.find(l => l.startsWith('**Canonical URL:**'));

  const title = titleLine ? titleLine.replace('**Medium Title:**', '').trim() : `Article ${index + 1}`;
  const tags = tagsLine ? tagsLine.replace('**Tags:**', '').split(',').map(t => t.trim()).filter(Boolean) : ['B2B', 'SEO'];
  const canonicalUrl = canonicalLine ? canonicalLine.replace('**Canonical URL:**', '').trim() : 'https://rankursite.com';

  const contentStartIndex = lines.findIndex(l => l.startsWith('### Article Content'));
  const content = contentStartIndex !== -1 ? lines.slice(contentStartIndex + 1).join('\n').trim() : block;

  return {
    id: index + 1,
    title,
    tags,
    canonicalUrl,
    content
  };
});

// Articles 20 through 49 (30 articles after Article 19)
const queue30 = articles.filter(a => a.id >= 20 && a.id <= 49);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rankur Medium Syndication Engine | @parjapatiwork</title>
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --border: #1f2937;
      --primary: #2563eb;
      --accent: #10b981;
      --gold: #f59e0b;
      --text: #f9fafb;
      --text-muted: #9ca3af;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: var(--bg); color: var(--text); padding: 32px 20px; line-height: 1.5; }
    .container { max-width: 1200px; margin: 0 auto; }
    header { border-bottom: 1px solid var(--border); padding-bottom: 24px; margin-bottom: 28px; }
    .badge { display: inline-block; padding: 5px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
    .badge-user { background: rgba(37, 99, 235, 0.15); color: #60a5fa; border: 1px solid rgba(37, 99, 235, 0.3); }
    .badge-count { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    h1 { font-size: 26px; font-weight: 700; margin: 12px 0 6px; letter-spacing: -0.02em; }
    p.sub { color: var(--text-muted); font-size: 14px; }
    
    .stats-bar { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 28px; }
    .stat-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 18px; }
    .stat-val { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 4px; }
    .stat-lbl { font-size: 13px; color: var(--text-muted); }

    .tabs { display: flex; gap: 10px; margin-bottom: 24px; border-bottom: 1px solid var(--border); padding-bottom: 12px; }
    .tab-btn { background: transparent; border: none; color: var(--text-muted); font-size: 14px; font-weight: 600; padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
    .tab-btn:hover { color: #fff; background: rgba(255,255,255,0.05); }
    .tab-btn.active { color: #fff; background: var(--primary); }

    .articles-grid { display: flex; flex-direction: column; gap: 18px; }
    .article-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 22px; transition: border-color 0.2s; }
    .article-card:hover { border-color: #374151; }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 12px; }
    .art-title { font-size: 18px; font-weight: 600; color: #fff; }
    .art-num { font-size: 13px; color: var(--gold); font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
    .canonical-link { font-size: 13px; color: #60a5fa; text-decoration: none; word-break: break-all; }
    .canonical-link:hover { text-decoration: underline; }

    .tags-list { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 18px; }
    .tag { font-size: 11px; padding: 3px 8px; border-radius: 6px; background: rgba(255,255,255,0.06); color: var(--text-muted); }

    .actions { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 14px; font-size: 13px; font-weight: 600; border-radius: 8px; border: 1px solid transparent; cursor: pointer; text-decoration: none; transition: all 0.15s; }
    .btn-import { background: #10b981; color: #fff; }
    .btn-import:hover { background: #059669; }
    .btn-secondary { background: rgba(255,255,255,0.05); border-color: var(--border); color: #e5e7eb; }
    .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: #4b5563; }

    .status-select { background: #1f2937; color: #fff; border: 1px solid #374151; padding: 8px 12px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; outline: none; }
    .date-input { background: #1f2937; color: #fff; border: 1px solid #374151; padding: 7px 10px; border-radius: 8px; font-size: 12px; outline: none; }

    .preview-box { display: none; margin-top: 18px; padding: 18px; background: #050811; border: 1px solid #1f2937; border-radius: 8px; font-size: 13px; color: #d1d5db; max-height: 380px; overflow-y: auto; white-space: pre-wrap; font-family: monospace; }
    .preview-box.open { display: block; }
    .copied { background: #10b981 !important; color: #fff !important; }
  </style>
</head>
<body>

<div class="container">
  <header>
    <div style="display:flex; gap:10px; margin-bottom:8px;">
      <span class="badge badge-user">👤 Account: Moksh Parjapati (@parjapatiwork)</span>
      <span class="badge badge-count">🚀 30 Articles Queued (Articles 20 to 49)</span>
    </div>
    <h1>Rankur Medium Hybrid Syndication Hub</h1>
    <p class="sub">Direct Medium Canonical Importer and Batch Scheduler. All articles preserve 100% canonical SEO backlink authority to rankursite.com/blog/...</p>
  </header>

  <div class="stats-bar">
    <div class="stat-card">
      <div class="stat-val" id="stat-total">30</div>
      <div class="stat-lbl">Total Articles Ready</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" style="color:#f59e0b;" id="stat-pending">30</div>
      <div class="stat-lbl">Pending Syndication</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" style="color:#3b82f6;" id="stat-scheduled">0</div>
      <div class="stat-lbl">Scheduled on Medium</div>
    </div>
    <div class="stat-card">
      <div class="stat-val" style="color:#10b981;" id="stat-published">0</div>
      <div class="stat-lbl">Published Live</div>
    </div>
  </div>

  <div class="tabs">
    <button class="tab-btn active" onclick="switchTab('all', this)">All 30 Articles</button>
    <button class="tab-btn" onclick="switchTab('month1', this)">Month 1 (Articles 20-29)</button>
    <button class="tab-btn" onclick="switchTab('month2', this)">Month 2 (Articles 30-39)</button>
    <button class="tab-btn" onclick="switchTab('month3', this)">Month 3 (Articles 40-49)</button>
  </div>

  <div class="articles-grid" id="articles-container"></div>
</div>

<script>
  const articles = ${JSON.stringify(queue30)};

  function getBatch(id) {
    if (id >= 20 && id <= 29) return "month1";
    if (id >= 30 && id <= 39) return "month2";
    if (id >= 40 && id <= 49) return "month3";
    return "other";
  }

  function getStorage(key, def) {
    try {
      const v = localStorage.getItem("rankur_" + key);
      return v !== null ? v : def;
    } catch(e) { return def; }
  }

  function setStorage(key, val) {
    try {
      localStorage.setItem("rankur_" + key, val);
    } catch(e) {}
  }

  function copyText(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.innerText;
      btn.innerText = "✓ Copied!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.innerText = orig;
        btn.classList.remove("copied");
      }, 1500);
    });
  }

  function togglePreview(id) {
    const el = document.getElementById("prev-" + id);
    el.classList.toggle("open");
  }

  function openImport(url) {
    navigator.clipboard.writeText(url);
    window.open("https://medium.com/p/import", "_blank");
  }

  function updateStatus(id, val) {
    setStorage("status_" + id, val);
    updateStats();
  }

  function updateDate(id, val) {
    setStorage("date_" + id, val);
  }

  function updateStats() {
    let pending = 0, scheduled = 0, published = 0;
    articles.forEach(a => {
      const st = getStorage("status_" + a.id, "pending");
      if (st === "pending") pending++;
      else if (st === "scheduled") scheduled++;
      else if (st === "published") published++;
    });
    document.getElementById("stat-pending").innerText = pending;
    document.getElementById("stat-scheduled").innerText = scheduled;
    document.getElementById("stat-published").innerText = published;
  }

  let activeTab = "all";

  function switchTab(tab, btn) {
    activeTab = tab;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  }

  function render() {
    const container = document.getElementById("articles-container");
    const filtered = articles.filter(a => activeTab === "all" || getBatch(a.id) === activeTab);

    container.innerHTML = filtered.map(a => {
      const st = getStorage("status_" + a.id, "pending");
      const dt = getStorage("date_" + a.id, "");

      return \`
        <div class="article-card" id="card-\${a.id}">
          <div class="card-top">
            <div>
              <div class="art-num">Article \${a.id} • Batch \${getBatch(a.id).toUpperCase()}</div>
              <h2 class="art-title">\${a.title}</h2>
              <a href="\${a.canonicalUrl}" target="_blank" class="canonical-link">🔗 \${a.canonicalUrl}</a>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <select class="status-select" onchange="updateStatus(\${a.id}, this.value)">
                <option value="pending" \${st === "pending" ? "selected" : ""}>Pending</option>
                <option value="scheduled" \${st === "scheduled" ? "selected" : ""}>Scheduled</option>
                <option value="published" \${st === "published" ? "selected" : ""}>Published</option>
              </select>
              <input type="datetime-local" class="date-input" value="\${dt}" onchange="updateDate(\${a.id}, this.value)" title="Schedule time" />
            </div>
          </div>

          <div class="tags-list">
            \${a.tags.map(t => \`<span class="tag">#\${t}</span>\`).join("")}
          </div>

          <div class="actions">
            <button class="btn btn-import" onclick="openImport('\${a.canonicalUrl}')">
              ⚡ 1-Click Import in Medium (Copies URL)
            </button>
            <button class="btn btn-secondary" onclick="copyText(this, '\${a.canonicalUrl}')">
              🔗 Copy Canonical
            </button>
            <button class="btn btn-secondary" onclick="copyText(this, '\${a.tags.join(", ")}')">
              🏷️ Copy Tags
            </button>
            <button class="btn btn-secondary" onclick="copyText(this, '\${a.title.replace(/'/g, "\\\\'")}')">
              📝 Copy Title
            </button>
            <button class="btn btn-secondary" onclick="togglePreview(\${a.id})">
              👁️ Preview Article
            </button>
          </div>

          <div class="preview-box" id="prev-\${a.id}">\${a.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
        </div>
      \`;
    }).join("");

    updateStats();
  }

  render();
</script>

</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'syndicate-parjapatiwork.html'), html, 'utf8');
console.log('✓ Successfully generated prototype/syndicate-parjapatiwork.html with all 30 articles!');
