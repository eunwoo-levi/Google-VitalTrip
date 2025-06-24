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
        console.error('Failed to fetch languages:', error);
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
      console.error('Translation failed:', error);
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
    <main className='flex min-h-screen flex-col bg-gray-50 px-4 py-8'>
      <div className='mx-auto w-full max-w-7xl'>
        <h1 className='mb-6 text-2xl font-bold text-gray-800'>Translation</h1>

        <div className='mt-10 mb-4 flex items-center rounded-lg bg-white p-3 shadow'>
          <div className='relative mr-2 flex-1' ref={sourceDropdownRef}>
            <button
              onClick={() => setIsSourceDropdownOpen((prev) => !prev)}
              className='flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100'
            >
              <span>{getLanguageName(sourceLanguage)}</span>
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
              <div className='absolute left-0 z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg'>
                <input
                  type='text'
                  placeholder='Search language...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full border-b border-gray-200 px-3 py-2 focus:outline-none'
                />
                <ul className='max-h-48 overflow-y-auto'>
                  {filteredLanguages.map((lang) => (
                    <li
                      key={`source-${lang.language}`}
                      onClick={() => {
                        setSourceLanguage(lang.language);
                        setIsSourceDropdownOpen(false);
                        setSearchQuery('');
                      }}
                      className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${
                        sourceLanguage === lang.language ? 'bg-blue-50 text-blue-600' : ''
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
            className='mx-2 rounded-full p-2 hover:bg-gray-100'
            disabled={sourceLanguage === 'auto'}
          >
            <svg
              className='h-5 w-5 text-gray-600'
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

          <div className='relative flex-1' ref={targetDropdownRef}>
            <button
              onClick={() => setIsTargetDropdownOpen((prev) => !prev)}
              className='flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100'
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
              <div className='absolute left-0 z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg'>
                <input
                  type='text'
                  placeholder='Search language...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full border-b border-gray-200 px-3 py-2 focus:outline-none'
                />
                <ul className='max-h-48 overflow-y-auto'>
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
                        className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${
                          targetLanguage === lang.language ? 'bg-blue-50 text-blue-600' : ''
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

        <div className='mb-20 flex flex-col gap-4 lg:mb-0 lg:flex-row'>
          <div className='flex-1 rounded-lg bg-white shadow'>
            <div className='border-b border-gray-100 p-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-500'>
                  {getLanguageName(sourceLanguage)}
                </span>
                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => setSourceText('')}
                    className={`rounded p-1 text-gray-400 hover:bg-gray-100 ${
                      !sourceText ? 'invisible' : ''
                    }`}
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
              className='h-[200px] w-full resize-none bg-transparent p-4 focus:outline-none'
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleTranslate();
                }
              }}
            />
            <div className='border-t border-gray-100 p-3'>
              <div className='flex justify-between'>
                <span className='text-xs text-gray-400'>{sourceText.length} characters</span>
                <button
                  onClick={handleTranslate}
                  disabled={isTranslating || !sourceText.trim()}
                  className={`rounded-md bg-blue-600 px-4 py-1 text-sm text-white transition hover:bg-blue-700 ${
                    isTranslating || !sourceText.trim() ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  {isTranslating ? 'Translating...' : 'Translate'}
                </button>
              </div>
            </div>
          </div>

          {/* Target Text Area */}
          <div className='flex-1 rounded-lg bg-white shadow'>
            <div className='border-b border-gray-100 p-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-500'>
                  {getLanguageName(targetLanguage)}
                  {sourceLanguage === 'auto' && detectedLang && translatedText && (
                    <span className='ml-2 text-xs text-gray-400'>
                      (Detected: {getLanguageName(detectedLang)})
                    </span>
                  )}
                </span>
                <div className='flex items-center space-x-2'>
                  {translatedText && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(translatedText);
                      }}
                      className='rounded p-1 text-gray-400 hover:bg-gray-100'
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
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className='h-[200px] overflow-y-auto p-4'>
              {isTranslating ? (
                <div className='flex h-full items-center justify-center'>
                  <div className='h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600'></div>
                </div>
              ) : translatedText ? (
                <p className='whitespace-pre-wrap text-gray-800'>{translatedText}</p>
              ) : (
                <p className='text-center text-gray-400'>Translation will appear here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
