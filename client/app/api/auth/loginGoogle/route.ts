import { APIError } from '@/src/shared/utils/apiError';
import { httpServer } from '@/src/shared/utils/httpServer';
import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

interface LoginGoogleResponse {
  message: string;
  data: {
    googleLoginUrl: string;
    message: string;
  };
}

export async function GET() {
  try {
    const response: LoginGoogleResponse = await httpServer.get('/oauth2/login-url');
    const googleLoginUrl = response.data.googleLoginUrl;

    return NextResponse.redirect(googleLoginUrl);
  } catch (error) {
    Sentry.captureException(error);
    if (error instanceof APIError) {
      console.error('Google login URL error:', error.message, error.status);
    }
    return NextResponse.json({ message: 'Failed to get Google login URL' }, { status: 500 });
  }
}
