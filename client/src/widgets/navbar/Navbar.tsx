'use client';

import { useCheckIfLoggedInQuery } from '@/src/features/auth/api/checkIfLoggedIn';
import { AuthButton } from '@/src/features/auth/ui/AuthButton';
import { useProfileQuery } from '@/src/features/profile/api/useProfileQuery';

import { useHydration } from '@/src/shared/hooks/useHydration';
import { useTranslation } from '@/src/shared/lib/i18n';
import Dropdown from '@/src/shared/ui/Dropdown';
import { FaBars, FaChevronDown, FaTimes } from '@/src/shared/ui/icons';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isHydrated = useHydration();

  const getCurrentLanguage = () => {
    if (pathname.startsWith('/about')) {
      const langFromUrl = pathname.split('/')[2];
      return langFromUrl || 'en';
    }
    return i18n.language;
  };

  const currentLang = getCurrentLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

  const handleLanguageChange = async (langCode: string) => {
    setIsOpen(false);
    if (pathname.startsWith('/about')) {
      router.push(`/about/${langCode}`);
      return;
    }
    await i18n.loadLanguages(langCode);
    await i18n.changeLanguage(langCode);
  };

  const displayLanguage = isHydrated ? currentLanguage : languages[0];

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`언어 선택: ${displayLanguage.name}`}
        aria-expanded={isOpen}
        className='flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
      >
        <span className='text-xl'>{displayLanguage.flag}</span>
        <FaChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div className='fixed inset-0 z-10' onClick={() => setIsOpen(false)} />
          <Dropdown direction='bottom'>
            <div className='py-1'>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors duration-200 hover:bg-blue-50 ${
                    currentLang === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className='text-lg'>{language.flag}</span>
                  <span>{language.name}</span>
                </button>
              ))}
            </div>
          </Dropdown>
        </>
      )}
    </div>
  );
};

type NavTranslations = {
  home: string;
  about: string;
  news: string;
  translate: string;
  first_aid: string;
  hospital_pharmacy_nearby: string;
};

export default function Navbar({ navTranslations }: { navTranslations?: NavTranslations }) {
  const { t: i18nT } = useTranslation();
  const t = (key: keyof NavTranslations) => navTranslations?.[key] ?? i18nT(`navbar.${key}`);

  const { data: isLoggedIn } = useCheckIfLoggedInQuery();
  const { data: profile } = useProfileQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className='fixed top-0 right-0 left-0 z-50 bg-white font-semibold shadow-lg'>
      <div className='mx-auto px-6 md:px-10'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              aria-label='VitalTrip 홈으로 이동'
              className='flex items-center space-x-2'
            >
              <Image
                src='/VitalTrip.svg'
                alt='VitalTrip Logo'
                className='h-12 w-auto'
                width={48}
                height={48}
              />
            </Link>
          </div>

          <div className='hidden items-center space-x-8 font-bold md:flex'>
            <Link
              href='/'
              className='flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
            >
              <span>{t('home')}</span>
            </Link>
            <Link
              href='/about'
              className='flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
            >
              <span>{t('about')}</span>
            </Link>
            <Link
              href='/news/1'
              className='flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
            >
              <span>{t('news')}</span>
            </Link>
            <Link
              href='/translate'
              className='flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
            >
              <span>{t('translate')}</span>
            </Link>
            <Link
              href='/first-aid'
              className='flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
            >
              <span>{t('first_aid')}</span>
            </Link>
          </div>

          <div className='flex items-center justify-center gap-2 md:space-x-2'>
            <LanguageDropdown />
            {isLoggedIn && profile?.name && (
              <span className='text-lg font-semibold'>{profile.name}</span>
            )}
            <AuthButton closeMenu={closeMenu} mobileHidden={true} />
          </div>

          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={isMenuOpen}
              className='rounded-md p-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className='border-t border-gray-200 md:hidden'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ overflow: 'hidden' }}
            >
              <motion.div
                className='space-y-1 px-2 pt-2 pb-3'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link
                  href='/'
                  onClick={closeMenu}
                  className='flex items-center justify-center space-x-2 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
                >
                  <span>{t('hospital_pharmacy_nearby')}</span>
                </Link>
                <Link
                  href='/about'
                  onClick={closeMenu}
                  className='flex items-center justify-center space-x-2 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
                >
                  <span>{t('about')}</span>
                </Link>
                <Link
                  href='/news/1'
                  onClick={closeMenu}
                  className='flex items-center justify-center space-x-2 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
                >
                  <span>{t('news')}</span>
                </Link>
                <Link
                  href='/translate'
                  onClick={closeMenu}
                  className='flex items-center justify-center space-x-2 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
                >
                  <span>{t('translate')}</span>
                </Link>
                <Link
                  href='/first-aid'
                  onClick={closeMenu}
                  className='flex items-center justify-center space-x-2 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
                >
                  <span>{t('first_aid')}</span>
                </Link>
                <div className='flex items-center justify-center gap-4'>
                  <LanguageDropdown />
                  <AuthButton closeMenu={closeMenu} mobileHidden={false} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
