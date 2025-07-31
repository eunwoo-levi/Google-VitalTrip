import { cookies } from 'next/headers';
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

    console.log('accessToken@@@@@@@@@@@@@', accessToken);
    console.log('refreshToken@@@@@@@@@@@@@', refreshToken);
    if (success === 'true' && accessToken && refreshToken) {
      const cookieStore = await cookies();
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60,
      });

      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json({
        email,
        name,
        profileImageUrl,
      });
    }

    if (tempToken) {
      const cookieStore = await cookies();

      cookieStore.set('tempToken', tempToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 30,
      });

      return NextResponse.json({
        email,
        name,
        profileImageUrl,
      });
    }

    console.error('No Temp Token');
    return NextResponse.redirect(new URL('/login?error=callback_failed', req.url));
  } catch (error) {
    console.error('OAuth Callback Error:', error);
    return NextResponse.redirect(new URL('/login?error=callback_failed', req.url));
  }
}
