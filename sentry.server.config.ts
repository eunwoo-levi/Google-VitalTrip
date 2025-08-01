import * as Sentry from '@sentry/nextjs';

console.log('process.env.SENTRY_DSN', process.env.SENTRY_DSN);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
});
