'use client';

import { useIsWebView } from '@/src/shared/hooks/useIsWebView';
import { APIError } from '@/src/shared/utils/apiError';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { loginApple } from '../api/loginApple';

declare global {
  interface Window {
    handleAppleSignInResult?: (
      identityToken: string,
      fullName: { givenName?: string; familyName?: string } | null,
      email: string | null,
    ) => void;
    webkit?: {
      messageHandlers?: {
        appleSignIn?: {
          postMessage: (message: object) => void;
        };
      };
    };
  }
}

export const AppleAuthButton = () => {
  const isWebView = useIsWebView();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    window.handleAppleSignInResult = async (identityToken, fullName, email) => {
      try {
        await loginApple({
          identityToken,
          fullName: fullName ?? undefined,
          email: email ?? undefined,
        });
        queryClient.invalidateQueries({ queryKey: ['auth', 'isLoggedIn'] });
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        router.push('/');
      } catch (error) {
        if (error instanceof APIError) {
          console.error('Apple login error:', error.message, error.status);
        }
      }
    };

    return () => {
      window.handleAppleSignInResult = undefined;
    };
  }, [router, queryClient]);

  if (!isWebView) return null;

  const handleAppleAuthClick = () => {
    window.webkit?.messageHandlers?.appleSignIn?.postMessage({});
  };

  return (
    <button
      onClick={handleAppleAuthClick}
      className='flex w-full items-center justify-center gap-2 rounded-md bg-black p-3 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-gray-900'
    >
      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 814 1000' fill='white'>
        <path d='M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 268.5-317.3 65 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z' />
      </svg>
      Sign in with Apple
    </button>
  );
};
