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
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
