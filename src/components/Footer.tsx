import React from 'react';
import { Compass, ArrowUp, ArrowUpRight } from 'lucide-react';
import { ALL_ARTICLES } from '../data/articles.ts';

interface FooterProps {
  onSelectArticle: (slug: string) => void;
  onOpenDeployModal: () => void;
  onOpenBookmarks: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectArticle,
  onOpenDeployModal,
  onOpenBookmarks,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-800/90 text-white flex items-center justify-center">
                <Compass className="w-4 h-4 text-amber-200" />
              </div>
              <span className="font-editorial text-xl font-bold text-white tracking-tight">
                Wanderlust Chronicles
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An independent travel journalism compendium exploring 10 extraordinary world destinations. Every guide features comprehensive itineraries, deep cultural insights, local culinary maps, and honest budget assessments.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs">
              <button
                onClick={onOpenDeployModal}
                className="text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold"
              >
                <span>Deploy Free to Vercel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenBookmarks}
                className="text-stone-400 hover:text-stone-200"
              >
                Saved Reading List
              </button>
            </div>
          </div>

          {/* 10 Destinations Directory Col */}
          <div className="md:col-span-8 space-y-4">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              The 10 World Guides
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
              {ALL_ARTICLES.map((article, idx) => (
                <a
                  key={article.id}
                  href={article.url}
                  className="text-left text-stone-300 hover:text-amber-200 transition-colors flex items-center justify-between group py-1"
                >
                  <span className="truncate pr-2">
                    <span className="text-stone-500 font-mono mr-1.5">{idx + 1}.</span>
                    {article.destination}, {article.country}
                  </span>
                  <span className="text-stone-600 group-hover:text-amber-400 transition-colors">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Wanderlust Chronicles. Curated for curious, respectful global travelers.
          </div>

          <div className="flex items-center gap-6">
            <span>Optimized for ultra-fast Vercel static hosting</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-400 hover:text-stone-200 transition-colors font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
