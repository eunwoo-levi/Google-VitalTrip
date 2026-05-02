'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { ALARM_LEVEL, TravelAlertItem } from '../types/travelAlert';
import { CountrySearchClient } from './CountrySearchClient';

interface Props {
  countries: TravelAlertItem[];
  levelCounts: Record<string, number>;
}

export const AlertsPageClient = ({ countries, levelCounts }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen bg-slate-50'>
      <header className='w-full bg-white shadow-sm'>
        <div className='mx-auto max-w-5xl px-6 py-5'>
          <div className='flex items-center gap-3'>
            <Link href='/' aria-label='VitalTrip'>
              <Image src='/VitalTrip.svg' alt='VitalTrip' width={40} height={40} className='h-10 w-auto' />
            </Link>
            <span className='text-lg font-semibold text-gray-700'>{t('travelAlert.header_title')}</span>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-5xl px-6 py-10 pb-[100px]'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>{t('travelAlert.page_title')}</h1>
          <p className='mt-2 text-gray-600'>{t('travelAlert.page_description', { count: countries.length })}</p>
        </div>

        <div className='mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {Object.entries(ALARM_LEVEL).map(([level, { bg, text, border }]) => (
            <div key={level} className={`rounded-xl border-2 ${border} ${bg} p-4 text-center`}>
              <div className={`text-2xl font-bold ${text}`}>{levelCounts[level] ?? 0}</div>
              <div className={`text-sm font-medium ${text}`}>
                {t('travelAlert.level_count', { level })} · {t(`travelAlert.alarm_levels.${level}`)}
              </div>
            </div>
          ))}
        </div>

        <CountrySearchClient countries={countries} />
      </main>
    </div>
  );
};
