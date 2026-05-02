'use client';

import { useEffect, useState } from 'react';
import { findNearbyPlaces } from '../utils/findNearbyPlaces';

export type CategoryKey = 'all' | 'pharmacy' | 'hospital';

const getTypes = (category: CategoryKey): string[] =>
  category === 'all' ? ['pharmacy', 'hospital'] : [category];

export const useMapControls = (
  mapInstance: google.maps.Map | null,
  service: google.maps.places.PlacesService | null,
) => {
  const [showResearchBtn, setShowResearchBtn] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  useEffect(() => {
    if (!mapInstance) return;
    const listener = mapInstance.addListener('dragend', () => setShowResearchBtn(true));
    return () => google.maps.event.removeListener(listener);
  }, [mapInstance]);

  const handleResearch = () => {
    if (!mapInstance || !service) return;
    const center = mapInstance.getCenter()!;
    findNearbyPlaces(
      service,
      { lat: center.lat(), lng: center.lng() },
      mapInstance,
      getTypes(activeCategory),
    );
    setShowResearchBtn(false);
  };

  const handleCategoryChange = (category: CategoryKey) => {
    setActiveCategory(category);
    if (!mapInstance || !service) return;
    const center = mapInstance.getCenter()!;
    findNearbyPlaces(
      service,
      { lat: center.lat(), lng: center.lng() },
      mapInstance,
      getTypes(category),
    );
  };

  return { showResearchBtn, activeCategory, handleResearch, handleCategoryChange };
};
