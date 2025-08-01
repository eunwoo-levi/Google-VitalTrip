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
    console.error('로그인 요청 실패');

    if (error instanceof Error) {
      return NextResponse.json(
        {
          errorCode: 'AUTHENTICATION_FAILED',
          errorMessage: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
        },
        { status: 401 },
      );
    }

    return NextResponse.json(
      {
        errorCode: 'INTERNAL_SERVER_ERROR',
        errorMessage: '서버 내부 오류가 발생했습니다. 다시 시도해주세요.',
      },
      { status: 500 },
    );
  }
}
