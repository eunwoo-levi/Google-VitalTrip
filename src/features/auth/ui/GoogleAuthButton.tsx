'use client';

import Image from 'next/image';
import { loginGoogle } from '../api/loginGoogle';

export const GoogleAuthButton = () => {
  const handleGoogleAuthClick = async () => {
    await loginGoogle();
  };

  return (
    <button
      onClick={handleGoogleAuthClick}
      className='flex w-full items-center justify-center gap-2 rounded-md bg-white p-3 font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition-colors duration-300 hover:bg-gray-100'
    >
      <Image src='/google-auth.webp' alt='Google Auth' width={20} height={20} />
      Google Auth
    </button>
  );
};
