'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function GoogleMaps() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [service, setService] = useState<google.maps.places.PlacesService | null>(null);

  // 지도 초기화
  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: 'quarterly',
        libraries: ['places'], // 👈 반드시 포함해야 함
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

  // ✅ 주변 장소 검색 함수
  const findNearbyPlaces = (
    placesService: google.maps.places.PlacesService,
    location: google.maps.LatLngLiteral,
    map: google.maps.Map,
  ) => {
    const types = ['pharmacy', 'hospital'];

    types.forEach((type) => {
      const request: google.maps.places.PlaceSearchRequest = {
        location,
        radius: 1000,
        type,
      };

      placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            if (place.geometry?.location) {
              const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
                title: place.name,
                icon: {
                  url:
                    type === 'pharmacy'
                      ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                      : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // 병원: 빨강, 약국: 파랑
                  scaledSize: new google.maps.Size(40, 40), // 아이콘 크기 조정
                },
              });

              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div style="
                    font-family: 'Arial', sans-serif;
                    padding: 4px 10px 8px 10px;
                    text-align: center;
                    max-width: 220px;
                  ">
                    <h2 style="
                      font-size: 15px;
                      margin: 0 0 4px 0;
                      font-weight: bold;
                      color: #333;
                    ">
                      ${place.name}
                    </h2>
                    <p style="
                      font-size: 13px;
                      margin: 0 0 6px 0;
                      color: #666;
                    ">
                      ${place.vicinity || '주소 정보 없음'}
                    </p>
                    <a
                      href="https://www.google.com/maps/place/?q=place_id:${place.place_id}"
                      target="_blank"
                      rel="noopener noreferrer"
                      style="
                        display: inline-block;
                        margin-top: 4px;
                        padding: 5px 8px;
                        font-size: 12px;
                        color: white;
                        background-color: #4285F4;
                        text-decoration: none;
                        border-radius: 4px;
                      "
                    >
                      📍 Google 지도에서 보기
                    </a>
                  </div>
                `,
              });

              marker.addListener('click', () => {
                infoWindow.open(map, marker);
              });
            }
          });
        } else {
          console.error(`${type} 검색 실패:`, status);
        }
      });
    });
  };

  // 현위치로 이동
  const goToCurrentLocation = () => {
    if (!mapInstance || !service) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        mapInstance.setCenter(currentPos);
        findNearbyPlaces(service, currentPos, mapInstance); // 🔁 마커 갱신
      },
      (error) => {
        console.error('현위치를 가져오는 데 실패했습니다:', error);
      },
    );
  };

  return (
    <div className='absolute inset-0'>
      <div ref={mapRef} className='h-full w-full' />
      <button
        onClick={goToCurrentLocation}
        className='absolute top-[240px] right-[6px] z-10 rounded-full bg-white p-3 shadow-lg transition hover:bg-gray-100'
      >
        📍
      </button>
    </div>
  );
}
