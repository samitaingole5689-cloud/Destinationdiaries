import fs from 'node:fs';
import path from 'node:path';
import { ALL_ARTICLES, getAdjacentArticles } from '../src/data/articles.ts';
import { Article } from '../src/types/blog.ts';

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderArticleHtml(article: Article): string {
  const { prev, next } = getAdjacentArticles(article.slug);

  const secondaryImg = article.secondaryImages && article.secondaryImages.length > 0
    ? article.secondaryImages[0]
    : null;

  return `<!doctype html>
<html lang="en" data-article-id="${article.id}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(article.seoTitle || `${article.title} | Destination Diaries`)}</title>
  <meta name="description" content="${escapeHtml(article.metaDescription || article.subtitle)}">
  <link rel="canonical" href="https://destinationdiaries.vercel.app${article.url}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(article.seoTitle || article.title)}">
  <meta property="og:description" content="${escapeHtml(article.metaDescription || article.subtitle)}">
  <meta property="og:image" content="${article.featuredImage.url}">
  <meta property="og:url" content="https://destinationdiaries.vercel.app${article.url}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(article.seoTitle || article.title)}">
  <meta name="twitter:description" content="${escapeHtml(article.metaDescription || article.subtitle)}">
  <meta name="twitter:image" content="${article.featuredImage.url}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/article.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${escapeHtml(article.seoTitle || article.title)}",
    "description": "${escapeHtml(article.metaDescription || article.subtitle)}",
    "image": "${article.featuredImage.url}",
    "datePublished": "2026-10-12",
    "author": {
      "@type": "Person",
      "name": "${escapeHtml(article.author.name)}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Destination Diaries"
    }
  }
  </script>
  <script>
    (function() {
      try {
        var s = localStorage.getItem('destination_font_size');
        if (s) {
          var n = parseInt(s, 10);
          if (!isNaN(n) && n >= 12 && n <= 22) {
            document.documentElement.style.fontSize = n + 'px';
          }
        }
      } catch (e) {}
    })();
  </script>
</head>
<body>
  <div id="scroll-progress"></div>

  <!-- Main Site Header -->
  <header class="site-header">
    <div class="header-container">
      <a href="/" class="brand-link">
        <div class="brand-icon">🧭</div>
        <div>
          <span class="brand-title">Destination Diaries</span>
        </div>
      </a>
      <div class="header-actions">
        <button class="btn-tool open-search-btn" title="Search all 10 guides">🔍 Search</button>
        <button class="btn-tool open-bookmarks-btn" title="Saved reading list">
          ★ Saved <span class="saved-count-badge" style="background:#78350f; color:#fff; border-radius:10px; padding:1px 6px; font-size:0.7rem; margin-left:3px; display:none;">0</span>
        </button>
        <a href="/" class="btn-tool" style="background:#1c1917; color:#fff;">All Guides</a>
      </div>
    </div>
  </header>

  <!-- Article Secondary Tool Bar -->
  <div class="article-nav-bar">
    <div class="article-nav-container">
      <a href="/" class="back-btn">← Back to All 10 Guides</a>
      <div class="article-tools">
        <button id="btn-font-normal" class="btn-tool" title="Decrease font size across website (A−)" aria-label="Decrease font size">A−</button>
        <button id="btn-font-large" class="btn-tool" title="Increase font size across website (A+)" aria-label="Increase font size">A+</button>
        <button id="btn-bookmark" class="btn-tool">☆ Save</button>
        <button id="btn-share" class="btn-tool">Share Guide</button>
      </div>
    </div>
  </div>

  <!-- Article Hero Header -->
  <header class="article-header">
    <div class="meta-breadcrumbs">
      <span class="meta-country">${escapeHtml(article.country)}</span>
      <span class="meta-separator">/</span>
      <a href="/?category=${encodeURIComponent(article.region.toLowerCase().replace(/\s+/g, '-'))}" class="meta-region-link" style="color:inherit; text-decoration:underline; text-underline-offset:3px;" title="View all ${escapeHtml(article.region)} travel guides">${escapeHtml(article.region)}</a>
      <span class="meta-separator">/</span>
      <span>${escapeHtml(article.publishDate)}</span>
      <span class="meta-separator">/</span>
      <span>${article.readTimeMinutes} min read</span>
    </div>
    <h1 class="article-h1">${escapeHtml(article.title)}</h1>
    <p class="article-subtitle">${escapeHtml(article.subtitle)}</p>
  </header>

  <!-- Featured Lead Image -->
  <div class="featured-image-wrapper">
    <div class="featured-image-card">
      <img src="${article.featuredImage.url}" alt="${escapeHtml(article.featuredImage.alt)}"${article.id === 'article-bali' ? ' style="aspect-ratio: 16 / 9; width: 100%; height: auto; object-fit: cover; object-position: center;"' : ''}>
      <div class="image-caption-bar">
        <span>${escapeHtml(article.featuredImage.caption)}</span>
        ${article.featuredImage.photographer ? `<span>Photo: ${escapeHtml(article.featuredImage.photographer)}</span>` : ''}
      </div>
    </div>
  </div>

  <!-- Content Layout -->
  <div class="content-layout">
    <!-- Sticky Table of Contents -->
    <aside class="toc-sidebar">
      <div class="toc-heading">📖 Guide Contents</div>
      <ul class="toc-list">
        <li><a href="#introduction" class="toc-link">1. Introduction</a></li>
        <li><a href="#why-dream-destination" class="toc-link">2. Why It’s a Dream Destination</a></li>
        <li><a href="#major-attractions" class="toc-link">3. Major Attractions</a></li>
        <li><a href="#things-to-do" class="toc-link">4. Things to Do in ${escapeHtml(article.destination)}</a></li>
        <li><a href="#food-to-try" class="toc-link">5. Food to Try</a></li>
        <li><a href="#best-time-to-visit" class="toc-link">6. Best Time to Visit ${escapeHtml(article.destination)}</a></li>
        <li><a href="#how-to-get-there" class="toc-link">7. How to Get There</a></li>
        <li><a href="#where-to-stay" class="toc-link">8. Where to Stay in ${escapeHtml(article.destination)}</a></li>
        <li><a href="#estimated-budget" class="toc-link">9. Estimated Budget</a></li>
        <li><a href="#travel-tips" class="toc-link">10. Travel Tips</a></li>
        <li><a href="#what-makes-it-memorable" class="toc-link">11. What Makes It Memorable</a></li>
        <li><a href="#conclusion" class="toc-link">12. Conclusion</a></li>
      </ul>
    </aside>

    <!-- Main Body -->
    <main class="article-main-body">
      <!-- Quick Facts -->
      <div class="quick-facts-card">
        <h3 class="quick-facts-title">🧭 ${escapeHtml(article.destination)} at a Glance</h3>
        <div class="quick-facts-grid">
          <div class="fact-item"><span class="fact-label">Currency</span><span class="fact-value">${escapeHtml(article.quickFacts.currency)}</span></div>
          <div class="fact-item"><span class="fact-label">Language</span><span class="fact-value">${escapeHtml(article.quickFacts.language)}</span></div>
          <div class="fact-item"><span class="fact-label">Ideal Stay</span><span class="fact-value">${escapeHtml(article.quickFacts.idealDuration)}</span></div>
          <div class="fact-item"><span class="fact-label">Climate</span><span class="fact-value">${escapeHtml(article.quickFacts.climate)}</span></div>
          <div class="fact-item"><span class="fact-label">Best Months</span><span class="fact-value">${escapeHtml(article.quickFacts.bestMonths)}</span></div>
          <div class="fact-item"><span class="fact-label">Timezone</span><span class="fact-value">${escapeHtml(article.quickFacts.timezone)}</span></div>
        </div>
      </div>

      <!-- 1. Introduction -->
      <section id="introduction" class="article-section">
        <h2 class="section-h2">1. Introduction</h2>
        <div class="prose-text">${escapeHtml(article.sections.introduction)}</div>
      </section>

      <!-- 2. Why It’s a Dream Destination -->
      <section id="why-dream-destination" class="article-section">
        <h2 class="section-h2">2. Why It’s a Dream Destination</h2>
        ${article.aeo ? `
        <div class="aeo-qa-box" style="background:#fef3c7; border-left:4px solid #b45309; padding:0.9rem 1.15rem; margin-bottom:1.25rem; border-radius:0.375rem;">
          <h3 style="font-size:1rem; font-weight:700; color:#78350f; margin:0 0 0.35rem; font-family:var(--font-sans);">${escapeHtml(article.aeo.famousForQuestion)}</h3>
          <p style="color:#451a03; margin:0; font-size:0.925rem; line-height:1.55;">${escapeHtml(article.aeo.famousForAnswer)}</p>
        </div>` : ''}
        <div class="prose-text">${escapeHtml(article.sections.whyDreamDestination)}</div>
        ${secondaryImg ? `
        <figure class="inline-figure">
          <img src="${secondaryImg.url}" alt="${escapeHtml(secondaryImg.alt)}">
          <figcaption>
            <span>${escapeHtml(secondaryImg.caption)}</span>
            ${secondaryImg.photographer ? `<span>Photo: ${escapeHtml(secondaryImg.photographer)}</span>` : ''}
          </figcaption>
        </figure>` : ''}
      </section>

      <!-- 3. Major Attractions -->
      <section id="major-attractions" class="article-section">
        <h2 class="section-h2">3. Major Attractions</h2>
        ${article.aeo ? `
        <div class="aeo-qa-box" style="background:#fef3c7; border-left:4px solid #b45309; padding:0.9rem 1.15rem; margin-bottom:1.25rem; border-radius:0.375rem;">
          <h3 style="font-size:1rem; font-weight:700; color:#78350f; margin:0 0 0.35rem; font-family:var(--font-sans);">${escapeHtml(article.aeo.bestPlacesQuestion)}</h3>
          <p style="color:#451a03; margin:0; font-size:0.925rem; line-height:1.55;">${escapeHtml(article.aeo.bestPlacesAnswer)}</p>
        </div>` : ''}
        <p style="font-size:0.9rem; color:#57534e;">Explore ${escapeHtml(article.destination)}’s most iconic landmarks, architectural gems, and natural wonders with complete visitor intelligence:</p>
        <div class="attractions-container">
          ${article.sections.majorAttractions.map((attraction, idx) => `
          <div class="attraction-card">
            <div class="attraction-top">
              <div class="attraction-title-group">
                <span class="attraction-number">${String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h3 class="attraction-name">${escapeHtml(attraction.name)}</h3>
                  <div class="attraction-location">📍 ${escapeHtml(attraction.location)}</div>
                </div>
              </div>
            </div>
            <p class="attraction-desc">${escapeHtml(attraction.description)}</p>
            <div class="intel-grid">
              ${attraction.bestTime ? `<div class="intel-box"><span class="intel-label">⏰ Best Time</span><span class="intel-val">${escapeHtml(attraction.bestTime)}</span></div>` : ''}
              ${attraction.ticketInfo ? `<div class="intel-box"><span class="intel-label">🎟 Admission</span><span class="intel-val">${escapeHtml(attraction.ticketInfo)}</span></div>` : ''}
              ${attraction.duration ? `<div class="intel-box"><span class="intel-label">⏳ Time to Spend</span><span class="intel-val">${escapeHtml(attraction.duration)}</span></div>` : ''}
            </div>
            ${attraction.highlight ? `<div class="attraction-highlight-box"><strong>Insider Highlight:</strong> ${escapeHtml(attraction.highlight)}</div>` : ''}
            ${attraction.proTip ? `<div class="attraction-protip-box"><strong>Field Pro-Tip:</strong> ${escapeHtml(attraction.proTip)}</div>` : ''}
          </div>
          `).join('')}
        </div>
      </section>

      <!-- 4. Things to Do -->
      <section id="things-to-do" class="article-section">
        <h2 class="section-h2">4. What Are the Best Things to Do in ${escapeHtml(article.destination)}?</h2>
        ${article.sections.thingsToDoSummary ? `<div class="prose-text" style="margin-bottom:1.25rem;">${escapeHtml(article.sections.thingsToDoSummary)}</div>` : ''}
        <div class="activities-list">
          ${article.sections.thingsToDo.map((act, idx) => `
          <div class="activity-item">
            <span class="activity-num">${idx + 1}</span>
            <div>${escapeHtml(act)}</div>
          </div>
          `).join('')}
        </div>
      </section>

      <!-- 5. Food to Try -->
      <section id="food-to-try" class="article-section">
        <h2 class="section-h2">5. Food to Try</h2>
        <div class="food-grid">
          ${article.sections.foodToTry.map((food, idx) => {
            const labels = ['Local Specialty', 'Culinary Icon', 'Daily Delicacy', 'Must-Try Flavor'];
            const tag = labels[idx % labels.length];
            return `
          <div class="food-card">
            <div>
              <div style="font-size:0.75rem; color:#78350f; font-weight:700; text-transform:uppercase;">${tag}</div>
              <h3 class="food-title">${escapeHtml(food.dish)}</h3>
              <p class="food-desc">${escapeHtml(food.description)}</p>
            </div>
            <div class="food-meta"><strong>Where:</strong> ${escapeHtml(food.whereToTaste)} | <strong>Profile:</strong> ${escapeHtml(food.flavorProfile)}</div>
          </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- 6. Best Time to Visit -->
      <section id="best-time-to-visit" class="article-section">
        <h2 class="section-h2">6. What Is the Best Time to Visit ${escapeHtml(article.destination)}?</h2>
        <div class="prose-text">${escapeHtml(article.sections.bestTimeToVisit.summary)}</div>
        <div class="season-grid">
          <div class="season-card">
            <span class="season-card-label">Peak Season</span>
            <p>${escapeHtml(article.sections.bestTimeToVisit.peakSeason)}</p>
          </div>
          <div class="season-card recommended">
            <span class="season-card-label">Shoulder Season (Recommended)</span>
            <p>${escapeHtml(article.sections.bestTimeToVisit.shoulderSeason)}</p>
          </div>
          <div class="season-card">
            <span class="season-card-label">Low Season</span>
            <p>${escapeHtml(article.sections.bestTimeToVisit.lowSeason)}</p>
          </div>
        </div>
      </section>

      <!-- 7. How to Get There -->
      <section id="how-to-get-there" class="article-section">
        <h2 class="section-h2">7. How to Get There</h2>
        <div class="transit-grid">
          <div class="transit-card">
            <div>✈️</div>
            <div>
              <h3 class="transit-card-title">By Air & International Arrivals</h3>
              <p class="transit-card-body">${escapeHtml(article.sections.howToGetThere.byAir)}</p>
            </div>
          </div>
          <div class="transit-card">
            <div>🚗</div>
            <div>
              <h3 class="transit-card-title">Local Transit & Getting Around</h3>
              <p class="transit-card-body">${escapeHtml(article.sections.howToGetThere.localTransit)}</p>
            </div>
          </div>
          <div class="transit-card">
            <div>🛂</div>
            <div>
              <h3 class="transit-card-title">Entry Visas & Regulations</h3>
              <p class="transit-card-body">${escapeHtml(article.sections.howToGetThere.entryRequirements)}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. Where to Stay -->
      <section id="where-to-stay" class="article-section">
        <h2 class="section-h2">8. Where Should You Stay in ${escapeHtml(article.destination)}?</h2>
        ${article.sections.whereToStaySummary ? `<div class="prose-text" style="margin-bottom:1.25rem;">${escapeHtml(article.sections.whereToStaySummary)}</div>` : ''}
        <div class="stays-grid">
          ${article.sections.whereToStay.map((stay) => `
          <div class="stay-card">
            <div>
              <h3 class="stay-area">${escapeHtml(stay.area)}</h3>
              <div class="stay-vibe">&ldquo;${escapeHtml(stay.vibe)}&rdquo;</div>
              <p style="font-size:0.8rem; margin-top:0.4rem;"><strong>Ideal for:</strong> ${escapeHtml(stay.idealFor)}</p>
            </div>
            <div class="stay-recs"><strong>Curated Stays:</strong> ${escapeHtml(stay.recommendations)}</div>
          </div>
          `).join('')}
        </div>
      </section>

      <!-- 9. Estimated Budget -->
      <section id="estimated-budget" class="article-section">
        <h2 class="section-h2">9. Estimated Budget</h2>
        <div class="budget-control-bar">
          <span style="font-size:0.8rem; color:#78716c;">Currency: <strong>${escapeHtml(article.sections.estimatedBudget.currencyName)}</strong></span>
          <div class="budget-tier-buttons">
            <button class="budget-tier-btn" data-tier="budget">Budget</button>
            <button class="budget-tier-btn active" data-tier="mid-range">Mid-Range</button>
            <button class="budget-tier-btn" data-tier="luxury">Luxury</button>
          </div>
        </div>

        <div class="budget-display-card">
          ${article.sections.estimatedBudget.tiers.map((t) => {
            const tierAttr = t.tier === 'Budget' ? 'budget' : t.tier === 'Mid-Range' ? 'mid-range' : 'luxury';
            const display = t.tier === 'Mid-Range' ? 'block' : 'none';
            const badge = t.tier === 'Budget' ? 'Backpacker / Value' : t.tier === 'Mid-Range' ? 'Comfort & Boutique' : '5-Star Resort & Luxury';
            return `
          <div class="budget-tier-content" data-tier="${tierAttr}" style="display:${display};">
            <div class="budget-tier-header">
              <div>
                <span style="font-size:0.7rem; font-weight:700; text-transform:uppercase; color:#78350f;">${badge}</span>
                <h3>${escapeHtml(t.tier)} Traveler</h3>
              </div>
              <div class="budget-tier-cost">${escapeHtml(t.dailyCost)}</div>
            </div>
            <div class="budget-breakdown-grid">
              <div class="breakdown-item"><span class="breakdown-label">Accommodation</span><span class="breakdown-val">${escapeHtml(t.accommodation)}</span></div>
              <div class="breakdown-item"><span class="breakdown-label">Food & Dining</span><span class="breakdown-val">${escapeHtml(t.meals)}</span></div>
              <div class="breakdown-item"><span class="breakdown-label">Transport</span><span class="breakdown-val">${escapeHtml(t.transport)}</span></div>
              <div class="breakdown-item"><span class="breakdown-label">Activities</span><span class="breakdown-val">${escapeHtml(t.activities)}</span></div>
            </div>
          </div>
            `;
          }).join('')}

          <div class="budget-hacks-box">
            <h4>Money Saving Hacks in ${escapeHtml(article.destination)}</h4>
            <ul class="budget-hacks-list">
              ${article.sections.estimatedBudget.moneySavingTips.map((tip) => `
              <li>${escapeHtml(tip)}</li>
              `).join('')}
            </ul>
          </div>
        </div>
      </section>

      <!-- 10. Travel Tips -->
      <section id="travel-tips" class="article-section">
        <h2 class="section-h2">10. Travel Tips</h2>
        <div class="tips-grid">
          ${article.sections.travelTips.map((tip) => `
          <div class="tip-card">
            <div class="tip-top"><span class="tip-category">${escapeHtml(tip.category)}</span></div>
            <strong>${escapeHtml(tip.title)}</strong>
            <p class="tip-body">${escapeHtml(tip.tip)}</p>
          </div>
          `).join('')}
        </div>
      </section>

      <!-- 11. What Makes It Memorable -->
      <section id="what-makes-it-memorable" class="article-section">
        <h2 class="section-h2">11. What Makes It Memorable</h2>
        <div class="memorable-box">
          <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#78350f;">✨ The Sensory Essence</div>
          <div class="memorable-quote">&ldquo;${escapeHtml(article.sections.whatMakesItMemorable)}&rdquo;</div>
        </div>
      </section>

      <!-- 12. Conclusion -->
      <section id="conclusion" class="article-section">
        <h2 class="section-h2">12. Conclusion</h2>
        <div class="prose-text">${escapeHtml(article.sections.conclusion)}</div>
      </section>

      <!-- Pagination to Prev / Next Articles -->
      <div class="article-pagination">
        ${prev ? `
        <a href="${prev.url}" class="nav-card prev">
          <span class="nav-card-kicker">← Previous Destination</span>
          <span class="nav-card-title">${escapeHtml(prev.title)}</span>
        </a>
        ` : '<div></div>'}
        ${next ? `
        <a href="${next.url}" class="nav-card next">
          <span class="nav-card-kicker">Next Destination →</span>
          <span class="nav-card-title">${escapeHtml(next.title)}</span>
        </a>
        ` : '<div></div>'}
      </div>
    </main>
  </div>

  <!-- Global Footer -->
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-brand-title">Destination Diaries</div>
          <p class="footer-desc">An independent travel journalism compendium exploring 10 extraordinary world destinations. Every guide features comprehensive itineraries, deep cultural insights, local culinary maps, and honest budget assessments.</p>
        </div>
        <div>
          <div class="footer-nav-h4">The 10 World Guides</div>
          <ul class="footer-articles-list">
            ${ALL_ARTICLES.map((a, idx) => `
            <li><a href="${a.url}" class="footer-article-link">${idx + 1}. ${escapeHtml(a.destination)}, ${escapeHtml(a.country)} →</a></li>
            `).join('')}
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 Destination Diaries. Curated for curious, respectful global travelers.</div>
        <div><a href="/" style="color:#a8a29e;">Destination Diaries Homepage</a></div>
      </div>
    </div>
  </footer>

  <!-- Bookmarks Drawer Modal -->
  <div id="bookmarks-drawer" class="drawer-backdrop">
    <div class="drawer-panel">
      <div class="drawer-header">
        <h3 class="drawer-title">Saved Travel Guides</h3>
        <button id="close-drawer-btn" style="font-size:1.2rem; color:#78716c;">✕</button>
      </div>
      <div id="drawer-items-list" class="drawer-body"></div>
      <div class="drawer-footer">
        <button id="clear-saved-btn" style="font-size:0.75rem; color:#dc2626;">Clear all saved</button>
        <button onclick="document.getElementById('bookmarks-drawer').classList.remove('open')" class="btn-tool" style="background:#1c1917; color:#fff;">Done</button>
      </div>
    </div>
  </div>

  <!-- Search Modal -->
  <div id="search-modal" class="search-modal-backdrop">
    <div class="search-dialog">
      <div class="search-input-wrap">
        <span>🔍</span>
        <input type="text" id="search-modal-input" class="search-input" placeholder="Search destination, country, food, attractions...">
        <button id="close-search-btn" style="color:#78716c;">✕</button>
      </div>
      <ul id="search-results" class="search-results-list"></ul>
    </div>
  </div>

  <div id="toast-notice" class="toast-notice"></div>

  <script src="/js/article.js"></script>
</body>
</html>
`;
}

// Generate all 10 articles into both /public/articles and /articles
const publicArticlesDir = path.resolve('public', 'articles');
const rootArticlesDir = path.resolve('articles');

if (!fs.existsSync(publicArticlesDir)) {
  fs.mkdirSync(publicArticlesDir, { recursive: true });
}
if (!fs.existsSync(rootArticlesDir)) {
  fs.mkdirSync(rootArticlesDir, { recursive: true });
}

for (const article of ALL_ARTICLES) {
  const filename = path.basename(article.url); // e.g. bali-indonesia.html
  const html = renderArticleHtml(article);

  const publicDest = path.join(publicArticlesDir, filename);
  const rootDest = path.join(rootArticlesDir, filename);

  fs.writeFileSync(publicDest, html, 'utf8');
  fs.writeFileSync(rootDest, html, 'utf8');
  console.log(`Generated: ${filename} (${html.length} bytes)`);
}

console.log('All 10 articles generated successfully!');
