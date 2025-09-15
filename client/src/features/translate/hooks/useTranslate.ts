'use client';

import { useEffect, useRef, useState } from 'react';

export interface Language {
  language: string;
  name: string;
}

export interface UseTranslateReturn {
  languages: Language[];
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
  translatedText: string;
  detectedLang: string;
  isTranslating: boolean;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  setSourceText: (text: string) => void;
  handleTranslate: () => Promise<void>;
  swapLanguages: () => void;
  getLanguageName: (code: string) => string;
  filterLanguages: (query: string) => Language[];
}

export function useTranslate(): UseTranslateReturn {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [detectedLang, setDetectedLang] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch('/api/translate');
        const data = await res.json();
        if (Array.isArray(data))
          setLanguages([{ language: 'auto', name: 'Detect Language' }, ...data]);
      } catch {
        console.error('언어 목록 조회 실패');
      }
    };
    fetchLanguages();
  }, []);


  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          target: targetLanguage,
          source: sourceLanguage === 'auto' ? undefined : sourceLanguage,
        }),
      });

      const data = await res.json();
      setTranslatedText(data.translatedText);
      if (sourceLanguage === 'auto') {
        setDetectedLang(data.detectedSourceLanguage);
      }
    } catch {
      console.error('번역 요청 실패');
      setTranslatedText('번역에 실패했습니다.');
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    if (sourceLanguage !== 'auto') {
      const temp = sourceLanguage;
      setSourceLanguage(targetLanguage);
      setTargetLanguage(temp);
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  const getLanguageName = (code: string) => {
    return languages.find((lang) => lang.language === code)?.name || code;
  };

  const filterLanguages = (query: string) => {
    return languages.filter((lang) =>
      lang.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return {
    languages,
    sourceLanguage,
    targetLanguage,
    sourceText,
    translatedText,
    detectedLang,
    isTranslating,
    setSourceLanguage,
    setTargetLanguage,
    setSourceText,
    handleTranslate,
    swapLanguages,
    getLanguageName,
    filterLanguages,
  };
}