import { Profile } from '@/src/features/auth/types/auth';
import { getTempToken } from '@/src/shared/utils/cookieService';
import { httpServer } from '@/src/shared/utils/httpServer';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface SignupGoogleResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: Profile;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tempToken = await getTempToken();
    if (!tempToken) {
      return NextResponse.json({ message: 'tempToken is not found' }, { status: 401 });
    }

    const response: SignupGoogleResponse = await httpServer.post('/oauth2/complete-profile', body, {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });

    const { accessToken, refreshToken, user } = response.data;

    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1시간
    });
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
