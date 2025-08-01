import { Profile } from '@/src/features/auth/types/auth';
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
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해야 합니다.' }, { status: 400 });
    }

    const response: LoginResponse = await httpServer.post('/auth/login', { email, password });
    const { accessToken, refreshToken } = response.data;

    const res = NextResponse.json({ message: '로그인 성공' });

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
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
