'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const FirstAidHeader = () => {
  const { t } = useTranslation('common');
  return (
    <motion.header
      className='w-full bg-white shadow-sm'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.header>
  );
};
