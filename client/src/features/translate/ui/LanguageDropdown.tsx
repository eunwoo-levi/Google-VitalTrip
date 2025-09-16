import { useEffect, useRef, useState } from 'react';
import { Language } from '../hooks/useTranslate';

interface LanguageDropdownProps {
  languages: Language[];
  selectedLanguage: string;
  isSource?: boolean;
  onSelect: (language: string) => void;
  getLanguageName: (code: string) => string;
  filterLanguages: (query: string) => Language[];
}

export function LanguageDropdown({
  languages,
  selectedLanguage,
  isSource = false,
  onSelect,
  getLanguageName,
  filterLanguages,
}: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayLanguages = isSource
    ? filterLanguages(searchQuery)
    : filterLanguages(searchQuery).filter((lang) => lang.language !== 'auto');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative w-full sm:w-auto sm:flex-1' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-red-300 hover:bg-red-50'
      >
        <span className='flex items-center'>
          {selectedLanguage === 'auto' && isSource && (
            <svg
              className='mr-1.5 h-4 w-4 text-red-500'
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
          {getLanguageName(selectedLanguage)}
        </span>
        <svg
          className='h-4 w-4 text-gray-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {isOpen && (
        <div className='absolute left-0 z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg'>
          <div className='sticky top-0 z-10 bg-white'>
            <input
              type='text'
              placeholder='Search language...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full border-b border-gray-200 px-4 py-3 focus:border-red-300 focus:ring-red-300 focus:outline-none'
            />
          </div>
          <ul className='max-h-60 overflow-y-auto'>
            {displayLanguages.map((lang) => (
              <li
                key={`${isSource ? 'source' : 'target'}-${lang.language}`}
                onClick={() => {
                  onSelect(lang.language);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors hover:bg-red-50 ${
                  selectedLanguage === lang.language
                    ? 'bg-red-100 font-medium text-red-700'
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
  );
}
