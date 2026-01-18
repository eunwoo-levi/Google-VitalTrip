'use client';

import { useLanguageSelection } from '@/src/shared/hooks/useLanguageSelection';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
] as const;

export const LanguageSelectionModal = () => {
  const { isLanguageSelectionOpen, selectLanguage, renderLanguageSelection } =
    useLanguageSelection();

  const pathname = usePathname();

  if (!isLanguageSelectionOpen || pathname.startsWith('/triage')) return null;

  return renderLanguageSelection(
    <div className='text-center'>
      <div className='mb-6'>
        <div className='mb-4 flex justify-center'>
          <Image
            src='/VitalTrip.svg'
            alt='VitalTrip Logo'
            width={80}
            height={80}
            className='h-auto w-auto'
            priority
          />
        </div>
        <h2 className='mb-2 text-2xl font-bold text-gray-800'>Welcome to VitalTrip</h2>
        <p className='mb-6 text-gray-600'>Please select your preferred language</p>
      </div>

      <div className='flex min-w-[280px] flex-col gap-3'>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => selectLanguage(language.code)}
            className='flex items-center justify-center gap-3 rounded-lg border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            <span className='text-2xl'>{language.flag}</span>
            <span className='text-lg font-medium text-gray-700'>{language.name}</span>
          </button>
        ))}
      </div>

      <p className='mt-4 text-xs text-gray-500'>You can change this setting anytime in the menu</p>
    </div>,
  );
};
