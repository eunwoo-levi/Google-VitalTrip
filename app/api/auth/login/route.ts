import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 입력해야 합니다.' }, { status: 400 });
    }

    // 로그인 요청
    const response = await fetch('http://localhost:8080/members/login', {
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
  } catch (error: any) {
    console.error('로그인 요청 중 오류 발생:', error);

    if (error.response?.status === 400) {
      return NextResponse.json(
        {
          errorCode: error.response.data?.errorCode || 'BAD_REQUEST',
          errorMessage: error.response.data?.errorMessage || '로그인 정보가 일치하지 않습니다.',
        },
        { status: 400 },
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
