import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://ipwho.is');

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch location data from ipwho' },
        { status: res.status },
      );
    }

    const data = await res.json();
    if (!data?.country_code) {
      return NextResponse.json({ error: 'Country code not found in response' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
    return NextResponse.json(
      { error: '위치 정보를 가져오는데 실패했습니다.', detail: errorMessage },
      { status: 500 },
    );
  }
}
