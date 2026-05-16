import { httpServer } from '@/src/shared/utils/httpServer';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.toString();
    const url = query ? `/encyclopedia?${query}` : '/encyclopedia';
    const data = await httpServer.get(url);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : '응급 사전 조회에 실패했습니다.' },
      { status: 500 },
    );
  }
}
