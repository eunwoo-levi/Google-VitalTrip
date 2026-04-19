import { MarkerClusterer } from '@googlemaps/markerclusterer';

let activeMarkers: Array<{
  marker: google.maps.Marker;
  listener: google.maps.MapsEventListener;
}> = [];
let mapClickListener: google.maps.MapsEventListener | null = null;
let openInfoWindows: google.maps.InfoWindow[] = [];
let clusterer: MarkerClusterer | null = null;

export const cleanupNearbyPlaces = () => {
  activeMarkers.forEach(({ marker, listener }) => {
    google.maps.event.removeListener(listener);
    marker.setMap(null);
  });
  activeMarkers = [];

  if (mapClickListener) {
    google.maps.event.removeListener(mapClickListener);
    mapClickListener = null;
  }

  openInfoWindows.forEach((w) => w.close());
  openInfoWindows = [];

  if (clusterer) {
    clusterer.clearMarkers();
    clusterer = null;
  }
};

export const findNearbyPlaces = (
  placesService: google.maps.places.PlacesService,
  location: google.maps.LatLngLiteral,
  map: google.maps.Map,
) => {
  cleanupNearbyPlaces();

  clusterer = new MarkerClusterer({ map, markers: [] });

  const types = ['pharmacy', 'hospital'];

  mapClickListener = map.addListener('click', () => {
    openInfoWindows.forEach((w) => w.close());
    openInfoWindows = [];
  });

  types.forEach((type) => {
    const request: google.maps.places.PlaceSearchRequest = {
      location,
      radius: 5000,
      type,
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place) => {
          if (place.geometry?.location) {
            const marker = new google.maps.Marker({
              position: place.geometry.location,
              title: place.name,
              icon: {
                url: type === 'pharmacy' ? '/pharmacy-marker.webp' : '/hospital-marker.webp',
                scaledSize: new google.maps.Size(40, 40),
              },
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `
                  <div style="
                    font-family: 'Arial', sans-serif;
                    padding: 18px 14px 28px 12px;
                    text-align: center;
                    max-width: 220px;
                    position: relative;
                    margin-top: -8px;
                  ">
                    <button
                      onclick="window.__closeInfoWindow && window.__closeInfoWindow(this)"
                      data-infowindow-id="${place.place_id}"
                      style="
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        background: none;
                        border: none;
                        font-size: 16px;
                        color: #666;
                        cursor: pointer;
                        padding: 4px 8px;
                        line-height: 1;
                        border-radius: 4px;
                        z-index: 1000;
                      "
                      onmouseover="this.style.backgroundColor='#f0f0f0'"
                      onmouseout="this.style.backgroundColor='transparent'"
                    >
                      X
                    </button>
                    <h2 style="
                      font-size: 15px;
                      margin: 0 0 8px 0;
                      font-weight: bold;
                      color: #333;
                      text-align: center;
                      word-wrap: break-word;
                      overflow-wrap: break-word;
                      max-width: 180px;
                      margin-left: auto;
                      margin-right: auto;
                    ">
                      ${place.name}
                    </h2>
                    <p style="
                      font-size: 13px;
                      margin: 0 0 12px 0;
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
                        margin-top: 8px;
                        padding: 5px 8px;
                        font-size: 12px;
                        color: white;
                        background-color: #4285F4;
                        text-decoration: none;
                        border-radius: 4px;
                      "
                    >
                      📍 View on Google Maps
                    </a>
                  </div>
                `,
            });

            infoWindow.addListener('closeclick', () => {
              openInfoWindows = openInfoWindows.filter((w) => w !== infoWindow);
            });

            const clickListener = marker.addListener('click', () => {
              openInfoWindows.forEach((w) => w.close());
              openInfoWindows = [];
              infoWindow.open(map, marker);
              openInfoWindows.push(infoWindow);
            });

            clusterer!.addMarker(marker);
            activeMarkers.push({ marker, listener: clickListener });
          }
        });
      } else {
        console.error(`${type} 검색 실패:`, status);
      }
    });
  });
};
