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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.imageUrl && (
        <div className="relative h-48 w-full">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">
            {article.sourceName}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {article.title}
        </h2>

        {article.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.description}
          </p>
        )}

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          Read More
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}