import { Profile } from '@/src/features/profile/types/profile';
import { APIError } from '@/src/shared/utils/apiError';
import { getValidAccessToken } from '@/src/shared/utils/cookieService';
import { httpServer } from '@/src/shared/utils/httpServer';
import { NextResponse } from 'next/server';

export async function GET() {
  const accessToken = await getValidAccessToken();
  if (!accessToken) {
    return NextResponse.json({ message: 'Please login again' }, { status: 401 });
  }

  try {
    const response: Profile = await httpServer.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({ isAuthenticated: true, data: response });
  } catch (error) {
    if (error instanceof APIError && error.status === 401) {
      return NextResponse.json({ message: 'Please login again' }, { status: 401 });
    }
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
