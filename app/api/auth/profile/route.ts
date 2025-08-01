import { Profile } from '@/src/features/auth/types/auth';
import { getAccessToken } from '@/src/shared/utils/cookieService';
import { httpServer } from '@/src/shared/utils/httpServer';
import { NextResponse } from 'next/server';

export async function GET() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ message: '프로필 조회 실패' }, { status: 401 });
  }

  try {
    const response: Profile = await httpServer.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({ isAuthenticated: true, data: response });
  } catch (error) {
    console.error('프로필 조회 실패', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
