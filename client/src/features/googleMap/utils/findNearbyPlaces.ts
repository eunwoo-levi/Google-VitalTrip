/**
 * @description: 주변 약국, 병원, 응급실 검색 (반경 1km 이내)
 * @param {google.maps.places.PlacesService} placesService - Google Places API 서비스 객체
 * @param {google.maps.LatLngLiteral} location - 검색할 위치 (위도, 경도)
 * @param {google.maps.Map} map - Google Maps 객체
 */
export const findNearbyPlaces = (
  placesService: google.maps.places.PlacesService,
  location: google.maps.LatLngLiteral,
  map: google.maps.Map,
) => {
  // 현재 열린 InfoWindow들을 추적하기 위한 배열
  const openInfoWindows: google.maps.InfoWindow[] = [];
  const types = ['pharmacy', 'hospital'];

  // 지도 클릭 시 모든 InfoWindow 닫기
  map.addListener('click', () => {
    openInfoWindows.forEach((window) => window.close());
    openInfoWindows.length = 0;
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
              map,
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
                      onclick="this.parentElement.parentElement.parentElement.parentElement.style.display='none'"
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

            marker.addListener('click', () => {
              // 다른 열린 InfoWindow들을 모두 닫기
              openInfoWindows.forEach((window) => window.close());
              openInfoWindows.length = 0;

              // 새 InfoWindow 열기
              infoWindow.open(map, marker);
              openInfoWindows.push(infoWindow);
            });
          }
        });
      } else {
        console.error(`${type} 검색 실패:`, status);
      }
    });
  });
};
