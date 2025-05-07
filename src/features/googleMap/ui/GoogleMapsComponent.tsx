import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '70vh',
};

// 지도 옵션
const options = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
};

type MapProps = {
  markers?: Array<{
    id: string;
    position: {
      lat: number;
      lng: number;
    };
    title: string;
    info?: string;
  }>;
};

const GoogleMapsComponent: React.FC<MapProps> = ({ markers = [] }) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLng | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (markerId: string) => {
    setSelectedMarker(markerId);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(new google.maps.LatLng(latitude, longitude));
        },
        () => {
          console.error('Geolocation not available');
        },
      );
    }
  }, []);

  const center = currentLocation
    ? { lat: currentLocation.lat(), lng: currentLocation.lng() }
    : { lat: 37.7749, lng: -122.4194 };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      {currentLocation && (
        <Marker
          position={center}
          title='현재 위치'
          icon='http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        />
      )}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          title={marker.title}
          onClick={() => handleMarkerClick(marker.id)}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={markers.find((m) => m.id === selectedMarker)?.position}
          onCloseClick={handleInfoWindowClose}
        >
          <div>
            <h3>{markers.find((m) => m.id === selectedMarker)?.title}</h3>
            <p>{markers.find((m) => m.id === selectedMarker)?.info}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapsComponent;
