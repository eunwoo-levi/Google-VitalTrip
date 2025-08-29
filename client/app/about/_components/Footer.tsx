'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 py-8 text-white'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Image
                src='/VitalTrip.svg'
                alt='VitalTrip Logo'
                width={48}
                height={48}
                className='h-12 w-auto'
              />
            </div>
            <p className='leading-relaxed text-gray-300'>
              {t('footer.tagline')} <br />
              {t('footer.description')}
            </p>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-blue-400'>{t('footer.features_title')}</h3>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <Link href='/' className='transition-colors duration-200 hover:text-blue-400'>
                  {t('navbar.hospital_pharmacy_nearby')}
                </Link>
              </li>
              <li>
                <Link
                  href='/translate'
                  className='transition-colors duration-200 hover:text-blue-400'
                >
                  {t('footer.medical_translation')}
                </Link>
              </li>
              <li>
                <Link href='/' className='transition-colors duration-200 hover:text-blue-400'>
                  {t('footer.ai_first_aid_assistant')}
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-blue-400'>{t('footer.contact_title')}</h3>
            <div className='flex flex-col gap-2 space-x-4'>
              <a
                href='mailto:eunwoo1341@gmail.com'
                className='flex items-center space-x-2 text-gray-300 transition-colors duration-200 hover:text-blue-400'
              >
                <FaEnvelope size={18} />
                <span>{t('footer.contact_us')}</span>
              </a>
              <span>eunwoo1341@gmail.com</span>
            </div>
          </div>
        </div>

        <div className='mt-6 border-t border-gray-700 pt-6'>
          <div className='text-center text-sm text-gray-400'>
            © {currentYear} {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
}
