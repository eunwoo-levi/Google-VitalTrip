import type { ErrorFallbackProps } from "src/types/errorBoundary";

export const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-center text-gray-800">
          문제가 발생했습니다
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          예상치 못한 오류가 발생했습니다. 다시 시도해 주세요.
        </p>
        {error && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700 overflow-auto max-h-32">
            <p className="font-semibold">오류 상세:</p>
            <p className="mt-1">{error.message}</p>
          </div>
        )}
        <button
          onClick={resetError}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
};
