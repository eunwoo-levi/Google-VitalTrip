'use client';
import { useHydration } from '@/src/shared/hooks/useHydration';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const FirstAidHeader = () => {
  const { t } = useTranslation('common');
  const hydrated = useHydration();

  if (!hydrated) {
    return (
      <header className='w-full bg-white shadow-sm'>
        <div className='mx-auto w-full max-w-7xl px-6 py-5'>
          <div className='mb-2 flex items-center gap-3'>
            <Link href='/'>
              <Image
                src='/VitalTrip.svg'
                alt='VitalTrip'
                width={48}
                height={48}
                className='h-12 w-auto'
              />
            </Link>
            <h1 className='text-2xl font-semibold text-gray-900'>AI First Aid</h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className='animate-fade-in-down w-full bg-white shadow-sm'>
      <div className='mx-auto w-full max-w-7xl px-6 py-5'>
        <div className='mb-2 flex items-center gap-3'>
          <Link href='/'>
            <Image
              src='/VitalTrip.svg'
              alt='VitalTrip'
              width={48}
              height={48}
              className='h-12 w-auto'
            />
          </Link>
          <h1 className='text-2xl font-semibold text-gray-900'>{t('navbar.first_aid')}</h1>
        </div>
      </div>
    </header>
  );
};
