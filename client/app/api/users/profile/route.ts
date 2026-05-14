import { APIError } from '@/src/shared/utils/apiError';
import { httpServer } from '@/src/shared/utils/httpServer';
import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    await httpServer.patch('/users/profile', body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return NextResponse.json({ message: 'Profile updated' }, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Profile update failed' },
      { status: error instanceof APIError ? error.status : 500 },
    );
  }
}
