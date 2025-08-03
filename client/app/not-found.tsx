import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found - VitalTrip',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8'>
      <div className='w-full max-w-lg text-center'>
        <Link href='/' className='w-full'>
          <Image
            src='/VitalTrip.svg'
            alt='VitalTrip Logo'
            width={300}
            height={300}
            className='mx-auto mb-8'
          />
        </Link>

        <div className='rounded-xl border border-gray-100 bg-white px-8 py-12 shadow-lg'>
          <div className='mb-6'>
            <h1 className='mb-4 text-6xl font-bold text-gray-300'>404</h1>
            <h2 className='mb-4 text-2xl font-bold text-gray-700'>Page Not Found</h2>
            <p className='mb-8 text-gray-600'>
              Sorry, the page you are looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className='space-y-4'>
            <Link
              href='/'
              className='inline-block w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
            >
              Go to Homepage
            </Link>

            <Link
              href='/about'
              className='inline-block w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none'
            >
              Learn More About VitalTrip
            </Link>
          </div>

          <div className='mt-8 border-t border-gray-200 pt-6'>
            <p className='text-sm text-gray-500'>If you need any help, please contact me.</p>
            <a
              href='mailto:eunwoo1341@gmail.com'
              className='text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline'
            >
              eunwoo1341@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
