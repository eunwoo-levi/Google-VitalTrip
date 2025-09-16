import { aboutTranslations } from '../_data/aboutTranslation';

export type Language = keyof typeof aboutTranslations;

export const supportedLanguages: Language[] = ['en', 'ko'];
export const defaultLanguage: Language = 'en';

export function isValidLanguage(lang: string): lang is Language {
  return supportedLanguages.includes(lang as Language);
}

export function getTranslations(lang: string) {
  if (isValidLanguage(lang)) {
    return aboutTranslations[lang];
  }
  return aboutTranslations[defaultLanguage];
}
