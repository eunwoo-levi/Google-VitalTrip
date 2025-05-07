import React, { ReactNode } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = ['places'];

type GoogleMapsProviderProps = {
  children: ReactNode;
};

const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  if (loadError) {
    return (
      <div className='flex h-96 items-center justify-center rounded-lg bg-red-50 text-red-500'>
        <p>An error occurred while loading Google Maps. Please try again later.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className='flex h-96 items-center justify-center rounded-lg bg-gray-100'>
        <div className='h-10 w-10 animate-spin rounded-full border-b-2 border-blue-500'></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GoogleMapsProvider;
