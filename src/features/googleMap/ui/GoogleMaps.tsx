import React from 'react';
import { useGoogleMap } from '../hooks/useGoogleMap';
import SearchBar from './SearchBar';
import { goToCurrentLocation } from '../utils/goToCurrentLocation';

export default function GoogleMaps() {
  const {
    mapRef,
    mapInstance,
    service,
  } = useGoogleMap();


  return (
    <div className='absolute inset-0'>
      <SearchBar service={service} mapInstance={mapInstance} />

      <button
        onClick={() => goToCurrentLocation}
        className='absolute top-[240px] right-[6px] z-10 rounded-full bg-white p-3 shadow-lg transition hover:bg-gray-100'
      >
        📍
      </button>

      <div ref={mapRef} className='h-full w-full' />
    </div>
  );
}
