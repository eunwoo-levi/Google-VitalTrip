import React from 'react';

interface DropdownProps {
  direction?: 'top' | 'bottom';
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export default function Dropdown({ direction = 'bottom', children, ref }: DropdownProps) {
  const positionClass = direction === 'top' ? 'bottom-full mb-6' : 'top-full mt-6';
  const animationClass = direction === 'top' ? 'animate-slideFadeUp' : 'animate-slideFadeDown';

  if (!ref) {
    ref = React.createRef<HTMLDivElement>();
  }

  return (
    <div
      ref={ref}
      className={`absolute left-1/2 -translate-x-1/2 ${positionClass} w-33 rounded-md border bg-white shadow-md md:w-44 ${animationClass} z-[100] cursor-pointer`}
    >
      {children}
    </div>
  );
}
