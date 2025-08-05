'use client';

import { oAuthCallback } from '@/src/features/auth/api/oAuthCallback';
import { APIError } from '@/src/shared/utils/apiError';
import { setToSessionStorage } from '@/src/shared/utils/sessionService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        const needsProfile = urlParams.get('needsProfile');
        const error = urlParams.get('error');
        const errorCode = urlParams.get('errorCode');
        const message = urlParams.get('message');

        if (error) {
          console.error('OAuth Error:', { errorCode, message });
          window.history.replaceState({}, document.title, window.location.pathname);
          router.push(
            `/login?error=${errorCode || 'oauth_failed'}&message=${message || 'OAuth 인증에 실패했습니다.'}`,
          );
          return;
        }

        if (success) {
          const googleProfile = await oAuthCallback();
          setToSessionStorage('google-profile', JSON.stringify(googleProfile));
          window.history.replaceState({}, document.title, window.location.pathname);
          router.push('/');
          return;
        }

        if (needsProfile) {
          const googleProfile = await oAuthCallback();
          setToSessionStorage('google-profile', JSON.stringify(googleProfile));
          window.history.replaceState({}, document.title, window.location.pathname);
          router.push('/signup?step=step2');
          return;
        }

        const googleProfile = await oAuthCallback();
        setToSessionStorage('google-profile', JSON.stringify(googleProfile));
        window.history.replaceState({}, document.title, window.location.pathname);
        router.push('/signup?step=step2');
      } catch (error) {
        if (error instanceof APIError) {
          console.error('OAuth Callback Error:', error.message || 'OAuth Callback Error');
        } else {
          console.error('OAuth Callback Error:', error);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
        router.push('/login?error=callback_failed');
      }
    };

    handleCallback();
  }, [router]);

  return <div>redirecting...</div>;
}
