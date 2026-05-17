'use client';

import { useToastStore } from '../hooks/useToastStore';
import { toastStore } from '../lib/toast/toastStore';

const TYPE_STYLES = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-gray-700',
};

const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

export function ToastContainer() {
  const toasts = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className='fixed top-20 right-4 z-[9999] flex flex-col gap-2'>
      {toasts.map((t) => (
        <div
          key={t.id}
          role='alert'
          className={`flex max-w-80 min-w-64 items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-xl ${TYPE_STYLES[t.type]}`}
          onClick={() => toastStore.remove(t.id)}
        >
          <span className='mt-0.5 text-base'>{ICONS[t.type]}</span>
          <span className='leading-snug'>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
