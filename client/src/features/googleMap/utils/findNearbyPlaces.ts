import { MarkerClusterer } from '@googlemaps/markerclusterer';

let activeMarkers: Array<{
  marker: google.maps.marker.AdvancedMarkerElement;
  listener: google.maps.MapsEventListener;
}> = [];
let mapClickListener: google.maps.MapsEventListener | null = null;
let openInfoWindows: google.maps.InfoWindow[] = [];
let clusterer: MarkerClusterer | null = null;
const infoWindowRegistry = new Map<string, google.maps.InfoWindow>();
const detailCache = new Map<string, google.maps.places.PlaceResult>();

export const cleanupNearbyPlaces = () => {
  activeMarkers.forEach(({ marker, listener }) => {
    google.maps.event.removeListener(listener);
    marker.map = null;
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

  infoWindowRegistry.clear();
  detailCache.clear();
};

const closeBtn = `
  <button
    onclick="window.__closeActiveInfoWindow()"
    style="
      position:absolute;top:10px;right:10px;
      background:#f3f4f6;border:none;
      width:26px;height:26px;border-radius:50%;
      font-size:13px;color:#6b7280;cursor:pointer;
      display:flex;align-items:center;justify-content:center;
      line-height:1;
    "
    onmouseover="this.style.background='#e5e7eb'"
    onmouseout="this.style.background='#f3f4f6'"
  >&#x2715;</button>
`;

const renderStars = (rating: number): string => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return '&#9733;'.repeat(full) + (half ? '&frac12;' : '') + '&#9734;'.repeat(empty);
};

const buildLoadingContent = (): string => `
  <div style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    width: 260px;
    padding: 40px 16px 20px;
    text-align: center;
    color: #999;
    font-size: 13px;
    position: relative;
    box-sizing: border-box;
  ">
    ${closeBtn}
    <div style="
      width: 24px; height: 24px;
      border: 3px solid #e5e7eb;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 10px;
    "></div>
    불러오는 중...
    <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
  </div>
`;

const buildDetailContent = (
  place: google.maps.places.PlaceResult,
  type: string,
): string => {
  const isPharmacy = type === 'pharmacy';
  const accentColor = isPharmacy ? '#10b981' : '#3b82f6';
  const badgeLabel = isPharmacy ? '약국' : '병원';
  const badgeBg = isPharmacy ? '#d1fae5' : '#dbeafe';
  const badgeText = isPharmacy ? '#065f46' : '#1e40af';

  const isOpen = place.opening_hours?.isOpen?.();
  const openStatus =
    isOpen === undefined
      ? ''
      : isOpen
        ? `<span style="color:#10b981;font-weight:600;">&#9679; 영업 중</span>`
        : `<span style="color:#ef4444;font-weight:600;">&#9679; 영업 종료</span>`;

  const rating =
    place.rating !== undefined
      ? `<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
           <span style="color:#f59e0b;font-size:14px;letter-spacing:1px;">${renderStars(place.rating)}</span>
           <span style="font-size:13px;color:#6b7280;">${place.rating.toFixed(1)}</span>
           ${place.user_ratings_total ? `<span style="font-size:12px;color:#9ca3af;">(${place.user_ratings_total.toLocaleString()})</span>` : ''}
         </div>`
      : '';

  const phone = place.formatted_phone_number
    ? `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
         <span style="font-size:15px;">&#128222;</span>
         <a href="tel:${place.formatted_phone_number}" style="font-size:13px;color:#3b82f6;text-decoration:none;">
           ${place.formatted_phone_number}
         </a>
       </div>`
    : '';

  const address = place.formatted_address || place.vicinity || '';
  const addressHtml = address
    ? `<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;">
         <span style="font-size:14px;margin-top:1px;">&#128205;</span>
         <span style="font-size:12px;color:#6b7280;line-height:1.5;">${address}</span>
       </div>`
    : '';

  const website = place.website
    ? `<a
         href="${place.website}"
         target="_blank"
         rel="noopener noreferrer"
         style="
           display:flex;align-items:center;justify-content:center;gap:6px;
           padding:9px 0;
           background:#f8fafc;
           border:1px solid #e2e8f0;
           border-radius:8px;
           font-size:13px;color:#374151;text-decoration:none;
           margin-bottom:8px;
         "
         onmouseover="this.style.background='#f1f5f9'"
         onmouseout="this.style.background='#f8fafc'"
       >
         &#127760; 웹사이트 방문
       </a>`
    : '';

  return `
    <div style="
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      width: 260px;
      padding: 40px 16px 12px;
      box-sizing: border-box;
      position: relative;
    ">
      ${closeBtn}

      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="
          display:inline-block;
          padding:3px 9px;
          background:${badgeBg};
          color:${badgeText};
          font-size:11px;font-weight:700;
          border-radius:99px;letter-spacing:0.5px;
        ">${badgeLabel}</span>
        <span style="font-size:12px;">${openStatus}</span>
      </div>

      <h2 style="
        margin:0 0 8px;
        font-size:16px;font-weight:700;
        color:#111827;line-height:1.4;
      ">${place.name}</h2>

      ${rating}

      <div style="border-top:1px solid #f3f4f6;margin:10px 0;"></div>

      ${phone}
      ${addressHtml}

      <div style="border-top:1px solid #f3f4f6;margin:10px 0;"></div>

      ${website}

      <a
        href="https://www.google.com/maps/place/?q=place_id:${place.place_id}"
        target="_blank"
        rel="noopener noreferrer"
        style="
          display:flex;align-items:center;justify-content:center;gap:6px;
          padding:9px 0;
          background:${accentColor};
          border-radius:8px;
          font-size:13px;color:#fff;font-weight:600;text-decoration:none;
        "
        onmouseover="this.style.opacity='0.9'"
        onmouseout="this.style.opacity='1'"
      >
        Google Maps에서 보기 &#8594;
      </a>
    </div>
  `;
};

export const findNearbyPlaces = (
  placesService: google.maps.places.PlacesService,
  location: google.maps.LatLngLiteral,
  map: google.maps.Map,
  types: string[] = ['pharmacy', 'hospital'],
) => {
  cleanupNearbyPlaces();

  (window as any).__closeActiveInfoWindow = () => {
    openInfoWindows.forEach((w) => w.close());
    openInfoWindows = [];
  };

  clusterer = new MarkerClusterer({ map, markers: [] });

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
          if (!place.geometry?.location) return;

          const markerContent = document.createElement('img');
          markerContent.src =
            type === 'pharmacy' ? '/pharmacy-marker.webp' : '/hospital-marker.webp';
          markerContent.style.width = '40px';
          markerContent.style.height = '40px';

          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: place.geometry.location,
            title: place.name,
            content: markerContent,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: buildLoadingContent(),
          });

          if (place.place_id) {
            infoWindowRegistry.set(place.place_id, infoWindow);
          }

          infoWindow.addListener('closeclick', () => {
            openInfoWindows = openInfoWindows.filter((w) => w !== infoWindow);
          });

          const clickListener = marker.addListener('click', () => {
            openInfoWindows.forEach((w) => w.close());
            openInfoWindows = [];
            openInfoWindows.push(infoWindow);

            const cached = detailCache.get(place.place_id!);
            if (cached) {
              infoWindow.setContent(buildDetailContent(cached, type));
              infoWindow.open({ map, anchor: marker });
              return;
            }

            infoWindow.setContent(buildLoadingContent());
            infoWindow.open({ map, anchor: marker });

            placesService.getDetails(
              {
                placeId: place.place_id!,
                fields: [
                  'name',
                  'formatted_address',
                  'formatted_phone_number',
                  'opening_hours',
                  'rating',
                  'user_ratings_total',
                  'website',
                  'place_id',
                ],
              },
              (detail, detailStatus) => {
                if (
                  detailStatus === google.maps.places.PlacesServiceStatus.OK &&
                  detail
                ) {
                  detailCache.set(place.place_id!, detail);
                  infoWindow.setContent(buildDetailContent(detail, type));
                } else {
                  infoWindow.setContent(buildDetailContent(place, type));
                }
              },
            );
          });

          clusterer!.addMarker(marker);
          activeMarkers.push({ marker, listener: clickListener });
        });
      } else {
        console.error(`${type} 검색 실패:`, status);
      }
    });
  });
};
