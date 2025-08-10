import { getValidAccessToken } from '@/src/shared/utils/cookieService';
import { NextResponse } from 'next/server';

export async function GET() {
  const accessToken = await getValidAccessToken();
  if (!accessToken) {
    return NextResponse.json({ isLoggedIn: false });
  }

  return NextResponse.json({ isLoggedIn: true });
}
