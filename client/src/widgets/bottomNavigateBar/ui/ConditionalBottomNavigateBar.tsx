'use client';

import { usePathname } from 'next/navigation';
import BottomNavigateBar from './BottomNavigateBar';

export default function ConditionalBottomNavigateBar() {
  const pathname = usePathname();

  if (
    pathname === '/about' ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/auth/callback'
  ) {
    return null;
  }

  return <BottomNavigateBar />;
}
