'use client';

import React, { useRef, useState } from 'react';
import { initializeMap } from '../utils/initializeMap';
import { findNearbyPlaces } from '../utils/findNearbyPlaces';
import { goToCurrentLocation } from '../utils/goToCurrentLocation';
import SearchBar from './SearchBar';

export default function GoogleMaps() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [service, setService] = useState<google.maps.places.PlacesService | null>(null);

  initializeMap({ mapRef, setMapInstance, setService, findNearbyPlaces });

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
    </div>
  );
}
