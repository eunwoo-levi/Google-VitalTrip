'use client';

import { useGoogleMap } from '../hooks/useGoogleMap';
import { useMapControls } from '../hooks/useMapControls';
import { MapCategoryTabs } from './MapCategoryTabs';
import { MapCurrentLocationButton } from './MapCurrentLocationButton';
import { MapLoadingOverlay } from './MapLoadingOverlay';
import { MapResearchButton } from './MapResearchButton';
import SearchBar from './SearchBar';

export default function GoogleMaps() {
  const { mapRef, mapInstance, service } = useGoogleMap();
  const { showResearchBtn, activeCategory, handleResearch, handleCategoryChange } = useMapControls(
    mapInstance,
    service,
  );

  return (
    <div className='absolute inset-0'>
      <div className='absolute top-15 left-1/2 z-10 flex w-2/3 -translate-x-1/2 flex-col gap-2 lg:top-5'>
        <SearchBar service={service} mapInstance={mapInstance} />
        {mapInstance && (
          <MapCategoryTabs activeCategory={activeCategory} onChange={handleCategoryChange} />
        )}
      </div>

      <MapResearchButton show={showResearchBtn} onClick={handleResearch} />
      <MapCurrentLocationButton mapInstance={mapInstance} service={service} />

      <div ref={mapRef} className='h-full w-full' />

      {!mapInstance && <MapLoadingOverlay />}
    </div>
  );
}
