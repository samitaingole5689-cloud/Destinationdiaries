/**
 * Destination Diaries — Article Interactive Client Script (Vanilla JS)
 * Implements: Progress bar, TOC highlight, Budget switcher, Font zoom,
 * Bookmarks persistence (localStorage), Bookmarks drawer, Live Search, Share Toast.
 */

(function () {
  'use strict';

  // 10 Articles Index for Search and Saved Drawer
  const ALL_DESTINATIONS = [
    {
      id: 'article-bali',
      title: 'Bali, Indonesia — The Ultimate Tropical Escape',
      destination: 'Bali',
      country: 'Indonesia',
      url: '/articles/bali-indonesia.html',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Lush emerald rice terraces, sacred volcanic sea temples, and spiritual soul.'
    },
    {
      id: 'article-paris',
      title: 'Paris, France — The City of Art, Culture and Romance',
      destination: 'Paris',
      country: 'France',
      url: '/articles/paris-france.html',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Grand Haussmannian boulevards, iconic zinc rooftops, and legendary art.'
    },
    {
      id: 'article-santorini',
      title: 'Santorini, Greece — White Villages and Blue Seas',
      destination: 'Santorini',
      country: 'Greece',
      url: '/articles/santorini-greece.html',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Dazzling whitewashed cliffside dwellings and sapphire church domes in Oia.'
    },
    {
      id: 'article-switzerland',
      title: 'Switzerland — A Journey Through the Swiss Alps',
      destination: 'Swiss Alps',
      country: 'Switzerland',
      url: '/articles/switzerland.html',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Towering pyramidal peaks, crystalline glacial lakes, and alpine railways.'
    },
    {
      id: 'article-maldives',
      title: 'Maldives — Paradise in the Indian Ocean',
      destination: 'The Maldives',
      country: 'Republic of Maldives',
      url: '/articles/maldives.html',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Crystalline turquoise lagoons, overwater bungalows, and manta rays.'
    },
    {
      id: 'article-kyoto',
      title: 'Kyoto, Japan — Tradition, Temples and Tranquility',
      destination: 'Kyoto',
      country: 'Japan',
      url: '/articles/kyoto-japan.html',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Vermilion torii gate tunnels, Zen rock gardens, and whispering bamboo.'
    },
    {
      id: 'article-nyc',
      title: 'New York City, USA — The City That Never Sleeps',
      destination: 'New York City',
      country: 'United States',
      url: '/articles/new-york-city.html',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Towering skyscraper canyons, Broadway marquees, and Central Park paths.'
    },
    {
      id: 'article-dubai',
      title: 'Dubai, UAE — Where Luxury Meets the Desert',
      destination: 'Dubai',
      country: 'United Arab Emirates',
      url: '/articles/dubai-uae.html',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Futuristic hyper-skyscrapers, undulating red dunes, and historic souks.'
    },
    {
      id: 'article-queenstown',
      title: 'Queenstown, New Zealand — The Adventure Capital',
      destination: 'Queenstown',
      country: 'New Zealand',
      url: '/articles/queenstown-new-zealand.html',
      image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Glaciated Remarkables peaks, deep fjords, and heart-racing thrills.'
    },
    {
      id: 'article-amalfi',
      title: 'Amalfi Coast, Italy — Italy’s Scenic Coastal Escape',
      destination: 'Amalfi Coast',
      country: 'Italy',
      url: '/articles/amalfi-coast.html',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=300&q=80',
      subtitle: 'Pastel cliffside villas, terraced lemon groves, and Mediterranean romance.'
    }
  ];

  // Current Article ID from document data attribute
  const currentArticleId = document.documentElement.getAttribute('data-article-id') || '';

  // 1. Reading Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    if (!progressBar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrolled = (window.scrollY / docHeight) * 100;
      progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
    }
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  // 2. Table of Contents Active Link Highlight
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = Array.from(document.querySelectorAll('.article-section'));

  function updateActiveToc() {
    if (sections.length === 0) return;
    const scrollPos = window.scrollY + 160;
    let activeId = '';

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (sec.offsetTop <= scrollPos) {
        activeId = sec.id;
      }
    }

    tocLinks.forEach((link) => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      if (targetId === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveToc, { passive: true });

  // 3. Interactive Budget Tier Switcher
  const budgetBtns = document.querySelectorAll('.budget-tier-btn');
  const budgetViews = document.querySelectorAll('.budget-tier-content');

  budgetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedTier = btn.getAttribute('data-tier');
      budgetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      budgetViews.forEach((view) => {
        if (view.getAttribute('data-tier') === selectedTier) {
          view.style.display = 'block';
        } else {
          view.style.display = 'none';
        }
      });
    });
  });

  // 4. Font Size Adjustment
  const fontNormalBtn = document.getElementById('btn-font-normal');
  const fontLargeBtn = document.getElementById('btn-font-large');
  const articleBody = document.querySelector('.article-main-body');

  if (fontNormalBtn && fontLargeBtn && articleBody) {
    fontNormalBtn.addEventListener('click', () => {
      articleBody.classList.remove('font-size-large', 'font-size-xlarge');
      fontNormalBtn.classList.add('active');
      fontLargeBtn.classList.remove('active');
    });

    fontLargeBtn.addEventListener('click', () => {
      articleBody.classList.add('font-size-large');
      fontLargeBtn.classList.add('active');
      fontNormalBtn.classList.remove('active');
    });
  }

  // 5. Toast System
  const toastEl = document.getElementById('toast-notice');
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3000);
  }

  // 6. Share Button
  const shareBtn = document.getElementById('btn-share');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Link copied to clipboard!');
        });
      } else {
        showToast('Link: ' + window.location.href);
      }
    });
  }

  // 7. LocalStorage Saved Bookmarks Management
  const STORAGE_KEY = 'destination_saved_guides';
  const LEGACY_STORAGE_KEY = 'wanderlust_saved_guides';
  function getSavedIds() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      return raw ? JSON.parse(raw) : ['article-bali', 'article-paris'];
    } catch {
      return ['article-bali'];
    }
  }

  function saveIds(ids) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      updateSavedBadge();
    } catch {
      // storage quota or disabled
    }
  }

  function updateSavedBadge() {
    const ids = getSavedIds();
    const badges = document.querySelectorAll('.saved-count-badge');
    badges.forEach((b) => {
      b.textContent = ids.length;
      b.style.display = ids.length > 0 ? 'inline-block' : 'none';
    });
  }

  // Initialize Article Bookmark Button State
  const bookmarkBtn = document.getElementById('btn-bookmark');
  function refreshBookmarkBtn() {
    if (!bookmarkBtn || !currentArticleId) return;
    const ids = getSavedIds();
    const isSaved = ids.includes(currentArticleId);
    if (isSaved) {
      bookmarkBtn.classList.add('active');
      bookmarkBtn.innerHTML = '★ Saved';
    } else {
      bookmarkBtn.classList.remove('active');
      bookmarkBtn.innerHTML = '☆ Save';
    }
  }

  if (bookmarkBtn) {
    refreshBookmarkBtn();
    bookmarkBtn.addEventListener('click', () => {
      let ids = getSavedIds();
      if (ids.includes(currentArticleId)) {
        ids = ids.filter((id) => id !== currentArticleId);
        saveIds(ids);
        showToast('Removed from saved reading list');
      } else {
        ids.push(currentArticleId);
        saveIds(ids);
        showToast('Saved to your reading list');
      }
      refreshBookmarkBtn();
      renderSavedDrawer();
    });
  }

  // 8. Bookmarks Drawer
  const drawerBackdrop = document.getElementById('bookmarks-drawer');
  const openDrawerBtns = document.querySelectorAll('.open-bookmarks-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerList = document.getElementById('drawer-items-list');
  const clearAllBtn = document.getElementById('clear-saved-btn');

  function renderSavedDrawer() {
    if (!drawerList) return;
    const ids = getSavedIds();
    const saved = ALL_DESTINATIONS.filter((d) => ids.includes(d.id));

    if (saved.length === 0) {
      drawerList.innerHTML = `
        <div class="drawer-empty">
          <p style="font-weight:600; margin-bottom: 0.35rem;">No saved articles yet</p>
          <p style="font-size:0.75rem; color:#a8a29e;">Click the Save button on any guide to store it here for offline reading.</p>
        </div>
      `;
      return;
    }

    drawerList.innerHTML = saved
      .map(
        (item) => `
      <div class="drawer-item">
        <img src="${item.image}" alt="${item.destination}" loading="lazy" />
        <div class="drawer-item-info">
          <div>
            <div style="font-size:0.68rem; color:#78350f; font-weight:700; text-transform:uppercase;">${item.country}</div>
            <a href="${item.url}" class="drawer-item-title" style="color:#1c1917; text-decoration:none;">${item.destination}</a>
            <div class="drawer-item-sub">${item.subtitle}</div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem; font-size:0.75rem;">
            <a href="${item.url}" style="color:#78350f; font-weight:600;">Read guide →</a>
            <button class="remove-single-btn" data-id="${item.id}" style="color:#a8a29e; font-size:0.75rem;">Remove</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    // Attach remove handlers
    drawerList.querySelectorAll('.remove-single-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idToRemove = btn.getAttribute('data-id');
        let ids = getSavedIds().filter((id) => id !== idToRemove);
        saveIds(ids);
        refreshBookmarkBtn();
        renderSavedDrawer();
        showToast('Guide removed from saved list');
      });
    });
  }

  function openDrawer() {
    renderSavedDrawer();
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
  }

  function closeDrawer() {
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
  }

  openDrawerBtns.forEach((btn) => btn.addEventListener('click', openDrawer));
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeDrawer();
    });
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      saveIds([]);
      refreshBookmarkBtn();
      renderSavedDrawer();
      showToast('Cleared all saved guides');
    });
  }

  // 9. Live Search Modal
  const searchTriggerBtns = document.querySelectorAll('.open-search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-modal-input');
  const searchResults = document.getElementById('search-results');
  const closeSearchBtn = document.getElementById('close-search-btn');

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('open');
      if (searchInput) {
        searchInput.value = '';
        renderSearchResults('');
        setTimeout(() => searchInput.focus(), 50);
      }
    }
  }

  function closeSearch() {
    if (searchModal) searchModal.classList.remove('open');
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const q = query.toLowerCase().trim();
    const matches = ALL_DESTINATIONS.filter(
      (item) =>
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.destination.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<li style="padding:1.5rem; text-align:center; color:#78716c; font-size:0.85rem;">No matching travel guides found for "${query}"</li>`;
      return;
    }

    searchResults.innerHTML = matches
      .map(
        (item) => `
      <li class="search-result-item">
        <a href="${item.url}">
          <span style="font-size:0.7rem; font-weight:700; color:#78350f; text-transform:uppercase;">${item.country}</span>
          <span style="font-weight:700; font-family:var(--font-serif); font-size:1rem; color:#1c1917;">${item.title}</span>
          <span style="font-size:0.78rem; color:#78716c;">${item.subtitle}</span>
        </a>
      </li>
    `
      )
      .join('');
  }

  searchTriggerBtns.forEach((btn) => btn.addEventListener('click', openSearch));
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);
  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
  }
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // Keyboard escape key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeDrawer();
    }
  });

  // Initial runs
  updateSavedBadge();
  updateProgress();
  updateActiveToc();
})();
