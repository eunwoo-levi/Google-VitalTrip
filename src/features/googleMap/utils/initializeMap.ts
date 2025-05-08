'use client';
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect } from 'react';

type InitializeMapParams = {
  mapRef: React.RefObject<HTMLDivElement | null>;
  setMapInstance: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
  setService: React.Dispatch<React.SetStateAction<google.maps.places.PlacesService | null>>;
  findNearbyPlaces: (
    service: google.maps.places.PlacesService,
    location: google.maps.LatLngLiteral,
    map: google.maps.Map,
  ) => void;
};

/**
 * @description: Google Maps 초기화 및 현재 위치 마커 추가
 *
 */
export const initializeMap = ({
  mapRef,
  setMapInstance,
  setService,
  findNearbyPlaces,
}: InitializeMapParams) => {
  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: 'quarterly',
        libraries: ['places'], //  반드시 포함해야 함
      });

      const { Map } = await loader.importLibrary('maps');
      const { AdvancedMarkerElement } = (await loader.importLibrary(
        'marker',
      )) as google.maps.MarkerLibrary;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const map = new Map(mapRef.current as HTMLDivElement, {
            center,
            zoom: 15,
            mapId: 'NEXT_MAPS_VITALTRIPS',
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.TOP_RIGHT,
            },
            streetViewControl: true,
            streetViewControlOptions: {
              position: google.maps.ControlPosition.TOP_RIGHT,
            },
          });

          setMapInstance(map);
          const placesService = new google.maps.places.PlacesService(map);
          setService(placesService);

          // 현재 위치 마커
          new AdvancedMarkerElement({
            map,
            position: center,
          });

          // 주변 장소 검색 실행
          findNearbyPlaces(placesService, center, map);
        },
        (error) => {
          console.error('위치 정보를 가져오는 데 실패했습니다:', error);
        },
      );
    };

    initializeMap();
  }, []);
};
