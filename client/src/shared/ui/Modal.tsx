'use client';

import { useOverlay } from '@vitaltrip/shared';
import React, { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const overlay = useOverlay({
    closeOnEscape: true,
    autoOpen: true,
  });

  useEffect(() => {
    if (!overlay.isOpen && onClose) {
      onClose();
    }
  }, [overlay.isOpen, onClose]);

  const handleClose = () => {
    overlay.close();
    onClose?.();
  };

  return overlay.render(
    <div className='relative'>
      <button
        onClick={handleClose}
        className='absolute top-2 right-2 z-10 text-xl font-bold text-gray-500 hover:text-black'
      >
        ✕
      </button>
      <div className='pt-6'>{children}</div>
    </div>,
  );
}
