import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
    if (!response.ok) {
      throw new Error('로그아웃 실패');
    }
    cookieStore.delete('refreshToken');
    cookieStore.delete('accessToken');
    return NextResponse.json({ message: '로그아웃 성공' }, { status: response.status });
  } catch (error) {
    console.error('로그아웃 실패', error);
    return NextResponse.json({ message: '로그아웃 실패' }, { status: 500 });
  }
}
