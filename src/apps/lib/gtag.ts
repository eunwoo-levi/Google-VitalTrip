export const GA_ID = process.env.GOOGLE_ANALYTICS_ID || '';

export const pageview = (url: string) => {
  if (!GA_ID || typeof window === 'undefined') return;

  window.gtag?.('config', GA_ID, {
    page_path: url,
  });
};
