import * as Sentry from '@sentry/nextjs';

export const onRequestError = (error: Error) => {
  Sentry.captureException(error);
  // optional: 추가 로직
};

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
