import { LoginForm } from '@/src/features/auth';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login - VitalTrip',
  description:
    'Sign in to your VitalTrip account to access emergency services and travel assistance.',
};

export default function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white px-4 py-8'>
      <div className='w-full max-w-lg'>
        <Image
          src='/vitalTrip.svg'
          alt='VitalTrip Logo'
          width={300}
          height={300}
          className='mx-auto'
        />
        <h2 className='mb-8 text-center text-2xl font-bold text-gray-600'>
          Sign in to your VitalTrip account
        </h2>

        <div className='rounded-xl border border-gray-100 bg-white px-8 py-10 shadow-lg'>
          <LoginForm />

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
              <span>Don&apos;t have an account? </span>
              <Link
                href='/signup'
                className='font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline'
              >
                Create account
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500'>
            Need help? Contact our
            <Link
              href='/about'
              className='text-blue-600 transition-colors duration-200 hover:text-blue-800'
            >
              support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
