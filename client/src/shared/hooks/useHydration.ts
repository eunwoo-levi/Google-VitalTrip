'use client';

import { useSyncExternalStore } from 'react';

const hydrationStore = {
  subscribe: (callback: () => void) => {
    if (typeof window !== 'undefined') {
      callback();
    }
    return () => {};
  },
  getSnapshot: () => {
    return typeof window !== 'undefined';
  },
  getServerSnapshot: () => {
    return false;
  },
};

export function useHydration() {
  return useSyncExternalStore(
    hydrationStore.subscribe,
    hydrationStore.getSnapshot,
    hydrationStore.getServerSnapshot,
  );
}
