'use client';

import { oAuthCallback } from '@/src/features/auth/api/oAuthCallback';
import { toast } from '@/src/shared/lib/toast/toastStore';
import { APIError } from '@/src/shared/utils/apiError';
import { setToSessionStorage } from '@/src/shared/utils/sessionService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const isNativeSource = () => {
  const match = document.cookie.split(';').find((c) => c.trim().startsWith('auth_source='));
  return match?.split('=')?.[1]?.trim() === 'native';
};

const clearNativeSourceCookie = () => {
  document.cookie = 'auth_source=; Max-Age=0; Path=/';
};

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

        if (isNativeSource()) {
          clearNativeSourceCookie();
          window.location.href = `vitaltrip://auth-complete${window.location.search}`;
          return;
        }

        if (success) {
          const googleProfile = await oAuthCallback();
          setToSessionStorage('google-profile', JSON.stringify(googleProfile));
          window.history.replaceState({}, document.title, window.location.pathname);
          toast.success('Logged in with Google successfully.');
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
