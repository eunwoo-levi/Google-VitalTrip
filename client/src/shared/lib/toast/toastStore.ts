export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type Listener = () => void;

let toasts: Toast[] = [];
const EMPTY_TOASTS: Toast[] = [];
const listeners = new Set<Listener>();

const notify = () => listeners.forEach((l) => l());

export const toastStore = {
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: (): Toast[] => toasts,
  getServerSnapshot: (): Toast[] => EMPTY_TOASTS,
  add: (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = crypto.randomUUID();
    toasts = [...toasts, { id, message, type }];
    notify();
    setTimeout(() => toastStore.remove(id), duration);
  },
  remove: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },
};

export const toast = {
  success: (message: string) => toastStore.add(message, 'success'),
  error: (message: string) => toastStore.add(message, 'error'),
  info: (message: string) => toastStore.add(message, 'info'),
};
