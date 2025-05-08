import { RegisterForm } from '@/src/features/auth';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className='my-40 flex items-center justify-center'>
      <div className='w-full max-w-md rounded-lg bg-blue-50 px-8 py-10 shadow-lg'>
        <h1 className='mb-6 text-center text-2xl font-bold text-gray-700'>Register</h1>
        <RegisterForm />
        <div className='text-md mt-4 flex justify-center text-gray-600'>
          <p className='mr-2'>Already have an account?</p>
          <Link href='/login' className='font-semibold text-blue-500 hover:underline'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
