import { Profile } from '@/src/features/profile/types/profile';
import { APIError } from '@/src/shared/utils/apiError';
import { getTempToken } from '@/src/shared/utils/cookieService';
import { httpServer } from '@/src/shared/utils/httpServer';
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

    const { accessToken, refreshToken } = response.data;

    const res = NextResponse.json({ message: 'Google signup success' }, { status: 201 });

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1시간
    });
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return res;
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === 400) {
        return NextResponse.json(
          { message: 'Please enter a valid user information' },
          { status: 400 },
        );
      } else if (error.status === 401) {
        return NextResponse.json({ message: 'Please login again' }, { status: 401 });
      } else if (error.status === 404) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    }
    return NextResponse.json({ message: 'Google signup failed' }, { status: 500 });
  }
}
