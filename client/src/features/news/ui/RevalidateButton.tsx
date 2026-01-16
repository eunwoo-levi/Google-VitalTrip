'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdRefresh } from 'react-icons/md';
import { revalidateNews } from '../actions/revalidateNews';

export const RevalidateButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleRevalidate = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await revalidateNews();
      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message,
      });
      if (result.success) {
        router.refresh();
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to revalidate',
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className='flex flex-col items-center gap-2'>
      <button
        onClick={handleRevalidate}
        disabled={isLoading}
        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white transition-all ${
          isLoading
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
        }`}
      >
        <MdRefresh className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Refreshing...' : 'Refresh News'}
      </button>
      {message && (
        <p
          className={`text-sm font-medium ${
            message.type === 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};
