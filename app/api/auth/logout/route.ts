import { getValidAccessToken } from '@/src/shared/utils/cookieService';
import { httpServer } from '@/src/shared/utils/httpServer';
import { NextResponse } from 'next/server';

export async function POST() {
  const accessToken = await getValidAccessToken();

  if (!accessToken) {
    return NextResponse.json({ message: '로그아웃 실패' }, { status: 401 });
  }

  try {
    await httpServer.post('/auth/logout', undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const res = NextResponse.json({ message: '로그아웃 성공' }, { status: 200 });

    res.cookies.set('accessToken', '', {
      path: '/',
      maxAge: 0,
    });
    res.cookies.set('refreshToken', '', {
      path: '/',
      maxAge: 0,
    });

    return res;
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
