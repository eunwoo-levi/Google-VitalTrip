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
      className={`absolute right-0 ${positionClass} w-48 rounded-md border bg-white shadow-md md:w-52 ${animationClass} z-[100] cursor-pointer`}
    >
      {children}
    </div>
  );
}
