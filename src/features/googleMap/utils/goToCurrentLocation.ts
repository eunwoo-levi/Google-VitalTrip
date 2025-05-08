import { findNearbyPlaces } from './findNearbyPlaces';
type GoToCurrentLocationParams = {
  mapInstance: google.maps.Map | null;
  service: google.maps.places.PlacesService | null;
};

export const goToCurrentLocation = ({ mapInstance, service }: GoToCurrentLocationParams) => {
  if (!mapInstance || !service) return;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      mapInstance.setCenter(currentPos);
      findNearbyPlaces(service, currentPos, mapInstance); // 마커 갱신
    },
    (error) => {
      console.error('현위치를 가져오는 데 실패했습니다:', error);
    },
  );
};
