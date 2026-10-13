import React from 'react';
import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { Article } from '../types/blog.ts';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (slug: string) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="bg-[#faf9f6] w-full max-w-md h-full shadow-2xl flex flex-col border-l border-stone-200 animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-amber-700" />
            <h3 className="font-editorial text-lg font-bold text-stone-900">
              Saved Travel Guides ({savedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedArticles.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center px-4 text-stone-500 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-400">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="font-medium text-stone-800 text-sm">No saved articles yet</p>
              <p className="text-xs text-stone-500 max-w-xs">
                Click the bookmark icon on any travel guide to save it to your personal reading list for quick offline reference.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-stone-200 rounded-xl p-3 flex gap-3 group hover:border-stone-400 transition-all shadow-xs"
                >
                  <img
                    src={article.featuredImage.url}
                    alt={article.destination}
                    className="w-20 h-20 object-cover rounded-lg shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
                        {article.country}
                      </div>
                      <a
                        href={article.url}
                        onClick={() => onClose()}
                        className="font-editorial text-sm font-bold text-stone-900 truncate group-hover:text-amber-800 transition-colors block"
                      >
                        {article.destination}
                      </a>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                        {article.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 text-xs">
                      <a
                        href={article.url}
                        onClick={() => onClose()}
                        className="text-amber-800 font-semibold hover:underline flex items-center gap-1"
                      >
                        Read guide <ArrowRight className="w-3 h-3" />
                      </a>
                      <button
                        onClick={() => onRemoveBookmark(article.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-white flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-stone-500 hover:text-rose-600 transition-colors font-medium"
            >
              Clear all saved
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
            >
              Done reading
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
