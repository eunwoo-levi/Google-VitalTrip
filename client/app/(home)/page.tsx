'use client';

import MedicalList from '@/src/features/medical/ui/MedicalList';
import { usePreventKeyboardZoom } from '@/src/shared/hooks/usePreventKeyboardZoom';
import SidePanel from '@/src/shared/ui/SidePanel';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const GoogleMaps = dynamic(() => import('@/src/features/googleMap/ui/GoogleMaps'), {
  ssr: false,
  loading: () => (
    <div className='flex h-full w-full items-center justify-center bg-gray-100'>
      <div className='text-gray-600'>Loading...</div>
    </div>
  ),
});

export default function MapPage() {
  usePreventKeyboardZoom();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className='relative mx-auto min-h-screen w-full'>
      <SidePanel isOpen={isSidePanelOpen} onToggle={toggleSidePanel}>
        <MedicalList />
      </SidePanel>
      <GoogleMaps />
    </div>
  );
}
