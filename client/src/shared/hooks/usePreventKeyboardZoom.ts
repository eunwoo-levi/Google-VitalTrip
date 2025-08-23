import { useEffect } from 'react';

export const usePreventKeyboardZoom = () => {
  useEffect(() => {
    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')
      ) {
        e.preventDefault();
      }
    };

    // 마우스 휠 확대/축소 방지
    document.addEventListener('wheel', preventZoom, { passive: false });
    // 키보드 확대/축소 방지 (Ctrl + +, Ctrl + -, Ctrl + 0)
    document.addEventListener('keydown', preventKeyboardZoom);

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
    };
  }, []);
};
