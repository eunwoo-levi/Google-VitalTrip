'use client';

import dynamic from 'next/dynamic';

const GoogleMaps = dynamic(() => import('@/src/features/googleMap/ui/GoogleMaps'), { ssr: false });

export default function MapPage() {
  return (
    <div className='mx-auto min-h-screen w-full'>
      <GoogleMaps />
    </div>
  );
}
