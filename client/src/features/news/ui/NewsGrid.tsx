'use client';

import { NewsArticle } from '../types';
import { LoadingSkeleton } from './LoadingSkeleton';
import { NewsCard } from './NewsCard';

interface NewsGridProps {
  articles: NewsArticle[];
  isLoading: boolean;
  pageSize: number;
}

export function NewsGrid({ articles, isLoading, pageSize }: NewsGridProps) {
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: pageSize }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className='py-12 text-center'>
        <div className='mb-4 text-lg text-gray-500'>No medical news available at the moment.</div>
        <p className='text-gray-400'>Please check back later for updates.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} priority={index < 3} />
      ))}
    </div>
  );
}
