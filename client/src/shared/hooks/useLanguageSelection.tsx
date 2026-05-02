'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import { useOverlay } from '@vitaltrip/shared';
import { useEffect, useState } from 'react';

export const useLanguageSelection = () => {
  const { i18n } = useTranslation();
  const [hasLanguagePreference, setHasLanguagePreference] = useState<boolean | null>(null);
  const overlay = useOverlay({ closeOnEscape: false, autoOpen: false });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userSetLanguage = localStorage.getItem('user-set-language');

    if (!userSetLanguage) {
      setHasLanguagePreference(false);
      overlay.open();
    } else {
      setHasLanguagePreference(true);
    }
  }, [overlay]);

  const selectLanguage = async (languageCode: string) => {
    localStorage.setItem('user-set-language', 'true');
    setHasLanguagePreference(true);
    overlay.close();
    await i18n.loadLanguages(languageCode);
    await i18n.changeLanguage(languageCode);
  };

  return {
    isLanguageSelectionOpen: overlay.isOpen && hasLanguagePreference === false,
    selectLanguage,
    renderLanguageSelection: overlay.render,
  };
};
