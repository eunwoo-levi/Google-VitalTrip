'use client';

import { oAuthCallback } from '@/src/features/auth/api/oAuthCallback';
import { setToSessionStorage } from '@/src/shared/utils/sessionService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthCallbackPage() {
  const router = useRouter();
  useEffect(() => {
    const getTempToken = async () => {
      try {
        const googleProfile = await oAuthCallback();
        setToSessionStorage('google-profile', JSON.stringify(googleProfile));
        window.history.replaceState({}, document.title, window.location.pathname);
        router.push('/signup?step=step2');
      } catch {
        console.error('OAuth Callback Error');
        window.history.replaceState({}, document.title, window.location.pathname);
        router.push('/login?error=callback_failed');
      }
    };
    getTempToken();
  }, []);

  return <div>redirecting...</div>;
}
