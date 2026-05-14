import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';

export type NativeCoords = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
};

export function useNativeLocation() {
  const [coords, setCoords] = useState<NativeCoords | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const watchSubscription = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (cancelled || status !== 'granted') return;

      setPermissionGranted(true);

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      if (!cancelled) setCoords(current.coords);

      watchSubscription.current = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 15000, distanceInterval: 50 },
        (pos) => {
          if (!cancelled) setCoords(pos.coords);
        },
      );
    })();

    return () => {
      cancelled = true;
      watchSubscription.current?.remove();
    };
  }, []);

  return { coords, permissionGranted };
}
