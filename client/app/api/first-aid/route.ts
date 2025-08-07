import { FirstAid } from '@/src/features/firstAid/type/firstAid';
import { getValidAccessToken } from '@/src/shared/utils/cookieService';
import { httpServer } from '@/src/shared/utils/httpServer';
import { NextRequest, NextResponse } from 'next/server';

interface FirstAidResponse {
  message: string;
  data: FirstAid;
  errorCode: string;
}

export async function POST(req: NextRequest) {
  const accessToken = await getValidAccessToken();

  if (!accessToken) {
    return NextResponse.json({ message: '로그인 후 이용해주세요.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const response: FirstAidResponse = await httpServer.post('/first-aid/advice', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch {
    return NextResponse.json({ message: 'first-aid POST 요청에 실패했습니다.' }, { status: 500 });
  }
}
