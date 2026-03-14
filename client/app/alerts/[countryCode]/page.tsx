import {
  ALARM_LEVEL,
  TravelAlertApiResponse,
  TravelAlertItem,
} from '@/src/features/travelAlert/types/travelAlert';
import { TravelAlertContent } from '@/src/features/travelAlert/ui/TravelAlertContent';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ countryCode: string }>;
}

async function fetchTravelAlert(countryCode: string): Promise<TravelAlertItem[] | null> {
  const serviceKey = process.env.TRAVEL_ALARM_API_KEY;
  // serviceKey가 이미 URL 인코딩된 상태이므로 직접 URL 조합 (URLSearchParams 사용 시 이중 인코딩 발생)
  const url = `https://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=${serviceKey}&returnType=JSON&numOfRows=10&pageNo=1&cond%5Bcountry_iso_alp2%3A%3AEQ%5D=${countryCode.toUpperCase()}`;

  try {
    const res = await fetch(url, { cache: 'no-store' }); // SSR: 매 요청마다 최신 경보 정보

    if (!res.ok) return null;

    const data: TravelAlertApiResponse = await res.json();
    return data.response.body.items?.item ?? [];
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countryCode } = await params;
  const items = await fetchTravelAlert(countryCode);
  const country = items?.[0];

  if (!country) return { title: '여행경보 정보' };

  const alarmInfo = ALARM_LEVEL[country.alarm_lvl as keyof typeof ALARM_LEVEL];

  return {
    title: `${country.country_nm} 여행경보 | VitalTrip`,
    description: `${country.country_nm} 현재 여행경보: ${alarmInfo?.label ?? '정보 없음'}. 해외 여행 전 안전 정보를 확인하세요.`,
  };
}

export default async function TravelAlertPage({ params }: Props) {
  const { countryCode } = await params;
  const items = await fetchTravelAlert(countryCode);

  if (!items || items.length === 0) notFound();

  const country = items[0];
  const alarmInfo = ALARM_LEVEL[country.alarm_lvl as keyof typeof ALARM_LEVEL];

  return (
    <div className='min-h-screen bg-slate-50'>
      <header className='w-full bg-white shadow-sm'>
        <div className='mx-auto max-w-4xl px-6 py-5'>
          <div className='flex items-center gap-3'>
            <Link href='/' aria-label='VitalTrip 홈으로 이동'>
              <Image
                src='/VitalTrip.svg'
                alt='VitalTrip'
                width={40}
                height={40}
                className='h-10 w-auto'
              />
            </Link>
            <span className='text-lg font-semibold text-gray-700'>해외 여행경보</span>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-4xl px-6 py-10 pb-[100px]'>
        {/* 국가 헤더 */}
        <div className='mb-8 overflow-hidden rounded-2xl bg-white shadow-xl'>
          <div className='flex items-center gap-6 p-8'>
            {country.flag_download_url && (
              <img
                src={country.flag_download_url}
                alt={`${country.country_nm} 국기`}
                className='h-16 w-24 rounded-lg object-cover shadow-md'
              />
            )}
            <div>
              <p className='text-sm text-gray-600'>{country.continent_nm}</p>
              <h1 className='text-3xl font-bold text-gray-900'>{country.country_nm}</h1>
              <p className='text-lg text-gray-600'>{country.country_eng_nm}</p>
            </div>
          </div>
        </div>

        <TravelAlertContent items={items} alarmInfo={alarmInfo} />
      </main>
    </div>
  );
}
