import React, { useRef } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  useOutsideClick(modalRef, onClose);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div
        ref={modalRef}
        className='animate-slideFadeUp relative w-[95%] max-w-md rounded-xl bg-white p-6 shadow-xl'
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-black'
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
