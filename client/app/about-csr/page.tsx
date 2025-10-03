'use client';

import { FeaturesSection, Footer, HeroSection, VideoSection } from '@/app/about/_components';
import {
  defaultLanguage,
  getTranslations,
  isValidLanguage,
  supportedLanguages,
} from '@/app/about/_utils/translations';
import Navbar from '@/src/widgets/navbar/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function AboutCSRContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentLang, setCurrentLang] = useState(defaultLanguage);
  const [translations, setTranslations] = useState(getTranslations(defaultLanguage));

  useEffect(() => {
    const lang = searchParams.get('lang') || defaultLanguage;

    if (isValidLanguage(lang)) {
      setCurrentLang(lang);
      setTranslations(getTranslations(lang));
    } else {
      router.replace(`/about-csr?lang=${defaultLanguage}`);
    }
  }, [searchParams, router]);

  // 언어 변경 핸들러
  const handleLanguageChange = (newLang: string) => {
    if (isValidLanguage(newLang)) {
      router.push(`/about-csr?lang=${newLang}`);
    }
  };

  return (
    <div className='min-h-screen overflow-x-hidden md:pt-16'>
      <Navbar />

      {/* 언어 선택 버튼 */}
      <div className='fixed top-20 right-4 z-50 md:top-24'>
        <div className='flex gap-2'>
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                currentLang === lang
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <HeroSection translations={translations} />
      <FeaturesSection translations={translations} />
      <VideoSection translations={translations} />
      <Footer translations={translations} />
    </div>
  );
}

export default function AboutCSRPage() {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center bg-white'>
          <div className='text-lg text-gray-500'>Loading...</div>
        </div>
      }
    >
      <AboutCSRContent />
    </Suspense>
  );
}
