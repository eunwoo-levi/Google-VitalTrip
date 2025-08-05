import { APIError } from '@/src/shared/utils/apiError';
import { getValidAccessToken } from '@/src/shared/utils/cookieService';
import { httpServer } from '@/src/shared/utils/httpServer';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const accessToken = await getValidAccessToken();

  if (!accessToken) {
    return NextResponse.json({ message: '프로필 수정 실패' }, { status: 401 });
  }

  try {
    const body = await req.json();
    await httpServer.put('/api/auth/profile', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({ message: '프로필 수정 성공' }, { status: 200 });
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === 400) {
        return NextResponse.json(
          { message: 'Please enter a valid email address' },
          { status: 400 },
        );
      } else if (error.status === 401) {
        return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
      }
    }
    return NextResponse.json({ message: 'Failed to edit profile' }, { status: 500 });
  }
}
