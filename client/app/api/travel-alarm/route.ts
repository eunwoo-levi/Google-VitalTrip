import { TravelAlertApiResponse } from '@/src/features/travelAlert/types/travelAlert';
import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const countryCode = searchParams.get('countryCode');

    if (!countryCode) {
      return NextResponse.json({ message: 'countryCode is required' }, { status: 400 });
    }

    const serviceKey = process.env.TRAVEL_ALARM_API_KEY;
    const url = `https://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=${serviceKey}&returnType=JSON&numOfRows=10&pageNo=1&cond%5Bcountry_iso_alp2%3A%3AEQ%5D=${countryCode.toUpperCase()}`;

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to fetch travel alarm' }, { status: 500 });
    }

    const data: TravelAlertApiResponse = await response.json();
    const items = data.response.body.items?.item ?? [];

    return NextResponse.json({ items });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
