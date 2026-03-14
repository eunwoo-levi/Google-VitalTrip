'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ALARM_LEVEL, TravelAlertItem } from '../types/travelAlert';

interface Props {
  countries: TravelAlertItem[];
}

export const CountrySearchClient = ({ countries }: Props) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // 같은 국가가 지역별로 여러 row로 올 수 있어서 나라당 하나로 합침 (가장 높은 경보단계)
  const deduped = Object.values(
    countries.reduce(
      (acc, c) => {
        const key = c.country_iso_alp2;
        if (!acc[key] || Number(c.alarm_lvl) > Number(acc[key].alarm_lvl)) {
          acc[key] = c;
        }
        return acc;
      },
      {} as Record<string, TravelAlertItem>,
    ),
  );

  const filtered = query.trim()
    ? deduped.filter(
        (c) =>
          c.country_nm.includes(query) ||
          c.country_eng_nm.toLowerCase().includes(query.toLowerCase()) ||
          c.country_iso_alp2.toLowerCase().includes(query.toLowerCase()),
      )
    : deduped;

  return (
    <div>
      {/* 검색창 */}
      <div className='relative mb-8'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='국가명 검색 (예: 일본, Japan, JP)'
          className='w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-lg shadow-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label='검색어 지우기'
            className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800'
          >
            ✕
          </button>
        )}
      </div>

      {/* 결과 수 */}
      <p className='mb-4 text-sm text-gray-600'>
        {query ? `"${query}" 검색 결과 ${filtered.length}개` : `전체 ${deduped.length}개국`}
      </p>

      {/* 국가 목록 */}
      {filtered.length === 0 ? (
        <div className='py-20 text-center text-gray-400'>검색 결과가 없어요</div>
      ) : (
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((country) => {
            const alarmInfo = ALARM_LEVEL[country.alarm_lvl as keyof typeof ALARM_LEVEL];
            return (
              <button
                key={country.country_iso_alp2}
                onClick={() =>
                  router.push(`/alerts/${country.country_iso_alp2.toLowerCase()}`)
                }
                className='flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-shadow transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md active:bg-blue-100'
              >
                {country.flag_download_url && (
                  <img
                    src={country.flag_download_url}
                    alt={country.country_nm}
                    className='h-8 w-12 flex-shrink-0 rounded object-cover shadow-sm'
                  />
                )}
                <div className='min-w-0 flex-1'>
                  <div className='truncate font-semibold text-gray-900'>{country.country_nm}</div>
                  <div className='truncate text-sm text-gray-600'>{country.country_eng_nm}</div>
                </div>
                {alarmInfo && (
                  <span
                    className={`flex-shrink-0 rounded-full px-2 py-1 text-xs font-bold ${alarmInfo.bg} ${alarmInfo.text}`}
                  >
                    {country.alarm_lvl}단계
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
