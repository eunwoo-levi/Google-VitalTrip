'use client';

import { NewsQueryParams, NewsResponse } from '@/src/features/news/types';
import { NewsHeader } from '@/src/features/news/ui';
import { NewsGrid } from '@/src/features/news/ui/NewsGrid';
import { Pagination } from '@/src/features/news/ui/Pagination';
import { httpClient } from '@/src/shared/utils/httpClient';
import Navbar from '@/src/widgets/navbar/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

function NewsCSRContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const page = searchParams.get('page');
    if (page) {
      const pageNum = parseInt(page);
      if (!isNaN(pageNum) && pageNum > 0) {
        setCurrentPage(pageNum);
      } else {
        router.replace('/news-csr?page=1');
      }
    } else {
      router.replace('/news-csr?page=1');
    }
  }, [searchParams, router, isClient]);

  // 뉴스 데이터 페칭
  useEffect(() => {
    if (!isClient || currentPage === 0) return;

    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchMedicalNewsCSR({ page: currentPage, pageSize: 10 });
        setNewsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [isClient, currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (page: number) => {
      router.push(`/news-csr?page=${page}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router],
  );

  // 클라이언트가 준비되지 않았으면 로딩 상태 표시
  if (!isClient) {
    return (
      <div className='min-h-screen bg-gray-50 md:pt-16'>
        <Navbar />
        <div className='mx-auto max-w-7xl px-4 py-8'>
          <NewsHeader />
          <div className='flex items-center justify-center py-12'>
            <div className='text-lg text-gray-500'>Loading...</div>
          </div>
          <NewsFooterCSR />
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 md:pt-16'>
        <Navbar />
        <div className='mx-auto max-w-7xl px-4 py-8'>
          <NewsHeader />
          <div className='py-12 text-center'>
            <div className='mb-4 text-lg text-red-500'>Failed to load medical news</div>
            <p className='text-gray-400'>{error}</p>
          </div>
          <NewsFooterCSR />
        </div>
      </div>
    );
  }

  const totalPages = newsData ? Math.ceil(newsData.totalResults / newsData.pageSize) : 0;

  return (
    <div className='min-h-screen bg-gray-50 md:pt-16'>
      <Navbar />
      <div className='mx-auto max-w-7xl px-4 py-8'>
        <NewsHeader />

        <NewsGrid articles={newsData?.articles || []} isLoading={isLoading} pageSize={10} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <NewsFooterCSR />
      </div>
    </div>
  );
}

export default function NewsCSRPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-gray-50 md:pt-16'>
          <div className='mx-auto max-w-7xl px-4 py-8'>
            <div className='flex items-center justify-center py-12'>
              <div className='text-lg text-gray-500'>Loading...</div>
            </div>
          </div>
        </div>
      }
    >
      <NewsCSRContent />
    </Suspense>
  );
}

function NewsFooterCSR() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleString('en-US'));
  }, []);

  return (
    <div className='mt-12 text-center'>
      <p className='text-sm text-gray-500'>
        Medical news by Vital Trip
        {isClient && <span className='ml-1'>Last updated: {currentTime}</span>}
      </p>
    </div>
  );
}

async function fetchMedicalNewsCSR({
  page = 1,
  pageSize = 10,
  country = 'us',
}: NewsQueryParams = {}): Promise<NewsResponse> {
  try {
    const response = await httpClient.get<{
      message: string;
      data: {
        articles: NewsResponse['articles'];
        totalResults: number;
        page: number;
        pageSize: number;
      };
    }>(
      `https://api.aivitaltrip.com/api/news/headlines?page=${page}&pageSize=${pageSize}&country=${country}`,
    );

    console.log('asdfasdf', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch medical news:', error);
    return {
      articles: [],
      totalResults: 0,
      page,
      pageSize,
    };
  }
}
