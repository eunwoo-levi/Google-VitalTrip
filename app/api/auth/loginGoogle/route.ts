import { NextResponse } from 'next/server';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/api/oauth2/login-url`);
    if (!response.ok) {
      throw new Error('Failed to get login URL');
    }

    const data = await response.json();
    const googleLoginUrl = data.data.googleLoginUrl;

    return NextResponse.redirect(googleLoginUrl);
  } catch (error) {
    console.error('Error logging in with Google in Server Side:', error);
    return NextResponse.json(
      { error: 'Failed to login with Google in Server Side' },
      { status: 500 },
    );
  }
}
