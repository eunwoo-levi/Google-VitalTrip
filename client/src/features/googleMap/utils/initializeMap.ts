'use client';
import { Loader } from '@googlemaps/js-api-loader';

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
export const initializeMap = async ({
  mapRef,
  setMapInstance,
  setService,
  findNearbyPlaces,
}: InitializeMapParams) => {
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: 'quarterly',
    libraries: ['places'],
    language: 'ko',
  });

  const { Map } = await loader.importLibrary('maps');
  const { AdvancedMarkerElement } = (await loader.importLibrary(
    'marker',
  )) as google.maps.MarkerLibrary;

  if (!navigator.geolocation) {
    console.warn('Geolocation is not supported by this browser.');
    initializeMapWithDefaultLocation();
    return;
  }

  navigator.permissions
    ?.query({ name: 'geolocation' })
    .then((result) => {
      if (result.state === 'denied') {
        console.warn('Geolocation permission denied. Using default location.');
        initializeMapWithDefaultLocation();
        return;
      }
    })
    .catch(() => {
      // Permissions API not supported, continue with getCurrentPosition
    });

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
      // Initialize map with default location on error
      initializeMapWithDefaultLocation();
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 600000, // 10 minutes
    },
  );

  function initializeMapWithDefaultLocation() {
    // Default to Seoul, Korea coordinates
    const defaultCenter = {
      lat: 37.5665,
      lng: 126.978,
    };

    const map = new Map(mapRef.current as HTMLDivElement, {
      center: defaultCenter,
      zoom: 13,
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

    // Show default location marker
    new AdvancedMarkerElement({
      map,
      position: defaultCenter,
    });

    // Search nearby places with default location
    findNearbyPlaces(placesService, defaultCenter, map);
  }
};
