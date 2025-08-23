import { useState } from 'react';

// 나중에 제거하기!
const coordsMock = {
  latitude: 37.5665,
  longitude: 126.978,
};

export const useCurrentLocation = () => {
  // const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     setError('Geolocation is not supported by this browser.');
  //     setIsLoading(false);
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setCoords({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //       setIsLoading(false);
  //     },
  //     (err) => {
  //       setError(err.message);
  //       setIsLoading(false);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 10000,
  //       maximumAge: 0,
  //     },
  //   );
  // }, []);

  return { coords: coordsMock, isLoading, error };
};
