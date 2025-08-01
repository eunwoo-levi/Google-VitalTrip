import { SignupForm } from '@/src/features/auth';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sign Up - VitalTrip',
  description: 'Create your VitalTrip account to access emergency services and travel assistance.',
};

export default function SignupPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8'>
      <div className='w-full max-w-lg'>
        <Image
          src='/VitalTrip.svg'
          alt='VitalTrip Logo'
          width={120}
          height={48}
          className='mx-auto h-12 w-auto'
        />
        <h2 className='mb-8 text-center text-2xl font-bold text-gray-600'>
          Create your account to get started
        </h2>

        <div className='rounded-xl border border-gray-100 bg-white px-8 py-10 shadow-lg'>
          <Suspense fallback={<div className='flex justify-center py-4'>Loading...</div>}>
            <SignupForm />
          </Suspense>

          <div className='mt-6 text-center'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-200' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='bg-white px-4 text-gray-500'>or</span>
              </div>
            </div>

            <div className='mt-4 text-sm text-gray-600'>
              <span>Already have an account? </span>
              <Link
                href='/login'
                className='font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline'
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500'>
            By signing up, you agree to our{' '}
            <Link
              href='/about'
              className='text-blue-600 transition-colors duration-200 hover:text-blue-800'
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
