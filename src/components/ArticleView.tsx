import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Compass,
  Utensils,
  Bed,
  Plane,
  ShieldCheck,
  Check,
  ChevronRight,
  Sparkles,
  BookOpen,
  Ticket,
  Lightbulb,
} from 'lucide-react';
import { Article } from '../types/blog.ts';
import { getAdjacentArticles } from '../data/articles.ts';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectArticle: (slug: string) => void;
  onShare: (title: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
  onShare,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeBudgetTier, setActiveBudgetTier] = useState<'Budget' | 'Mid-Range' | 'Luxury'>('Mid-Range');
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const { prev, next } = getAdjacentArticles(article.slug);

  // Scroll Progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tocItems = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'why-dream-destination', label: '2. Why It’s a Dream Destination' },
    { id: 'major-attractions', label: '3. Major Attractions' },
    { id: 'things-to-do', label: '4. Things to Do' },
    { id: 'food-to-try', label: '5. Food to Try' },
    { id: 'best-time-to-visit', label: '6. Best Time to Visit' },
    { id: 'how-to-get-there', label: '7. How to Get There' },
    { id: 'where-to-stay', label: '8. Where to Stay' },
    { id: 'estimated-budget', label: '9. Estimated Budget' },
    { id: 'travel-tips', label: '10. Travel Tips' },
    { id: 'what-makes-it-memorable', label: '11. What Makes It Memorable' },
    { id: 'conclusion', label: '12. Conclusion' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getProseFontSize = () => {
    if (fontSizeLevel === 'large') return 'text-lg leading-relaxed';
    if (fontSizeLevel === 'xlarge') return 'text-xl leading-loose';
    return 'text-base leading-relaxed';
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Sticky Scroll Progress Bar */}
      <div
        className="fixed top-16 left-0 h-1 bg-amber-700 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Top Floating Nav Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All 10 Guides</span>
          </button>

          {/* Quick jump menu & reading tools */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Font size toggler */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg text-xs font-semibold text-stone-600">
              <button
                onClick={() => setFontSizeLevel('normal')}
                className={`px-2 py-1 rounded ${fontSizeLevel === 'normal' ? 'bg-white text-stone-900 shadow-2xs' : 'hover:text-stone-900'}`}
                title="Normal font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeLevel('large')}
                className={`px-2 py-1 rounded text-sm ${fontSizeLevel === 'large' ? 'bg-white text-stone-900 shadow-2xs' : 'hover:text-stone-900'}`}
                title="Large font size"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                isBookmarked
                  ? 'bg-amber-800 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {/* Share button */}
            <button
              onClick={() => onShare(article.title)}
              className="p-1.5 sm:px-3 sm:py-1 rounded-lg text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors flex items-center gap-1.5"
              title="Share this guide"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Hero Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6">
        {/* Zero-pill metadata */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
          <span className="text-amber-800">{article.country}</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span>{article.region}</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="text-stone-500 normal-case">{article.publishDate}</span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="text-stone-500 normal-case flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            {article.readTimeMinutes} min read
          </span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-5xl lg:text-5xl font-extrabold text-stone-900 leading-tight mb-4 tracking-tight">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-normal mb-4 max-w-3xl">
          {article.subtitle}
        </p>
      </header>

      {/* Featured Lead Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
          <img
            src={article.featuredImage.url}
            alt={article.featuredImage.alt}
            className="w-full h-[380px] sm:h-[500px] object-cover"
          />
          <div className="p-3 sm:px-4 bg-white text-xs text-stone-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-t border-stone-100">
            <span>{article.featuredImage.caption}</span>
            {article.featuredImage.photographer && (
              <span className="text-stone-400">Photo: {article.featuredImage.photographer}</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky TOC Sidebar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Table of Contents Desktop Sticky Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-32 space-y-4 p-4 rounded-xl bg-stone-100/70 border border-stone-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>Guide Contents</span>
            </div>
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left px-2 py-1.5 rounded text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors truncate block"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Primary Article Content: 12 Detailed Sections */}
        <article className="lg:col-span-9 space-y-12">
          {/* Quick Facts Card */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs">
            <h3 className="font-editorial text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-800" />
              {article.destination} at a Glance
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                <span className="text-stone-500 block mb-0.5">Currency</span>
                <span className="font-bold text-stone-900">{article.quickFacts.currency}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                <span className="text-stone-500 block mb-0.5">Language</span>
                <span className="font-bold text-stone-900">{article.quickFacts.language}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                <span className="text-stone-500 block mb-0.5">Ideal Stay</span>
                <span className="font-bold text-stone-900">{article.quickFacts.idealDuration}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                <span className="text-stone-500 block mb-0.5">Climate</span>
                <span className="font-bold text-stone-900">{article.quickFacts.climate}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                <span className="text-stone-500 block mb-0.5">Best Months</span>
                <span className="font-bold text-stone-900">{article.quickFacts.bestMonths}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                <span className="text-stone-500 block mb-0.5">Timezone</span>
                <span className="font-bold text-stone-900">{article.quickFacts.timezone}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Introduction */}
          <section id="introduction" className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              1. Introduction
            </h2>
            <div className={`text-stone-700 whitespace-pre-line ${getProseFontSize()}`}>
              {article.sections.introduction}
            </div>
          </section>

          {/* Section 2: Why it's a dream destination */}
          <section id="why-dream-destination" className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              2. Why It’s a Dream Destination
            </h2>
            <div className={`text-stone-700 whitespace-pre-line ${getProseFontSize()}`}>
              {article.sections.whyDreamDestination}
            </div>

            {/* Secondary Image Callout 1 */}
            {article.secondaryImages[0] && (
              <figure className="my-6 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                <img
                  src={article.secondaryImages[0].url}
                  alt={article.secondaryImages[0].alt}
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                <figcaption className="p-3 bg-white text-xs text-stone-500 flex justify-between border-t border-stone-100">
                  <span>{article.secondaryImages[0].caption}</span>
                  {article.secondaryImages[0].photographer && (
                    <span className="text-stone-400">Photo: {article.secondaryImages[0].photographer}</span>
                  )}
                </figcaption>
              </figure>
            )}
          </section>

          {/* Section 3: Major attractions */}
          <section id="major-attractions" className="space-y-5">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              3. Major Attractions
            </h2>
            <p className="text-stone-600 text-sm">
              These defining landmarks and natural wonders form the essential fabric of any visit to {article.destination}.
            </p>

            <div className="grid grid-cols-1 gap-6">
              {article.sections.majorAttractions.map((attraction, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-stone-200 rounded-2xl space-y-4 hover:border-stone-300 transition-all shadow-2xs"
                >
                  {/* Attraction Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-editorial text-xl font-bold text-stone-900">
                          {attraction.name}
                        </h3>
                        <span className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-800" />
                          {attraction.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rich Description */}
                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                    {attraction.description}
                  </p>

                  {/* Quick Visitor Intel Strip (Timing, Tickets, Duration) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {attraction.bestTime && (
                      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-xs">
                        <span className="text-stone-400 block font-medium mb-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-500" /> Best Time
                        </span>
                        <span className="text-stone-800 font-semibold">{attraction.bestTime}</span>
                      </div>
                    )}
                    {attraction.ticketInfo && (
                      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-xs">
                        <span className="text-stone-400 block font-medium mb-0.5 flex items-center gap-1">
                          <Ticket className="w-3 h-3 text-stone-500" /> Admission
                        </span>
                        <span className="text-stone-800 font-semibold">{attraction.ticketInfo}</span>
                      </div>
                    )}
                    {attraction.duration && (
                      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-xs">
                        <span className="text-stone-400 block font-medium mb-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-500" /> Time to Spend
                        </span>
                        <span className="text-stone-800 font-semibold">{attraction.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Highlight & Pro Tip Callouts */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs text-amber-950 bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 leading-relaxed">
                      <span className="font-bold text-amber-900 block mb-0.5">Insider Highlight:</span>
                      {attraction.highlight}
                    </div>

                    {attraction.proTip && (
                      <div className="text-xs text-stone-700 bg-stone-100/70 p-3 rounded-xl border border-stone-200/80 leading-relaxed flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-stone-900">Field Pro-Tip: </strong>
                          {attraction.proTip}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Things to do */}
          <section id="things-to-do" className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              4. Things to Do
            </h2>
            <div className="space-y-3">
              {article.sections.thingsToDo.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 bg-white border border-stone-200/80 rounded-xl text-stone-700 text-sm leading-relaxed"
                >
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>{activity}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Food to try */}
          <section id="food-to-try" className="space-y-5">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              5. Food to Try
            </h2>
            <p className="text-stone-600 text-sm">
              Gastronomy is the shortest path to a destination’s soul. Here are four unmissable regional culinary specialties:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.sections.foodToTry.map((food, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-stone-200 rounded-xl flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                      <Utensils className="w-3.5 h-3.5" />
                      Regional Specialty
                    </div>
                    <h3 className="font-editorial text-base font-bold text-stone-900">
                      {food.dish}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {food.description}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs pt-2 border-t border-stone-100">
                    <div>
                      <span className="font-semibold text-stone-800">Where to taste: </span>
                      <span className="text-stone-600">{food.whereToTaste}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-stone-800">Profile: </span>
                      <span className="text-stone-500 italic">{food.flavorProfile}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary Image Callout 2 */}
            {article.secondaryImages[1] && (
              <figure className="my-6 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                <img
                  src={article.secondaryImages[1].url}
                  alt={article.secondaryImages[1].alt}
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                <figcaption className="p-3 bg-white text-xs text-stone-500 flex justify-between border-t border-stone-100">
                  <span>{article.secondaryImages[1].caption}</span>
                  {article.secondaryImages[1].photographer && (
                    <span className="text-stone-400">Photo: {article.secondaryImages[1].photographer}</span>
                  )}
                </figcaption>
              </figure>
            )}
          </section>

          {/* Section 6: Best time to visit */}
          <section id="best-time-to-visit" className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              6. Best Time to Visit
            </h2>
            <p className={`text-stone-700 ${getProseFontSize()}`}>
              {article.sections.bestTimeToVisit.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Peak Season
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {article.sections.bestTimeToVisit.peakSeason}
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Shoulder Season (Recommended)
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {article.sections.bestTimeToVisit.shoulderSeason}
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Low Season
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {article.sections.bestTimeToVisit.lowSeason}
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: How to get there */}
          <section id="how-to-get-there" className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              7. How to Get There
            </h2>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="p-4 bg-white border border-stone-200 rounded-xl flex gap-3">
                <Plane className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 mb-0.5">By Air & International Arrivals</div>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {article.sections.howToGetThere.byAir}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xl flex gap-3">
                <Compass className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 mb-0.5">Local Transit & Transfers</div>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {article.sections.howToGetThere.localTransit}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xl flex gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900 mb-0.5">Entry Visas & Requirements</div>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {article.sections.howToGetThere.entryRequirements}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Where to stay */}
          <section id="where-to-stay" className="space-y-5">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              8. Where to Stay
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {article.sections.whereToStay.map((stay, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-stone-200 rounded-xl flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                      <Bed className="w-3.5 h-3.5" />
                      Neighborhood {idx + 1}
                    </div>
                    <h3 className="font-editorial text-base font-bold text-stone-900">
                      {stay.area}
                    </h3>
                    <p className="text-xs text-stone-500 italic">
                      "{stay.vibe}"
                    </p>
                    <div className="text-xs text-stone-700">
                      <span className="font-semibold text-stone-900">Ideal for: </span>
                      {stay.idealFor}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 text-xs text-stone-600">
                    <span className="font-semibold text-stone-900 block mb-0.5">Curated Stays:</span>
                    {stay.recommendations}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 9: Estimated budget */}
          <section id="estimated-budget" className="space-y-5">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              9. Estimated Budget
            </h2>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-stone-500">
                Reference Currency: <strong className="text-stone-800">{article.sections.estimatedBudget.currencyName}</strong>
              </span>

              {/* Tier Switcher Buttons */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                {(['Budget', 'Mid-Range', 'Luxury'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setActiveBudgetTier(tier)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeBudgetTier === tier
                        ? 'bg-white text-stone-900 shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Budget Tier Breakdown Card */}
            {(() => {
              const selected = article.sections.estimatedBudget.tiers.find(
                (t) => t.tier.toLowerCase().includes(activeBudgetTier.toLowerCase())
              ) || article.sections.estimatedBudget.tiers[1];

              return (
                <div className="p-6 bg-white border border-stone-200 rounded-2xl space-y-5 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block">
                        Estimated Tier Breakdown
                      </span>
                      <h3 className="font-editorial text-xl font-bold text-stone-900">
                        {selected.tier} Traveler
                      </h3>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-stone-900 font-mono">
                      {selected.dailyCost}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-stone-50 p-3 rounded-xl">
                      <span className="text-stone-500 block mb-1">Accommodation</span>
                      <span className="font-semibold text-stone-800">{selected.accommodation}</span>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-xl">
                      <span className="text-stone-500 block mb-1">Food & Dining</span>
                      <span className="font-semibold text-stone-800">{selected.meals}</span>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-xl">
                      <span className="text-stone-500 block mb-1">Transit & Getting Around</span>
                      <span className="font-semibold text-stone-800">{selected.transport}</span>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-xl">
                      <span className="text-stone-500 block mb-1">Activities & Sightseeing</span>
                      <span className="font-semibold text-stone-800">{selected.activities}</span>
                    </div>
                  </div>

                  {/* Money saving tips */}
                  <div className="pt-3 border-t border-stone-100 space-y-2">
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      Money Saving Hacks in {article.destination}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {article.sections.estimatedBudget.moneySavingTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
          </section>

          {/* Section 10: Travel tips */}
          <section id="travel-tips" className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              10. Travel Tips
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.sections.travelTips.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-stone-200 rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">{item.title}</span>
                    <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 11: What makes it memorable */}
          <section id="what-makes-it-memorable" className="space-y-4">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              11. What Makes It Memorable
            </h2>
            <div className="p-6 bg-amber-50/50 border border-amber-200/70 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-700" />
                The Sensory Essence
              </div>
              <div className={`text-stone-800 whitespace-pre-line italic font-serif leading-relaxed text-base sm:text-lg`}>
                "{article.sections.whatMakesItMemorable}"
              </div>
            </div>
          </section>

          {/* Section 12: Conclusion */}
          <section id="conclusion" className="space-y-4 pt-2">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              12. Conclusion
            </h2>
            <div className={`text-stone-700 whitespace-pre-line ${getProseFontSize()}`}>
              {article.sections.conclusion}
            </div>
          </section>

          {/* Guide Bottom Navigation (Prev / Next Article) */}
          <div className="pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <button
                onClick={() => {
                  onSelectArticle(prev.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 bg-white border border-stone-200 rounded-xl text-left hover:border-stone-400 transition-colors group flex flex-col justify-between"
              >
                <span className="text-xs text-stone-400 font-medium flex items-center gap-1 mb-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Destination
                </span>
                <span className="font-editorial font-bold text-stone-900 group-hover:text-amber-900 text-sm sm:text-base">
                  {prev.destination}, {prev.country}
                </span>
              </button>
            ) : <div />}

            {next ? (
              <button
                onClick={() => {
                  onSelectArticle(next.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-4 bg-white border border-stone-200 rounded-xl text-right hover:border-stone-400 transition-colors group flex flex-col justify-between"
              >
                <span className="text-xs text-stone-400 font-medium flex items-center justify-end gap-1 mb-1">
                  Next Destination <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-editorial font-bold text-stone-900 group-hover:text-amber-900 text-sm sm:text-base">
                  {next.destination}, {next.country}
                </span>
              </button>
            ) : <div />}
          </div>
        </article>
      </div>
    </div>
  );
};
