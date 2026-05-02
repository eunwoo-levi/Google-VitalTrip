'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { ALARM_LEVEL, TravelAlertItem } from '../types/travelAlert';
import { TravelAlertContent } from './TravelAlertContent';

interface Props {
  items: TravelAlertItem[];
}

export const TravelAlertCountryClient = ({ items }: Props) => {
  const { t } = useTranslation();
  const country = items[0];
  const alarmInfo = ALARM_LEVEL[country.alarm_lvl as keyof typeof ALARM_LEVEL];

  return (
    <div className='min-h-screen bg-slate-50'>
      <header className='w-full bg-white shadow-sm'>
        <div className='mx-auto max-w-4xl px-6 py-5'>
          <div className='flex items-center gap-3'>
            <Link href='/' aria-label='VitalTrip'>
              <Image
                src='/VitalTrip.svg'
                alt='VitalTrip'
                width={40}
                height={40}
                className='h-10 w-auto'
              />
            </Link>
            <span className='text-lg font-semibold text-gray-700'>
              {t('travelAlert.header_title')}
            </span>
          </div>
        </div>
      </header>

      <main className='mx-auto max-w-4xl px-6 py-10 pb-[100px]'>
        <div className='mb-8 overflow-hidden rounded-2xl bg-white shadow-xl'>
          <div className='flex items-center gap-6 p-8'>
            {country.flag_download_url && (
              <Image
                src={country.flag_download_url}
                alt={`${country.country_eng_nm} flag`}
                width={96}
                height={64}
                className='rounded-lg object-cover shadow-md'
              />
            )}
            <div>
              <p className='text-sm text-gray-600'>{country.continent_eng_nm}</p>
              <h1 className='text-3xl font-bold text-gray-900'>{country.country_eng_nm}</h1>
              <p className='text-lg text-gray-600'>{country.country_nm}</p>
            </div>
          </div>
        </div>

        <TravelAlertContent items={items} alarmInfo={alarmInfo} />
      </main>
    </div>
  );
};
