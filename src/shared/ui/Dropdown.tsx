import React from 'react';

interface DropdownProps {
  direction?: 'top' | 'bottom';
  children: React.ReactNode;
}

export default function Dropdown({ direction = 'bottom', children }: DropdownProps) {
  const positionClass = direction === 'top' ? 'bottom-full mb-6' : 'top-full mt-6';
  const animationClass = direction === 'top' ? 'animate-slideFadeUp' : 'animate-slideFadeDown';

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 ${positionClass} z-50 w-48 rounded-md border bg-white shadow-md ${animationClass}`}
    >
      {children}
    </div>
  );
}
