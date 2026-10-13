/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ALL_ARTICLES, getArticleBySlug } from './data/articles.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { ArticleCard } from './components/ArticleCard.tsx';
import { ArticleView } from './components/ArticleView.tsx';
import { BookmarksDrawer } from './components/BookmarksDrawer.tsx';
import { VercelDeployModal } from './components/VercelDeployModal.tsx';
import { Toast } from './components/Toast.tsx';
import { Sparkles, Globe, Compass, Filter, BookOpen } from 'lucide-react';

export default function App() {
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  // Canonical regions map for matching case-insensitively
  const REGION_LOOKUP: Record<string, string> = useMemo(() => ({
    'all': 'All',
    'asia': 'Asia',
    'europe': 'Europe',
    'north-america': 'North America',
    'north america': 'North America',
    'middle-east': 'Middle East',
    'middle east': 'Middle East',
    'oceania': 'Oceania',
  }), []);

  // Parse category/region from window.location.search
  const getRegionFromURL = (): string => {
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get('category') || params.get('region');
      if (raw) {
        const normalized = raw.trim().toLowerCase().replace(/\+/g, ' ');
        if (REGION_LOOKUP[normalized]) {
          return REGION_LOOKUP[normalized];
        }
      }
    } catch {
      // fallback
    }
    return 'All';
  };

  const [selectedRegion, setSelectedRegion] = useState<string>(() => getRegionFromURL());
  const [searchQuery, setSearchQuery] = useState('');
  const [readTimeFilter, setReadTimeFilter] = useState<'All' | 'Under15' | 'Over15'>('All');
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global font size management (12px to 22px, default 16px, 1px step)
  const MIN_FONT_SIZE = 12;
  const MAX_FONT_SIZE = 22;
  const DEFAULT_FONT_SIZE = 16;

  const [fontSize, setFontSize] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('destination_font_size');
      if (stored) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val >= MIN_FONT_SIZE && val <= MAX_FONT_SIZE) {
          return val;
        }
      }
    } catch {}
    return DEFAULT_FONT_SIZE;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    try {
      localStorage.setItem('destination_font_size', fontSize.toString());
    } catch {}
  }, [fontSize]);

  const handleDecreaseFontSize = () => {
    setFontSize((prev) => Math.max(MIN_FONT_SIZE, prev - 1));
  };

  const handleIncreaseFontSize = () => {
    setFontSize((prev) => Math.min(MAX_FONT_SIZE, prev + 1));
  };

  // Bookmarks loaded from localStorage
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('destination_saved_guides') || localStorage.getItem('wanderlust_saved_guides');
      return stored ? JSON.parse(stored) : ['article-bali', 'article-paris'];
    } catch {
      return ['article-bali'];
    }
  });

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('destination_saved_guides', JSON.stringify(savedArticleIds));
    } catch {
      // Storage unavailable fallback
    }
  }, [savedArticleIds]);

  // Function to change region and update URL parameter (?category=asia)
  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
    try {
      const url = new URL(window.location.href);
      if (region === 'All') {
        url.searchParams.delete('category');
        url.searchParams.delete('region');
      } else {
        url.searchParams.delete('region');
        // Clean URL query e.g. ?category=asia or ?category=middle-east
        const slug = region.toLowerCase().replace(/\s+/g, '-');
        url.searchParams.set('category', slug);
      }
      window.history.pushState({}, '', url.toString());
    } catch {
      // Ignore if history API restricted
    }
  };

  // Sync state if user navigates back/forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setSelectedRegion(getRegionFromURL());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [REGION_LOOKUP]);

  // Handle URL hash routing (e.g. #bali-indonesia-ultimate-tropical-escape)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const matching = ALL_ARTICLES.find((a) => a.slug === hash);
        if (matching) {
          setSelectedArticleSlug(matching.slug);
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }
      setSelectedArticleSlug(null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectArticle = (slug: string) => {
    window.location.hash = slug;
    setSelectedArticleSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    window.location.hash = '';
    setSelectedArticleSlug(null);
    setSearchQuery('');
    handleSelectRegion('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedArticleIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from saved reading list');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your reading list');
        return [...prev, id];
      }
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setSavedArticleIds((prev) => prev.filter((item) => item !== id));
    showToast('Removed guide from reading list');
  };

  const handleClearAllBookmarks = () => {
    setSavedArticleIds([]);
    showToast('Cleared all saved guides');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 3200);
  };

  const handleShare = (title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Link for "${title}" copied to clipboard!`);
    } else {
      showToast(`Share URL ready: ${window.location.href}`);
    }
  };

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((article) => {
      // Region filter
      if (selectedRegion !== 'All' && article.region !== selectedRegion) {
        return false;
      }

      // Read time filter
      if (readTimeFilter === 'Under15' && article.readTimeMinutes >= 15) {
        return false;
      }
      if (readTimeFilter === 'Over15' && article.readTimeMinutes < 15) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesBasic =
          article.title.toLowerCase().includes(q) ||
          article.destination.toLowerCase().includes(q) ||
          article.country.toLowerCase().includes(q) ||
          article.subtitle.toLowerCase().includes(q);

        const matchesAttractions = article.sections.majorAttractions.some(
          (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
        );

        const matchesFood = article.sections.foodToTry.some(
          (f) => f.dish.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
        );

        return matchesBasic || matchesAttractions || matchesFood;
      }

      return true;
    });
  }, [selectedRegion, readTimeFilter, searchQuery]);

  const savedArticlesList = useMemo(() => {
    return ALL_ARTICLES.filter((a) => savedArticleIds.includes(a.id));
  }, [savedArticleIds]);

  const currentArticle = selectedArticleSlug ? getArticleBySlug(selectedArticleSlug) : null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Global Header */}
      <Header
        onGoHome={handleGoHome}
        savedCount={savedArticleIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRegion={selectedRegion}
        onSelectRegion={handleSelectRegion}
        isArticleView={Boolean(currentArticle)}
        fontSize={fontSize}
        onDecreaseFontSize={handleDecreaseFontSize}
        onIncreaseFontSize={handleIncreaseFontSize}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentArticle ? (
          /* Single Article Long-Form View */
          <ArticleView
            article={currentArticle}
            onBack={handleGoHome}
            isBookmarked={savedArticleIds.includes(currentArticle.id)}
            onToggleBookmark={() => handleToggleBookmark(currentArticle.id)}
            onSelectArticle={handleSelectArticle}
            onShare={handleShare}
            fontSize={fontSize}
            onDecreaseFontSize={handleDecreaseFontSize}
            onIncreaseFontSize={handleIncreaseFontSize}
          />
        ) : (
          /* Homepage / All 10 Guides Feed */
          <div>
            {/* Hero Magazine Section */}
            <section className="bg-stone-900 text-stone-100 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800 relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-widest">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>The Definitive Travel Compendium</span>
                </div>

                <h1 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
                  10 Destinations That Will Alter Your Perspective
                </h1>

                <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
                  From the mist-shrouded rice terraces of Bali to the volcanic white cliffs of Santorini and the jagged peaks of the Swiss Alps. Ten comprehensive, long-form guides crafted with genuine travel insights.
                </p>

                {/* Quick stats strip */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-medium text-stone-400">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <span>5 Continents Explored</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>10 Full Long-Form Guides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>All 12 Core Travel Pillars Included</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Filter and Control Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-editorial text-2xl font-bold text-stone-900">
                      {searchQuery
                        ? `Search Results for "${searchQuery}"`
                        : selectedRegion === 'All'
                        ? 'All Travel Guides'
                        : `${selectedRegion} Guides`}
                    </h2>
                    {selectedRegion !== 'All' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                        <span>Region: {selectedRegion}</span>
                        <button
                          type="button"
                          onClick={() => handleSelectRegion('All')}
                          className="hover:text-amber-950 ml-0.5 font-bold cursor-pointer"
                          title="Clear region filter"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Showing {filteredArticles.length} of {ALL_ARTICLES.length} published destination articles
                    {selectedRegion !== 'All' && ` in ${selectedRegion}`}
                  </p>
                </div>

                {/* Filter Controls */}
                <div className="flex items-center flex-wrap gap-2 text-xs">
                  {/* Quick Region Selector on small screens where header nav is collapsed */}
                  <div className="md:hidden flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1">
                    <div className="flex items-center gap-1 text-stone-500 shrink-0 mr-1">
                      <Globe className="w-3.5 h-3.5 text-stone-400" />
                      <span>Region:</span>
                    </div>
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl shrink-0">
                      {['All', 'Asia', 'Europe', 'North America', 'Middle East', 'Oceania'].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handleSelectRegion(r)}
                          className={`px-2.5 py-1 text-xs rounded-lg transition-all font-medium cursor-pointer ${
                            selectedRegion === r
                              ? 'bg-stone-900 text-white font-semibold shadow-xs'
                              : 'text-stone-600 hover:text-stone-900'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-stone-500 mr-2">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Read Length:</span>
                  </div>
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                    <button
                      onClick={() => setReadTimeFilter('All')}
                      className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                        readTimeFilter === 'All' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      All Lengths
                    </button>
                    <button
                      onClick={() => setReadTimeFilter('Under15')}
                      className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                        readTimeFilter === 'Under15' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      &lt; 15 min
                    </button>
                    <button
                      onClick={() => setReadTimeFilter('Over15')}
                      className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                        readTimeFilter === 'Over15' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      15+ min In-Depth
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
              {filteredArticles.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <p className="font-editorial text-xl text-stone-700">No destinations matched your criteria</p>
                  <p className="text-xs text-stone-500">Try adjusting your search terms or clearing region filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      handleSelectRegion('All');
                      setReadTimeFilter('All');
                    }}
                    className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Lead Featured Article (Shown full-width if no search query) */}
                  {!searchQuery && selectedRegion === 'All' && readTimeFilter === 'All' && filteredArticles[0] && (
                    <div className="mb-10">
                      <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
                        Featured Long-Form Expedition
                      </div>
                      <ArticleCard
                        article={filteredArticles[0]}
                        isBookmarked={savedArticleIds.includes(filteredArticles[0].id)}
                        onToggleBookmark={handleToggleBookmark}
                        onSelectArticle={handleSelectArticle}
                        featured={true}
                      />
                    </div>
                  )}

                  {/* Rest of the 9 Articles in a pristine 2-column or 3-column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(!searchQuery && selectedRegion === 'All' && readTimeFilter === 'All'
                      ? filteredArticles.slice(1)
                      : filteredArticles
                    ).map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        isBookmarked={savedArticleIds.includes(article.id)}
                        onToggleBookmark={handleToggleBookmark}
                        onSelectArticle={handleSelectArticle}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Travel Philosophy / Editorial Callout Section */}
            <section className="bg-white border-y border-stone-200 py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                  Our Editorial Standard
                </span>
                <h3 className="font-editorial text-3xl font-bold text-stone-900">
                  Travel As Cultural Exchange, Not Just Consumption
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
                  Every guide in Destination Diaries is built on deep respect for local communities, authentic culinary traditions, environmental stewardship, and realistic financial budgets. We believe that stepping into the unknown should make you more humble, empathetic, and attuned to the beauty of our world.
                </p>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectArticle={handleSelectArticle}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />

      {/* Saved Bookmarks Reading List Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAll={handleClearAllBookmarks}
      />

      {/* Vercel Deployment Instructions Modal */}
      <VercelDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onCopyNotice={showToast}
      />
    </div>
  );
}
