import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8080';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해야 합니다.' }, { status: 400 });
    }

    const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.errorMessage || '로그인을 실패했습니다.' },
        { status: response.status },
      );
    }

    const { accessToken, refreshToken } = await response.json();

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

    return NextResponse.json({ accessToken }, { status: response.status });
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
