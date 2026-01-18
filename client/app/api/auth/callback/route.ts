import { APIError } from '@/src/shared/utils/apiError';
import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const success = searchParams.get('success');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const tempToken = searchParams.get('tempToken');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const profileImageUrl = searchParams.get('profileImageUrl');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth Error:', error);
      return NextResponse.redirect(new URL('/login?error=oauth_failed', req.url));
    }

    const res = NextResponse.json({
      email,
      name,
      profileImageUrl,
    });

    if (success === 'true' && accessToken && refreshToken) {
      res.cookies.set('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60,
      });

      res.cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return res;
    }

    if (tempToken) {
      res.cookies.set('tempToken', tempToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 30,
      });

      return res;
    }

    console.error('No Temp Token');
    return NextResponse.redirect(new URL('/login?error=callback_failed', req.url));
  } catch (error) {
    Sentry.captureException(error);
    if (error instanceof APIError) {
      console.error('OAuth Callback Error:', error.message, error.status);
    }
    return NextResponse.redirect(new URL('/login?error=callback_failed', req.url));
  }
}
