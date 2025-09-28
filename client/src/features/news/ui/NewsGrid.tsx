'use client';

import { NewsArticle } from '../types';
import { NewsCard } from './NewsCard';
import { LoadingSkeleton } from './LoadingSkeleton';

interface NewsGridProps {
  articles: NewsArticle[];
  isLoading: boolean;
  pageSize: number;
}

export function NewsGrid({ articles, isLoading, pageSize }: NewsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: pageSize }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          No medical news available at the moment.
        </div>
        <p className="text-gray-400">
          Please check back later for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} />
      ))}
    </div>
  );
}