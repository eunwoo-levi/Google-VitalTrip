import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  if (!accessToken) {
    return NextResponse.json({ message: '프로필 조회 실패' }, { status: 401 });
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ isAuthenticated: false, data });
    }
    return NextResponse.json({ isAuthenticated: true, data });
  } catch (error) {
    console.error('프로필 조회 실패', error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
