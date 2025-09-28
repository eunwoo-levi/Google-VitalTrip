'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { NewsArticle } from '../types';
import { NewsGrid } from './NewsGrid';
import { Pagination } from './Pagination';

interface NewsPageClientProps {
  initialData: {
    articles: NewsArticle[];
    totalResults: number;
    page: number;
    pageSize: number;
  };
}

export function NewsPageClient({ initialData }: NewsPageClientProps) {
  const router = useRouter();

  const currentPage = initialData.page;

  const handlePageChange = useCallback(
    (page: number) => {
      const newUrl = `/news/${page}`;
      router.push(newUrl);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router],
  );

  const articles = initialData.articles;
  const totalResults = initialData.totalResults;
  const totalPages = Math.ceil(totalResults / initialData.pageSize);

  return (
    <>
      <NewsGrid articles={articles} isLoading={false} pageSize={initialData.pageSize} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
