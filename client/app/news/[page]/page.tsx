import { fetchMedicalNewsSSR } from '@/src/features/news/api/newsApi';
import { NewsFooter, NewsHeader, RevalidateButton } from '@/src/features/news/ui';
import { NewsPageClient } from '@/src/features/news/ui/NewsPageClient';
import Navbar from '@/src/widgets/navbar/Navbar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const pageNum = parseInt(resolvedParams.page);

  return {
    title: `Medical News - Page ${pageNum} | Vital Trip`,
    description: `Stay updated with the latest medical news, health research, and healthcare developments from around the world. Page ${pageNum} of medical news articles.`,
    alternates: {
      canonical: `/news/${pageNum}`,
    },
    openGraph: {
      title: `Medical News - Page ${pageNum} | Vital Trip`,
      description: `Stay updated with the latest medical news, health research, and healthcare developments from around the world. Page ${pageNum} of medical news articles.`,
      url: `/news/${pageNum}`,
      type: 'website',
    },
  };
}

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
  const { page: pageParam } = await params;
  const pageNum = parseInt(pageParam);

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  const initialData = await fetchMedicalNewsSSR({ page: pageNum, pageSize: 10 });

  if (initialData.articles.length === 0 && pageNum > 1) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-white pt-16'>
      <Navbar />
      <div className='relative mx-auto max-w-7xl px-4 py-8'>
        <div className='absolute top-8 right-4 hidden md:block'>
          <RevalidateButton />
        </div>

        <NewsHeader />

        <div className='mb-6 flex justify-center md:hidden'>
          <RevalidateButton />
        </div>

        <NewsPageClient initialData={initialData} />
        <NewsFooter />
      </div>
    </div>
  );
}
