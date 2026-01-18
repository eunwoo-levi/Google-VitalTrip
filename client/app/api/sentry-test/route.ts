import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    throw new Error('local sentry test');
  } catch (e) {
    Sentry.captureException(e);
    return Response.json({ ok: true });
  }
}
