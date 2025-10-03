'use client';

import { FirstAidResult } from '@/src/features/firstAid/ui';
import { FirstAidHeader } from '@/src/features/firstAid/ui/FirstAidHeader';

export default function FirstAidCSRPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <FirstAidHeader />
      <FirstAidResult />
    </div>
  );
}
