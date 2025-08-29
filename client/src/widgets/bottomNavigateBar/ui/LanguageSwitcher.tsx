'use client';

import { useTranslation } from '@/src/shared/lib/i18n';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
] as const;

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='flex gap-2'>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`rounded-md px-3 py-1 text-sm whitespace-nowrap transition-colors ${
            i18n.language === lang.code
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <div className='flex flex-col items-center gap-1'>
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
