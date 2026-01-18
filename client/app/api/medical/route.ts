import { Medical } from '@/src/features/medical/types/medical';
import { APIError } from '@/src/shared/utils/apiError';
import { httpServer } from '@/src/shared/utils/httpServer';
import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);

    if (!url.searchParams.get('latitude') || !url.searchParams.get('longitude')) {
      return NextResponse.json({ message: 'Latitude and longitude are required' }, { status: 400 });
    }

    const response = await httpServer.get<Medical[]>(`/location/nearby${url.search}`);
    return NextResponse.json(response);
  } catch (error) {
    Sentry.captureException(error);
    if (error instanceof APIError && error.status === 400) {
      return NextResponse.json({ message: 'Invalid request parameters' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to fetch medical facilities' }, { status: 500 });
  }
}
