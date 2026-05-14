import { useEffect, useState } from 'react';

export const useIsWebView = (): boolean => {
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsWebView(/VitalTrip/i.test(ua) || !!window.webkit?.messageHandlers);
  }, []);

  return isWebView;
};
