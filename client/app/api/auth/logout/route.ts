import { APIError } from '@/src/shared/utils/apiError';
import { getValidAccessToken } from '@/src/shared/utils/cookieService';
import { httpServer } from '@/src/shared/utils/httpServer';
import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

export async function POST() {
  const accessToken = await getValidAccessToken();

  if (!accessToken) {
    return NextResponse.json({ message: '로그아웃 실패' }, { status: 401 });
  }

  try {
    await httpServer.post('/auth/logout', undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const res = NextResponse.json({ message: '로그아웃 성공' }, { status: 200 });

    res.cookies.set('accessToken', '', {
      path: '/',
      maxAge: 0,
    });
    res.cookies.set('refreshToken', '', {
      path: '/',
      maxAge: 0,
    });

    return res;
  } catch (error) {
    Sentry.captureException(error);
    if (error instanceof APIError) {
      console.error('Logout error:', error.message, error.status);
      if (error.status === 401) {
        return NextResponse.json({ message: 'Please login again' }, { status: 401 });
      }
    }
    return NextResponse.json({ message: 'Logout failed. Please try again.' }, { status: 500 });
  }
}
