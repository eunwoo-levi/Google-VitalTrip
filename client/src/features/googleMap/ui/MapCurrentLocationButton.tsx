'use client';

import { goToCurrentLocation } from '../utils/goToCurrentLocation';

interface Props {
  mapInstance: google.maps.Map | null;
  service: google.maps.places.PlacesService | null;
}

export function MapCurrentLocationButton({ mapInstance, service }: Props) {
  return (
    <button
      onClick={() => goToCurrentLocation({ mapInstance, service })}
      className='absolute top-[240px] right-[6px] z-10 rounded-full bg-white p-3 shadow-lg transition hover:bg-gray-100'
    >
      📍
    </button>
  );
}
