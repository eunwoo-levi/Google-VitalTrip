'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import { useEffect, useRef, useState } from 'react';
import { findNearbyPlaces } from '../utils/findNearbyPlaces';
import { initializeMap } from '../utils/initializeMap';

export const useGoogleMap = () => {
  const { i18n } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [service, setService] = useState<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    const initMap = () => {
      initializeMap({ mapRef, setMapInstance, setService, findNearbyPlaces });
    };

    const handleLanguageChange = () => {
      // 지도 재초기화 시 언어 불일치가 감지되면 자동으로 새로고침됨
      setMapInstance(null);
      setService(null);
      initMap();
    };

    initMap();

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return {
    mapRef,
    mapInstance,
    service,
  };
};
