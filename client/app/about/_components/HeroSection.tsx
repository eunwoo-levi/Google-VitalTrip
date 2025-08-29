'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden md:h-screen md:items-start'>
      <Image
        src='/landing-image.webp'
        alt='VitalTrip Landing Image'
        className='absolute inset-0 object-cover'
        fill
        priority
      />
      <div className='absolute inset-0 bg-black/70' />
      <div className='relative z-10 w-full max-w-4xl px-4 text-center text-white md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='mb-6'
        >
          <Image
            src='/VitalTrip.svg'
            alt='VitalTrip Logo'
            width={100}
            height={100}
            className='h-auto w-auto'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className='mb-8'
        >
          <p className='mb-4 text-xl font-semibold text-blue-100 md:text-2xl'>
            {t('about.hero.tagline')}
          </p>
          <p className='mx-auto max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl'>
            {t('about.hero.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className='flex flex-wrap justify-center gap-4 md:mb-10'
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className='inline-block'
        >
          <Link
            href='/'
            className='cursor-pointer rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
          >
            {t('about.hero.cta_button')}
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 transform'
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='flex h-10 w-6 justify-center rounded-full border-2 border-white/50'
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className='mt-2 h-3 w-1 rounded-full bg-white/70'
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
