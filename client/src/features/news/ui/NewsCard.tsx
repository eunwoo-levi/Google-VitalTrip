import Image from 'next/image';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <div className='overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg'>
      {article.imageUrl && (
        <div className='relative h-48 w-full bg-gray-200'>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      )}
      <div className='p-6'>
        <div className='mb-2 flex items-center justify-between'>
          <span className='text-sm font-medium text-blue-600'>{article.sourceName}</span>
          <span className='text-xs text-gray-500'>{formatDate(article.publishedAt)}</span>
        </div>

        <h2 className='mb-3 line-clamp-2 text-lg font-bold text-gray-900'>{article.title}</h2>

        {article.description && (
          <p className='mb-4 line-clamp-3 text-sm text-gray-600'>{article.description}</p>
        )}

        <a
          href={article.url}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-800'
          aria-label={`Read full article: ${article.title}`}
        >
          Read More
          <svg className='ml-1 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
