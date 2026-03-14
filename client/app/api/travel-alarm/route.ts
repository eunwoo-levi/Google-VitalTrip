import { fetchTravelAlertByCountry } from '@/src/features/travelAlert/services/travelAlertService';
import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const countryCode = searchParams.get('countryCode');

    if (!countryCode) {
      return NextResponse.json({ message: 'countryCode is required' }, { status: 400 });
    }

    const items = await fetchTravelAlertByCountry(countryCode);

    if (!items) {
      return NextResponse.json({ message: 'Failed to fetch travel alarm' }, { status: 500 });
    }

    return NextResponse.json({ items });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
