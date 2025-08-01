import { deleteTokens, getAccessToken } from '@/src/shared/utils/cookieService';
import { httpServer } from '@/src/shared/utils/httpServer';
import { NextResponse } from 'next/server';

export async function POST() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ message: '로그아웃 실패' }, { status: 401 });
  }

  try {
    await httpServer.post('/auth/logout', undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    await deleteTokens();
    return NextResponse.json({ message: '로그아웃 성공' }, { status: 200 });
  } catch (error) {
    console.error('로그아웃 실패', error);
    return NextResponse.json({ message: '로그아웃 실패' }, { status: 500 });
  }
}
