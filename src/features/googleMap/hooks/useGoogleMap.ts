'use client';

import { useRef, useState } from 'react';
import { initializeMap } from '../utils/initializeMap';
import { findNearbyPlaces } from '../utils/findNearbyPlaces';

export const useGoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [service, setService] = useState<google.maps.places.PlacesService | null>(null);

  initializeMap({ mapRef, setMapInstance, setService, findNearbyPlaces });

  return {
    mapRef,
    mapInstance,
    service,
  };
};
