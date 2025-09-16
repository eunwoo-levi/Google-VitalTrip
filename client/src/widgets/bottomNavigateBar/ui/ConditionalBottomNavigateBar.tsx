'use client';

import { usePathname } from 'next/navigation';
import BottomNavigateBar from './BottomNavigateBar';

export default function ConditionalBottomNavigateBar() {
  const pathname = usePathname();

  const shouldHide =
    pathname.startsWith('/about') ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/auth/callback';

  return (
    <div className={shouldHide ? 'hidden' : 'block'}>
      <BottomNavigateBar />
    </div>
  );
}
