import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해야 합니다.' }, { status: 400 });
    }

    // 로그인 요청
    const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8080';
    const response = await fetch(`${apiBaseUrl}/members/login`, {
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

    // refreshToken을 쿠키에 저장
    const cookieStore = await cookies();

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 30, // 30분 (accessToken 만료 시간)
    });

    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true, // 클라이언트에서 접근 불가
      secure: process.env.NODE_ENV === 'production', // 프로덕션에서는 HTTPS 사용
      sameSite: 'strict', // (CSRF)크로스사이트 요청 방지
      path: '/', // 쿠키를 모든 경로에서 사용 가능
      maxAge: 60 * 60 * 24 * 7, // 7일 동안 유지
    });

    return NextResponse.json({ accessToken }, { status: response.status });
  } catch (error) {
    // 보안상 상세한 에러 정보는 로그에만 남기고, 최소한의 정보만 기록
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
