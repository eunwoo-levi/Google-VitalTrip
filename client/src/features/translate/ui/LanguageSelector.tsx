import { LanguageDropdown } from './LanguageDropdown';
import { Language } from '../hooks/useTranslate';

interface LanguageSelectorProps {
  languages: Language[];
  sourceLanguage: string;
  targetLanguage: string;
  onSourceLanguageChange: (lang: string) => void;
  onTargetLanguageChange: (lang: string) => void;
  onSwapLanguages: () => void;
  getLanguageName: (code: string) => string;
  filterLanguages: (query: string) => Language[];
}

export function LanguageSelector({
  languages,
  sourceLanguage,
  targetLanguage,
  onSourceLanguageChange,
  onTargetLanguageChange,
  onSwapLanguages,
  getLanguageName,
  filterLanguages,
}: LanguageSelectorProps) {
  return (
    <div className='mb-6 rounded-xl bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg'>
      <div className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
        <LanguageDropdown
          languages={languages}
          selectedLanguage={sourceLanguage}
          isSource={true}
          onSelect={onSourceLanguageChange}
          getLanguageName={getLanguageName}
          filterLanguages={filterLanguages}
        />

        <button
          onClick={onSwapLanguages}
          className={`mx-2 rounded-full p-2.5 transition-all ${
            sourceLanguage === 'auto'
              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : 'text-red-600 hover:bg-red-100 active:bg-red-200'
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

        <LanguageDropdown
          languages={languages}
          selectedLanguage={targetLanguage}
          isSource={false}
          onSelect={onTargetLanguageChange}
          getLanguageName={getLanguageName}
          filterLanguages={filterLanguages}
        />
      </div>
    </div>
  );
}
