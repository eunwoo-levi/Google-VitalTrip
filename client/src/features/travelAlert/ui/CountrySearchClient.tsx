'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ALARM_LEVEL, TravelAlertItem } from '../types/travelAlert';

interface Props {
  countries: TravelAlertItem[];
}

export const CountrySearchClient = ({ countries }: Props) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

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
      <div className='relative mb-8'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('travelAlert.search_placeholder')}
          className='w-full rounded-2xl border border-gray-200 bg-white px-6 py-4 text-lg shadow-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label={t('common.close')}
            className='absolute top-1/2 right-5 -translate-y-1/2 text-gray-600 hover:text-gray-800'
          >
            ✕
          </button>
        )}
      </div>

      <p className='mb-4 text-sm text-gray-600'>
        {query
          ? t('travelAlert.search_results', { query, count: filtered.length })
          : t('travelAlert.total_countries', { count: deduped.length })}
      </p>

      {filtered.length === 0 ? (
        <div className='py-20 text-center text-gray-400'>{t('travelAlert.no_results')}</div>
      ) : (
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((country) => {
            const alarmInfo = ALARM_LEVEL[country.alarm_lvl as keyof typeof ALARM_LEVEL];
            return (
              <button
                key={country.country_iso_alp2}
                onClick={() => router.push(`/alerts/${country.country_iso_alp2.toLowerCase()}`)}
                className='flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-colors transition-shadow duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md active:bg-blue-100'
              >
                {country.flag_download_url && (
                  <Image
                    src={country.flag_download_url}
                    alt={country.country_nm}
                    width={48}
                    height={32}
                    className='flex-shrink-0 rounded object-cover shadow-sm'
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
                    {t('travelAlert.level_label', { level: country.alarm_lvl })}
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
