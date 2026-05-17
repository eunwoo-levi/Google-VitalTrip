import { toast } from '@/src/shared/lib/toast/toastStore';
import { findNearbyPlaces } from './findNearbyPlaces';
type GoToCurrentLocationParams = {
  mapInstance: google.maps.Map | null;
  service: google.maps.places.PlacesService | null;
};

export const goToCurrentLocation = ({ mapInstance, service }: GoToCurrentLocationParams) => {
  if (!mapInstance || !service) return;

  if (!navigator.geolocation) {
    toast.error('Geolocation is not supported by this browser.');
    return;
  }

  navigator.permissions
    ?.query({ name: 'geolocation' })
    .then((result) => {
      if (result.state === 'denied') {
        toast.error(
          'Location access is denied. Please enable location permissions in your browser settings to use this feature.',
        );
      }
    })
    .catch(() => {
      // Permissions API not supported, continue with getCurrentPosition
    });

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const currentPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      mapInstance.setCenter(currentPos);
      mapInstance.setZoom(15);
      findNearbyPlaces(service, currentPos, mapInstance); // 마커 갱신
    },
    (error) => {
      console.error('현위치를 가져오는 데 실패했습니다:', error);

      let message = 'Unable to get your current location. ';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message +=
            'Location access was denied. Please enable location permissions in your browser settings.';
          break;
        case error.POSITION_UNAVAILABLE:
          message += 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          message += 'Location request timed out. Please try again.';
          break;
        default:
          message += 'An unknown error occurred.';
          break;
      }
      toast.error(message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    },
  );
};
