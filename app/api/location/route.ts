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
  } catch (e: any) {
    return NextResponse.json({ error: '서버 에러 발생', detail: e.message }, { status: 500 });
  }
}
