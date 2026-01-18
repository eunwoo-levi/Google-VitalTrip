import { Profile } from '@/src/features/profile/types/profile';
import { APIError } from '@/src/shared/utils/apiError';
import { getValidAccessToken } from '@/src/shared/utils/cookieService';
import { httpServer } from '@/src/shared/utils/httpServer';
import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

interface ProfileResponse {
  message: string;
  data: Profile;
}

export async function GET() {
  const accessToken = await getValidAccessToken();
  if (!accessToken) {
    return NextResponse.json({ message: 'Please login again' }, { status: 401 });
  }

  try {
    const response: ProfileResponse = await httpServer.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    Sentry.captureException(error);
    if (error instanceof APIError && error.status === 401) {
      return NextResponse.json({ message: 'Please login again' }, { status: 401 });
    }
    return NextResponse.json({ message: 'Please login again' }, { status: 500 });
  }
}
