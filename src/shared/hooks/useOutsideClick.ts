'use client';

import { useEffect, RefObject } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: () => void,
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!event.target || !(event.target instanceof Node)) return;

      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, onClickOutside]);
}
