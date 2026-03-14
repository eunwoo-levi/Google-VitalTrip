import { TravelAlertApiResponse, TravelAlertItem } from '../types/travelAlert';

const BASE_URL = 'https://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2';

function getServiceKey() {
  return process.env.TRAVEL_ALARM_API_KEY;
}

export async function fetchAllAlertCountries(): Promise<TravelAlertItem[]> {
  const url = `${BASE_URL}?serviceKey=${getServiceKey()}&returnType=JSON&numOfRows=300&pageNo=1`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data: TravelAlertApiResponse = await res.json();
    return data.response.body.items?.item ?? [];
  } catch {
    return [];
  }
}

export async function fetchTravelAlertByCountry(
  countryCode: string,
): Promise<TravelAlertItem[] | null> {
  const url = `${BASE_URL}?serviceKey=${getServiceKey()}&returnType=JSON&numOfRows=10&pageNo=1&cond%5Bcountry_iso_alp2%3A%3AEQ%5D=${countryCode.toUpperCase()}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data: TravelAlertApiResponse = await res.json();
    return data.response.body.items?.item ?? [];
  } catch {
    return null;
  }
}
