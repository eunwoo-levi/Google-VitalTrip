'use client';

import React from 'react';
import GoogleMapsProvider from '@/src/features/googleMap/ui/GoogleMapsProvider';
import dynamic from 'next/dynamic';

const GoogleMapsComponent = dynamic(
  () => import('@/src/features/googleMap/ui/GoogleMapsComponent'),
  { ssr: false },
);

export default function MapPage() {
  const mapMarkers = [
    {
      id: '1',
      position: { lat: 37.5665, lng: 126.978 },
      title: '서울',
      info: '서울특별시는 대한민국의 수도입니다.',
    },
    {
      id: '2',
      position: { lat: 37.5744, lng: 126.9768 },
      title: '경복궁',
      info: '경복궁은 조선 시대의 주요 궁궐입니다.',
    },
    {
      id: '3',
      position: { lat: 37.5512, lng: 126.9882 },
      title: '남산서울타워',
      info: '서울을 한눈에 볼 수 있는 유명한 전망대입니다.',
    },
    {
      id: '4',
      position: { lat: 37.4996, lng: 127.0276 },
      title: '강남역',
      info: '서울의 주요 상업지구 중 하나입니다.',
    },
  ];

  return (
    <div className='mx-auto w-full p-4'>
      <h1 className='mb-4 text-center text-2xl font-bold text-purple-500'>
        Welcome to VitalTrips Service
      </h1>
      <GoogleMapsProvider>
        <main className='overflow-hidden rounded-lg shadow-lg'>
          <GoogleMapsComponent markers={mapMarkers} />
        </main>
      </GoogleMapsProvider>
    </div>
  );
}
