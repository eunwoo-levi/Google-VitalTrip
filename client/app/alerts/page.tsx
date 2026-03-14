import { CountrySearchClient } from '@/src/features/travelAlert/ui/CountrySearchClient';
import {
  TravelAlertApiResponse,
  TravelAlertItem,
} from '@/src/features/travelAlert/types/travelAlert';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '해외 여행경보 검색 | VitalTrip',
  description: '외교부 공식 여행경보 정보. 여행 전 목적지 안전 정보를 확인하세요.',
};

export const revalidate = 3600;

async function fetchAllAlertCountries(): Promise<TravelAlertItem[]> {
  const serviceKey = process.env.TRAVEL_ALARM_API_KEY;
  const url = `https://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?serviceKey=${serviceKey}&returnType=JSON&numOfRows=300&pageNo=1`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data: TravelAlertApiResponse = await res.json();
    return data.response.body.items?.item ?? [];
  } catch {
    return [];
  }
}

export default async function AlertsPage() {
  const countries = await fetchAllAlertCountries();

  const levelCounts = countries.reduce(
    (acc, c) => {
      const lvl = c.alarm_lvl;
      acc[lvl] = (acc[lvl] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className='min-h-screen bg-slate-50'>
      <header className='w-full bg-white shadow-sm'>
        <div className='mx-auto max-w-5xl px-6 py-5'>
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

      <main className='mx-auto max-w-5xl px-6 py-10 pb-[100px]'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>해외 여행경보 검색</h1>
          <p className='mt-2 text-gray-600'>
            외교부 공식 데이터 기준 · 총 {countries.length}개국 경보 발령 중
          </p>
        </div>

        <div className='mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {[
            {
              level: '1',
              label: '여행유의',
              bg: 'bg-blue-50',
              text: 'text-blue-700',
              border: 'border-blue-200',
            },
            {
              level: '2',
              label: '여행자제',
              bg: 'bg-yellow-50',
              text: 'text-yellow-700',
              border: 'border-yellow-200',
            },
            {
              level: '3',
              label: '출국권고',
              bg: 'bg-orange-50',
              text: 'text-orange-700',
              border: 'border-orange-200',
            },
            {
              level: '4',
              label: '여행금지',
              bg: 'bg-red-50',
              text: 'text-red-700',
              border: 'border-red-200',
            },
          ].map(({ level, label, bg, text, border }) => (
            <div key={level} className={`rounded-xl border-2 ${border} ${bg} p-4 text-center`}>
              <div className={`text-2xl font-bold ${text}`}>{levelCounts[level] ?? 0}</div>
              <div className={`text-sm font-medium ${text}`}>
                {level}단계 · {label}
              </div>
            </div>
          ))}
        </div>

        <CountrySearchClient countries={countries} />
      </main>
    </div>
  );
}
