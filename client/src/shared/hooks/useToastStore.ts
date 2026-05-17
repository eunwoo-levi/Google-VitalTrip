'use client';

import { useSyncExternalStore } from 'react';
import { toastStore } from '../lib/toast/toastStore';

export const useToastStore = () =>
  useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, toastStore.getServerSnapshot);
