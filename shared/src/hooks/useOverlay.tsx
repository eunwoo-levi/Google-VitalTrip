import type { ReactNode, ReactPortal } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
export type UsePortalOptions = {
  container?: Element | null;
  closeOnEscape?: boolean;
};

export type PortalControls = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  render: (node: ReactNode) => ReactPortal | null;
};

export const useOverlay = (options: UsePortalOptions = {}): PortalControls => {
  const { container, closeOnEscape = true } = options;

  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    if (typeof document === 'undefined') return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeOnEscape, close]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) close();
    },
    [close]
  );

  const render = useCallback(
    (node: ReactNode): ReactPortal | null => {
      if (!isMounted || !isOpen) return null;
      if (typeof document === 'undefined') return null;

      const root = container ?? document.body;
      if (!root) return null;

      return createPortal(
        <div
          data-portal-backdrop
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            data-portal-content
            role='dialog'
            aria-modal='true'
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              overflow: 'auto',
              background: 'white',
              borderRadius: 12,
              padding: 16,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            {node}
          </div>
        </div>,
        root
      );
    },
    [isMounted, isOpen, container, handleBackdropClick]
  );

  return { isOpen, open, close, toggle, render };
};
