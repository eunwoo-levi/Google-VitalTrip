interface TranslateOutputProps {
  translatedText: string;
  targetLanguage: string;
  sourceLanguage: string;
  detectedLang: string;
  isTranslating: boolean;
  getLanguageName: (code: string) => string;
}

export function TranslateOutput({
  translatedText,
  targetLanguage,
  sourceLanguage,
  detectedLang,
  isTranslating,
  getLanguageName,
}: TranslateOutputProps) {
  return (
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
                className='group relative rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600'
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
                className='rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600'
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
            <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-600'></div>
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
  );
}
