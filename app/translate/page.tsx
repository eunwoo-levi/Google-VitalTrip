'use client';

import { useEffect, useRef, useState } from 'react';

export default function TranslatePage() {
  const [languages, setLanguages] = useState<{ language: string; name: string }[]>([]);
  const [target, setTarget] = useState('en');
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [detectedLang, setDetectedLang] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await fetch('/api/translate');
      const data = await res.json();
      if (Array.isArray(data)) setLanguages(data);
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTranslate = async () => {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, target }),
    });

    const data = await res.json();
    setTranslated(data.translatedText);
    setDetectedLang(data.detectedSourceLanguage);
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedLangName =
    languages.find((lang) => lang.language === target)?.name || 'Select language';

  return (
    <main className='min-h-screen bg-gray-50 px-4 py-10 font-sans'>
      <div className='mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-md'>
        <h1 className='mb-6 text-center text-3xl font-bold text-indigo-700'>🌐 AI Translator</h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Type something to translate in your language...'
          className='w-full resize-y rounded-lg border border-gray-300 p-4 text-base focus:ring-2 focus:ring-indigo-400 focus:outline-none'
          rows={4}
        />

        <div className='relative mt-6' ref={dropdownRef}>
          <label className='mb-1 block font-medium text-gray-700'>Target Language:</label>
          <div
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className='w-full cursor-pointer rounded-md border border-gray-300 bg-white p-3 hover:bg-gray-50'
          >
            {selectedLangName}
          </div>

          {isDropdownOpen && (
            <div className='absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg'>
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
                    key={lang.language}
                    onClick={() => {
                      setTarget(lang.language);
                      setIsDropdownOpen(false);
                      setSearchQuery('');
                    }}
                    className='cursor-pointer px-3 py-2 text-sm hover:bg-indigo-100'
                  >
                    {lang.name}
                  </li>
                ))}
                {filteredLanguages.length === 0 && (
                  <li className='px-3 py-2 text-sm text-gray-500'>No matches found</li>
                )}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={handleTranslate}
          className='mt-6 w-full cursor-pointer rounded-md bg-indigo-600 py-3 text-lg text-white transition hover:bg-indigo-700'
        >
          Translate
        </button>

        {translated && (
          <div className='mt-10 rounded-lg bg-indigo-50 p-6 shadow-inner'>
            <h2 className='mb-2 text-xl font-semibold text-indigo-800'>Translation Result</h2>
            <p className='text-lg text-gray-800'>{translated}</p>
            <p className='mt-2 text-sm text-gray-600'>
              Detected language: <strong>{detectedLang}</strong>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
