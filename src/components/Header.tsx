import React, { useState } from 'react';
import { Compass, Search, Bookmark, Menu, X } from 'lucide-react';

interface HeaderProps {
  onGoHome: () => void;
  savedCount: number;
  onOpenBookmarks: () => void;
  onOpenDeployModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  isArticleView: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  savedCount,
  onOpenBookmarks,
  onOpenDeployModal,
  searchQuery,
  onSearchChange,
  selectedRegion,
  onSelectRegion,
  isArticleView,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const regions = ['All', 'Asia', 'Europe', 'North America', 'Middle East', 'Oceania'];

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Zone: Brand / Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-md"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center shrink-0 group-hover:bg-amber-900 transition-colors">
              <Compass className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-stone-900 block leading-tight">
                Destination Diaries
              </span>
            </div>
          </button>
        </div>

        {/* Center Zone: Region Navigation (Desktop) */}
        {!isArticleView && (
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/90 p-1 rounded-xl border border-stone-200 shadow-2xs">
            {regions.map((region) => {
              const isActive = selectedRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => onSelectRegion(region)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-stone-900 text-white font-bold shadow-xs ring-1 ring-stone-900'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/70 font-medium'
                  }`}
                  aria-pressed={isActive}
                >
                  {region}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Zone: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <div className="relative">
            {isSearchActive ? (
              <div className="flex items-center bg-white border border-stone-300 rounded-xl px-2.5 py-1.5 shadow-xs w-48 sm:w-64 transition-all animate-fade-in">
                <Search className="w-4 h-4 text-stone-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search destination, food, budget..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="w-full text-xs bg-transparent focus:outline-none text-stone-900 placeholder:text-stone-400"
                />
                <button
                  onClick={() => {
                    setIsSearchActive(false);
                    onSearchChange('');
                  }}
                  className="text-stone-400 hover:text-stone-600 p-0.5 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchActive(true)}
                className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors flex items-center gap-1.5 text-xs font-medium"
                title="Search 10 travel guides"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            )}
          </div>

          {/* Bookmarks Counter Button */}
          <button
            onClick={onOpenBookmarks}
            className="p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors relative flex items-center gap-1.5 text-xs font-medium"
            title="Saved Reading List"
          >
            <Bookmark className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="bg-amber-800 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {savedCount}
              </span>
            )}
          </button>


          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            aria-label="Toggle mobile navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3 animate-fade-in">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            Filter by Region
          </div>
          <div className="flex flex-wrap gap-1.5">
            {regions.map((region) => {
              const isActive = selectedRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => {
                    onSelectRegion(region);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white font-bold ring-1 ring-stone-900 shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 font-medium'
                  }`}
                  aria-pressed={isActive}
                >
                  {region}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenDeployModal();
                setIsMobileMenuOpen(false);
              }}
              className="text-xs font-medium text-stone-800 flex items-center gap-1.5"
            >
              <span>▲</span> Deploy to Vercel (Free)
            </button>
            <span className="text-xs text-stone-400">10 Complete Guides</span>
          </div>
        </div>
      )}
    </header>
  );
};
