import { httpServer } from '@/src/shared/utils/httpServer';
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
    console.error('Error logging in with Google in Server Side:', error);
    return NextResponse.json(
      { error: 'Failed to login with Google in Server Side' },
      { status: 500 },
    );
  }
}
