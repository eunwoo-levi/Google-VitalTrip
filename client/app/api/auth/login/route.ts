import { Profile } from '@/src/features/profile/types/profile';
import { APIError } from '@/src/shared/utils/apiError';
import { httpServer } from '@/src/shared/utils/httpServer';
import { NextRequest, NextResponse } from 'next/server';

interface LoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: Profile;
  };
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Please enter your email and password' }, { status: 400 });
    }

    const response: LoginResponse = await httpServer.post('/auth/login', { email, password });
    const { accessToken, refreshToken } = response.data;

    const res = NextResponse.json({ message: 'Login successful' }, { status: 200 });

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60,
    });
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { message: 'The email or password is incorrect' },
          { status: 401 },
        );
      } else if (error.status === 404) {
        return NextResponse.json(
          { message: 'Please enter a valid email address' },
          { status: 404 },
        );
      } else if (error.status === 400) {
        return NextResponse.json({ message: 'You are already logged in Google' }, { status: 400 });
      }
    }
    return NextResponse.json({ message: 'Login failed. Please try again.' }, { status: 500 });
  }
}
