interface TranslateInputProps {
  sourceText: string;
  sourceLanguage: string;
  isTranslating: boolean;
  onTextChange: (text: string) => void;
  onTranslate: () => void;
  onClear: () => void;
  getLanguageName: (code: string) => string;
}

export function TranslateInput({
  sourceText,
  sourceLanguage,
  isTranslating,
  onTextChange,
  onTranslate,
  onClear,
  getLanguageName,
}: TranslateInputProps) {
  return (
    <div className='flex-1 overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-lg'>
      <div className='border-b border-gray-100 p-4'>
        <div className='flex items-center justify-between'>
          <span className='flex items-center text-sm font-medium text-gray-700'>
            {sourceLanguage === 'auto' && (
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
            {getLanguageName(sourceLanguage)}
          </span>
          <div className='flex items-center space-x-2'>
            <button
              onClick={onClear}
              className={`rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 ${
                !sourceText ? 'invisible' : ''
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
        onChange={(e) => onTextChange(e.target.value)}
        placeholder='Enter text to translate...'
        className='h-[250px] w-full resize-none bg-transparent p-4 text-gray-800 focus:outline-none'
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.ctrlKey) {
            onTranslate();
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
            onClick={onTranslate}
            disabled={isTranslating || !sourceText.trim()}
            className={`rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none ${
              isTranslating || !sourceText.trim()
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
  );
}