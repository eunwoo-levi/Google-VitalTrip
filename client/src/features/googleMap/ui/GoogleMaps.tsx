import React from 'react';
import { useGoogleMap } from '../hooks/useGoogleMap';
import SearchBar from './SearchBar';
import { goToCurrentLocation } from '../utils/goToCurrentLocation';

export default function GoogleMaps() {
  const { mapRef, mapInstance, service } = useGoogleMap();

  return (
    <div className='absolute inset-0'>
      <SearchBar service={service} mapInstance={mapInstance} />

      <button
        onClick={() => goToCurrentLocation({ mapInstance, service })}
        className='absolute top-[240px] right-[6px] z-10 rounded-full bg-white p-3 shadow-lg transition hover:bg-gray-100'
      >
        📍
      </button>

      <div ref={mapRef} className='h-full w-full' />

      {!mapInstance && (
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-100'>
          <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500' />
          <p className='text-sm text-gray-500'>지도를 불러오는 중...</p>
        </div>
      )}
    </div>
  );
}
