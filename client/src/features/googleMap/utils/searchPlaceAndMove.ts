import { i18n } from '@/src/shared/lib/i18n';

type SearchPlaceParams = {
  service: google.maps.places.PlacesService;
  mapInstance: google.maps.Map;
  query: string;
};

export const searchPlaceAndMove = ({ service, mapInstance, query }: SearchPlaceParams) => {
  const currentLanguage = i18n.language || 'en';

  const request: google.maps.places.TextSearchRequest = {
    query,
    location: mapInstance.getCenter(),
    radius: 3000,
    language: currentLanguage,
  };

  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
      const place = results[0];

      if (place.geometry?.location) {
        mapInstance.setCenter(place.geometry.location);
        mapInstance.setZoom(17);

        const marker = new google.maps.Marker({
          map: mapInstance,
          position: place.geometry.location,
          title: place.name,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="
              font-family: Arial, sans-serif;
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
                ${place.formatted_address || 'Address not available'}
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
                📍 View on Google Maps
              </a>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker);
        });

        infoWindow.open(mapInstance, marker);
      }
    } else {
      console.error('Search failed:', status);
      console.warn('해당 위치를 찾을 수 없습니다. 다른 키워드로 검색해보세요.');
    }
  });
};
