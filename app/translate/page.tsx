'use client';

import { useEffect, useRef, useState } from 'react';

export default function TranslatePage() {
  const [languages, setLanguages] = useState<{ language: string; name: string }[]>([]);
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [detectedLang, setDetectedLang] = useState('');
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const sourceDropdownRef = useRef<HTMLDivElement>(null);
  const targetDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch('/api/translate');
        const data = await res.json();
        if (Array.isArray(data))
          setLanguages([{ language: 'auto', name: 'Detect Language' }, ...data]);
      } catch (error) {
        // 보안상 상세한 에러 정보는 로깅하지 않음
        console.error('언어 목록 조회 실패');
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(e.target as Node)) {
        setIsSourceDropdownOpen(false);
      }
      if (targetDropdownRef.current && !targetDropdownRef.current.contains(e.target as Node)) {
        setIsTargetDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    } catch (error) {
      // 보안상 상세한 에러 정보는 로깅하지 않음
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

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getLanguageName = (code: string) => {
    return languages.find((lang) => lang.language === code)?.name || code;
  };

  return (
    <main className='flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-gray-50 px-4 py-8'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='mb-6 flex items-center gap-3'>
          <img src='/VitalTrip.svg' alt='VitalTrip Logo' className='mt-1 ml-1 h-12 w-auto' />
          <h1 className='text-2xl font-semibold text-gray-800'>AI Translator</h1>
        </div>

        <div className='mb-6 rounded-xl bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg'>
          <div className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
            <div className='relative w-full sm:w-auto sm:flex-1' ref={sourceDropdownRef}>
              <button
                onClick={() => setIsSourceDropdownOpen((prev) => !prev)}
                className='flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50'
              >
                <span className='flex items-center'>
                  {sourceLanguage === 'auto' && (
                    <svg
                      className='mr-1.5 h-4 w-4 text-blue-500'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                      />
                    </svg>
                  )}
                  {getLanguageName(sourceLanguage)}
                </span>
                <svg
                  className='h-4 w-4 text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>

              {isSourceDropdownOpen && (
                <div className='absolute left-0 z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg'>
                  <div className='sticky top-0 z-10 bg-white'>
                    <input
                      type='text'
                      placeholder='Search language...'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className='w-full border-b border-gray-200 px-4 py-3 focus:border-blue-300 focus:ring-blue-300 focus:outline-none'
                    />
                  </div>
                  <ul className='max-h-60 overflow-y-auto'>
                    {filteredLanguages.map((lang) => (
                      <li
                        key={`source-${lang.language}`}
                        onClick={() => {
                          setSourceLanguage(lang.language);
                          setIsSourceDropdownOpen(false);
                          setSearchQuery('');
                        }}
                        className={`cursor-pointer px-4 py-2.5 text-sm transition-colors hover:bg-blue-50 ${sourceLanguage === lang.language
                          ? 'bg-blue-100 font-medium text-blue-700'
                          : 'text-gray-700'
                          }`}
                      >
                        {lang.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={swapLanguages}
              className={`mx-2 rounded-full p-2.5 transition-all ${sourceLanguage === 'auto'
                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                : 'text-blue-600 hover:bg-blue-100 active:bg-blue-200'
                }`}
              disabled={sourceLanguage === 'auto'}
              title={sourceLanguage === 'auto' ? "Can't swap with auto-detect" : 'Swap languages'}
            >
              <svg
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                />
              </svg>
            </button>

            <div className='relative w-full sm:w-auto sm:flex-1' ref={targetDropdownRef}>
              <button
                onClick={() => setIsTargetDropdownOpen((prev) => !prev)}
                className='flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50'
              >
                <span>{getLanguageName(targetLanguage)}</span>
                <svg
                  className='h-4 w-4 text-gray-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>

              {isTargetDropdownOpen && (
                <div className='absolute left-0 z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg'>
                  <div className='sticky top-0 z-10 bg-white'>
                    <input
                      type='text'
                      placeholder='Search language...'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className='w-full border-b border-gray-200 px-4 py-3 focus:border-blue-300 focus:ring-blue-300 focus:outline-none'
                    />
                  </div>
                  <ul className='max-h-60 overflow-y-auto'>
                    {filteredLanguages
                      .filter((lang) => lang.language !== 'auto')
                      .map((lang) => (
                        <li
                          key={`target-${lang.language}`}
                          onClick={() => {
                            setTargetLanguage(lang.language);
                            setIsTargetDropdownOpen(false);
                            setSearchQuery('');
                          }}
                          className={`cursor-pointer px-4 py-2.5 text-sm transition-colors hover:bg-blue-50 ${targetLanguage === lang.language
                            ? 'bg-blue-100 font-medium text-blue-700'
                            : 'text-gray-700'
                            }`}
                        >
                          {lang.name}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='mb-20 flex flex-col gap-6 lg:mb-0 lg:flex-row'>
          <div className='flex-1 overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <div className='border-b border-gray-100 p-4'>
              <div className='flex items-center justify-between'>
                <span className='flex items-center text-sm font-medium text-gray-700'>
                  {sourceLanguage === 'auto' && (
                    <svg
                      className='mr-1.5 h-4 w-4 text-blue-500'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                      />
                    </svg>
                  )}
                  {getLanguageName(sourceLanguage)}
                </span>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => setSourceText('')}
                    className={`rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 ${!sourceText ? 'invisible' : ''
                      }`}
                    title='Clear text'
                  >
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder='Enter text to translate...'
              className='h-[250px] w-full resize-none bg-transparent p-4 text-gray-800 focus:outline-none'
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleTranslate();
                }
              }}
            />
            <div className='border-t border-gray-100 p-4'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                <span className='mb-2 text-xs text-gray-500 sm:mb-0'>
                  {sourceText.length} characters
                  <span className='ml-1 text-xs text-gray-400'>
                    (Press Ctrl+Enter to translate)
                  </span>
                </span>
                <button
                  onClick={handleTranslate}
                  disabled={isTranslating || !sourceText.trim()}
                  className={`rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${isTranslating || !sourceText.trim()
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:shadow'
                    }`}
                >
                  {isTranslating ? (
                    <span className='flex items-center justify-center'>
                      <svg
                        className='mr-2 h-4 w-4 animate-spin'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Translating...
                    </span>
                  ) : (
                    'Translate'
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className='flex-1 overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <div className='border-b border-gray-100 p-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-700'>
                  {getLanguageName(targetLanguage)}
                  {sourceLanguage === 'auto' && detectedLang && translatedText && (
                    <span className='ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600'>
                      Detected: {getLanguageName(detectedLang)}
                    </span>
                  )}
                </span>
                <div className='flex items-center space-x-2'>
                  {translatedText && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(translatedText);
                      }}
                      className='group relative rounded p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600'
                      title='Copy to clipboard'
                    >
                      <svg
                        className='h-4 w-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
                        />
                      </svg>
                      <span className='absolute -bottom-8 left-1/2 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
                        Copied!
                      </span>
                    </button>
                  )}
                  {translatedText && (
                    <button
                      onClick={() => {
                        const utterance = new SpeechSynthesisUtterance(translatedText);
                        utterance.lang = targetLanguage;
                        window.speechSynthesis.speak(utterance);
                      }}
                      className='rounded p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600'
                      title='Listen'
                    >
                      <svg
                        className='h-4 w-4'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z'
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className='h-[250px] overflow-y-auto p-4'>
              {isTranslating ? (
                <div className='flex h-full items-center justify-center'>
                  <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600'></div>
                </div>
              ) : translatedText ? (
                <p className='whitespace-pre-wrap text-gray-800'>{translatedText}</p>
              ) : (
                <div className='flex h-full flex-col items-center justify-center text-center text-gray-400'>
                  <svg
                    className='mb-2 h-12 w-12 text-gray-300'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d='M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129'
                    />
                  </svg>
                  <p>Translation will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
