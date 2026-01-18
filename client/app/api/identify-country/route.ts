import {
  IdentifyCountryRequest,
  IdentifyCountryResponse,
} from '@/src/features/medical/types/location';
import { httpServer } from '@/src/shared/utils/httpServer';
import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
): Promise<NextResponse<IdentifyCountryResponse | { error: string }>> {
  try {
    const body: IdentifyCountryRequest = await request.json();

    const result: IdentifyCountryResponse = await httpServer.post(
      '/location/identify-country',
      body,
    );
    return NextResponse.json(result);
  } catch (error) {
    Sentry.captureException(error);
    console.error('국가 식별 API 오류:', error);
    return NextResponse.json({ error: '국가 식별 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
