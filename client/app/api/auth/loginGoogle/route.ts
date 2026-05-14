import { APIError } from '@/src/shared/utils/apiError';
import { httpServer } from '@/src/shared/utils/httpServer';
import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

interface LoginGoogleResponse {
  message: string;
  data: {
    googleLoginUrl: string;
    message: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const response: LoginGoogleResponse = await httpServer.get('/oauth2/login-url');
    const googleLoginUrl = response.data.googleLoginUrl;

    const redirectResponse = NextResponse.redirect(googleLoginUrl);

    if (new URL(request.url).searchParams.get('source') === 'native') {
      redirectResponse.cookies.set('auth_source', 'native', {
        maxAge: 300,
        path: '/',
        sameSite: 'lax',
        secure: true,
      });
    }

    return redirectResponse;
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to get Google login URL' },
      { status: error instanceof APIError ? error.status : 500 },
    );
  }
}
