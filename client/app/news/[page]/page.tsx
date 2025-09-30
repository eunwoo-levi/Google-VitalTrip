import { fetchMedicalNewsSSR } from '@/src/features/news/api/newsApi';
import { NewsFooter, NewsHeader } from '@/src/features/news/ui';
import { NewsPageClient } from '@/src/features/news/ui/NewsPageClient';
import Navbar from '@/src/widgets/navbar/Navbar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Medical News - Vital Trip',
  description:
    'Stay updated with the latest medical news, health research, and healthcare developments from around the world.',
};

export const revalidate = 3600;

interface NewsPageProps {
  params: Promise<{
    page: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { page: '1' },
    { page: '2' },
    { page: '3' },
    { page: '4' },
    { page: '5' },
    { page: '6' },
    { page: '7' },
  ];
}

export default async function NewsPage({ params }: NewsPageProps) {
  const resolvedParams = await params;
  const pageNum = parseInt(resolvedParams.page);
  const pageSize = 10;

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  let initialData;
  let error = null;

  try {
    initialData = await fetchMedicalNewsSSR({ page: pageNum, pageSize });

    if (initialData.articles.length === 0 && pageNum > 1) {
      notFound();
    }
  } catch (err) {
    console.error('Failed to fetch medical news:', err);
    error = err instanceof Error ? err.message : 'Failed to fetch medical news';

    initialData = {
      articles: [],
      totalResults: 0,
      page: pageNum,
      pageSize,
    };
  }

  return (
    <div className='min-h-screen bg-gray-50 md:pt-16'>
      <Navbar />
      <div className='mx-auto max-w-7xl px-4 py-8'>
        <NewsHeader />

        {error && pageNum === 1 ? (
          <div className='py-12 text-center'>
            <div className='mb-4 text-lg text-red-500'>Failed to load medical news</div>
            <p className='text-gray-400'>{error}</p>
          </div>
        ) : (
          <NewsPageClient initialData={initialData} />
        )}

        <NewsFooter />
      </div>
    </div>
  );
}
