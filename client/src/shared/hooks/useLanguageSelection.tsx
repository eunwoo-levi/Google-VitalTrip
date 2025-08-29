'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import { useOverlay } from '@vitaltrip/shared';
import { useEffect, useState } from 'react';

const LANGUAGE_PREFERENCE_KEY = 'i18nextLng';

export const useLanguageSelection = () => {
  const { i18n } = useTranslation();
  const [hasLanguagePreference, setHasLanguagePreference] = useState<boolean | null>(null);
  const overlay = useOverlay({ closeOnEscape: false, autoOpen: false });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userSetLanguage = localStorage.getItem('user-set-language');
    const savedLanguage = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);

    console.log('User set language:', userSetLanguage);
    console.log('Saved language:', savedLanguage);

    if (!userSetLanguage) {
      console.log('No user set language, opening modal');
      setHasLanguagePreference(false);
      overlay.open();
    } else {
      console.log('Found user set language:', userSetLanguage);
      setHasLanguagePreference(true);
    }
  }, [overlay]);

  const selectLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode).then(() => {
      window.dispatchEvent(new Event('languageChanged'));
    });
    localStorage.setItem('user-set-language', 'true');
    setHasLanguagePreference(true);
    overlay.close();
  };

  return {
    isLanguageSelectionOpen: overlay.isOpen && hasLanguagePreference === false,
    selectLanguage,
    renderLanguageSelection: overlay.render,
  };
};
