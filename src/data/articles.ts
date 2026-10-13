import { Article } from '../types/blog.ts';
import { baliArticle } from './articles/bali.ts';
import { parisArticle } from './articles/paris.ts';
import { santoriniArticle } from './articles/santorini.ts';
import { switzerlandArticle } from './articles/switzerland.ts';
import { maldivesArticle } from './articles/maldives.ts';
import { kyotoArticle } from './articles/kyoto.ts';
import { nycArticle } from './articles/nyc.ts';
import { dubaiArticle } from './articles/dubai.ts';
import { queenstownArticle } from './articles/queenstown.ts';
import { amalfiArticle } from './articles/amalfi.ts';

export const ALL_ARTICLES: Article[] = [
  baliArticle,
  parisArticle,
  santoriniArticle,
  switzerlandArticle,
  maldivesArticle,
  kyotoArticle,
  nycArticle,
  dubaiArticle,
  queenstownArticle,
  amalfiArticle,
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return ALL_ARTICLES.find((article) => article.slug === slug);
};

export const getArticleById = (id: string): Article | undefined => {
  return ALL_ARTICLES.find((article) => article.id === id);
};

export const getAdjacentArticles = (currentSlug: string) => {
  const index = ALL_ARTICLES.findIndex((article) => article.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? ALL_ARTICLES[index - 1] : null;
  const next = index < ALL_ARTICLES.length - 1 ? ALL_ARTICLES[index + 1] : null;
  return { prev, next };
};
