'use client';

import { useTranslate } from '@/src/features/translate/hooks/useTranslate';
import { LanguageSelector } from '@/src/features/translate/ui/LanguageSelector';
import { TranslateHeader } from '@/src/features/translate/ui/TranslateHeader';
import { TranslateInput } from '@/src/features/translate/ui/TranslateInput';
import { TranslateOutput } from '@/src/features/translate/ui/TranslateOutput';

export default function TranslatePage() {
  const {
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
  } = useTranslate();

  return (
    <main className='flex min-h-screen flex-col bg-gradient-to-b from-red-50 to-gray-50 px-4 py-8'>
      <div className='mx-auto w-full max-w-7xl'>
        <TranslateHeader />

        <LanguageSelector
          languages={languages}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          onSourceLanguageChange={setSourceLanguage}
          onTargetLanguageChange={setTargetLanguage}
          onSwapLanguages={swapLanguages}
          getLanguageName={getLanguageName}
          filterLanguages={filterLanguages}
        />

        <div className='mb-20 flex flex-col gap-6 lg:mb-0 lg:flex-row'>
          <TranslateInput
            sourceText={sourceText}
            sourceLanguage={sourceLanguage}
            isTranslating={isTranslating}
            onTextChange={setSourceText}
            onTranslate={handleTranslate}
            onClear={() => setSourceText('')}
            getLanguageName={getLanguageName}
          />
          <TranslateOutput
            translatedText={translatedText}
            targetLanguage={targetLanguage}
            sourceLanguage={sourceLanguage}
            detectedLang={detectedLang}
            isTranslating={isTranslating}
            getLanguageName={getLanguageName}
          />
        </div>
      </div>
    </main>
  );
}
