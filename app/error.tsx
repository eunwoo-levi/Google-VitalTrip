'use client';

import * as Sentry from '@sentry/nextjs';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  Sentry.captureException(error);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4'>
      <div className='text-center'>
        <h2 className='mb-4 text-2xl font-bold text-gray-800'>Something went wrong</h2>
        <p className='mb-6 text-gray-600'>We're sorry, but something unexpected happened.</p>
        <button
          onClick={() => reset()}
          className='rounded-full bg-red-600 px-6 py-2 font-bold text-white shadow transition hover:bg-red-700'
        >
          Try again
        </button>
      </div>
    </div>
  );
}
