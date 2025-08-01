import { Profile } from '@/src/features/auth/types/auth';
import { httpServer } from '@/src/shared/utils/httpServer';
import { cookies } from 'next/headers';
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
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해야 합니다.' }, { status: 400 });
    }

    const response: LoginResponse = await httpServer.post('/auth/login', { email, password });
    const { accessToken, refreshToken } = response.data;

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

    return NextResponse.json({ message: '로그인 성공' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
