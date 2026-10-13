import React from 'react';
import { Bookmark, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types/blog.ts';

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectArticle?: (slug: string) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  featured = false,
}) => {
  return (
    <a
      href={article.url}
      className={`group block bg-white border border-stone-200/90 rounded-2xl overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-300 flex flex-col no-underline text-inherit ${
        featured ? 'md:grid md:grid-cols-12 md:gap-6' : ''
      }`}
    >
      {/* Media Image */}
      <div
        className={`relative overflow-hidden bg-stone-100 ${
          featured ? 'md:col-span-7 h-72 md:h-full min-h-[320px]' : 'h-64 sm:h-72'
        }`}
      >
        <img
          src={article.featuredImage.url}
          alt={article.featuredImage.alt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Floating Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleBookmark(article.id, e);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors ${
            isBookmarked
              ? 'bg-amber-800 text-white'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-stone-900'
          }`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this guide'}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        {/* Image Caption overlay in corner */}
        <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 drop-shadow-sm font-medium line-clamp-1 hidden sm:block">
          {article.destination}, {article.country}
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`p-6 sm:p-7 flex flex-col justify-between flex-1 ${
          featured ? 'md:col-span-5 md:py-8 md:pl-2 md:pr-8' : ''
        }`}
      >
        <div>
          {/* Metadata line without pills (zero-pill discipline) */}
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-3 tracking-wide">
            <span className="text-amber-800 font-semibold uppercase tracking-wider">
              {article.country}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{article.region}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {article.readTimeMinutes} min read
            </span>
          </div>

          {/* Heading */}
          <h2
            className={`font-editorial font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-tight ${
              featured ? 'text-2xl sm:text-3xl mb-3' : 'text-xl sm:text-2xl mb-2.5'
            }`}
          >
            {article.title}
          </h2>

          {/* Subtitle / Excerpt */}
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 mb-5 font-normal">
            {article.subtitle}
          </p>
        </div>

        {/* Card Footer: Quick Highlights and CTA */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div className="text-xs text-stone-500">
            <span className="font-semibold text-stone-800">Best Season:</span>{' '}
            {article.quickFacts.bestMonths.split('(')[0]}
          </div>

          <span className="text-xs font-semibold text-amber-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read Guide <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
};
