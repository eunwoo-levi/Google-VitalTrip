import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: process.env.NODE_ENV === 'production',
  sendDefaultPii: true,
  tracesSampleRate: 1, // 0에서 1 사이의 숫자로 주어진 트랜잭션이 Sentry로 전송 될 확률을 제어
  debug: false,
  replaysOnErrorSampleRate: 1.0, //오류가 발생한 세션 중 어느 정도의 비율로 리플레이 데이터를 수집할지 결정
  replaysSessionSampleRate: 0.1, //Sentry SDK에서 세션 리플레이 기능의 샘플링 비율을 제어

  integrations: [
    Sentry.replayIntegration({
      // replay 를 이용할 수 있습니다. (사용자 추적)
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
