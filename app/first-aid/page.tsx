'use client';

import { useEffect, useState } from 'react';
import { useSymptomStore } from '@/src/features/firstAid/store/useSymptomStore';
import { postFirstAid } from '@/src/features/firstAid/api/firstAid';
import { useHydration } from '@/src/shared/hooks/useHydration';

interface FirstAidResult {
  content: string;
  recommendedAction: string;
  confidence: number;
  suggestedPhrase: string;
}

export default function FirstAidPage() {
  const hydrated = useHydration();
  const { symptomType, symptomDetail } = useSymptomStore();
  const [result, setResult] = useState<FirstAidResult | string | null>(null);

  useEffect(() => {
    if (!hydrated || !symptomType || !symptomDetail) return;

    const postData = async () => {
      try {
        const res = await postFirstAid({ symptomType, symptomDetail });
        setResult(res.result);
      } catch (e) {
        setResult('에러가 발생했어요. 잠시 후 다시 시도해주세요.');
        console.error(e);
      }
    };

    postData();
  }, [hydrated, symptomType, symptomDetail]);

  if (!hydrated) {
    return (
      <div className='flex min-h-screen items-center justify-center text-lg text-gray-600'>
        로딩 중입니다...
      </div>
    );
  }

  if (!symptomType || !symptomDetail) {
    return (
      <div className='flex min-h-screen items-center justify-center px-4 text-center text-red-500'>
        증상 정보가 없습니다. <br /> 처음부터 다시 입력해주세요.
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-12'>
      <div className='mb-20 w-full max-w-2xl space-y-6 rounded-2xl bg-white p-8 shadow-2xl transition-all'>
        <h1 className='text-center text-3xl font-bold text-blue-700'>AI 응급처치 결과</h1>

        {result ? (
          typeof result === 'object' ? (
            <div className='space-y-6'>
              <div className='rounded-xl border border-blue-200 bg-blue-50 p-5'>
                <h2 className='mb-4 text-center text-lg font-semibold text-blue-800'>
                  📋 First Aid Details
                </h2>
                <ul className='list-disc space-y-1 pl-5 text-gray-800'>
                  {result.content.split(/(?<=[.!?])\s+/).map((sentence, idx) => (
                    <li key={idx}>{sentence}</li>
                  ))}
                </ul>
              </div>

              <div className='rounded-xl border border-green-200 bg-green-50 p-5'>
                <h2 className='mb-4 text-center text-lg font-semibold text-green-800'>
                  ✅ Recommended action
                </h2>
                <p className='font-medium text-green-900'>{result.recommendedAction}</p>
              </div>

              <div className='rounded-xl border border-gray-200 bg-gray-50 p-5'>
                <h2 className='mb-4 text-center text-lg font-semibold text-gray-700'>
                  📊 Reliability
                </h2>
                <div className='relative h-4 w-full rounded-full bg-gray-200'>
                  <div
                    className='absolute top-0 left-0 h-4 rounded-full bg-green-500'
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
                <p className='mt-2 text-sm text-gray-600'>
                  {(result.confidence * 100).toFixed(1)}%
                </p>
              </div>

              <div className='rounded-xl border border-purple-200 bg-purple-50 p-5'>
                <h2 className='mb-4 text-center text-lg font-semibold text-purple-800'>
                  💬 AI Recommended Question Phrases
                </h2>
                <p className='text-purple-900 italic'>“{result.suggestedPhrase}”</p>
              </div>
            </div>
          ) : (
            <div className='rounded-lg border border-red-300 bg-red-100 p-4 text-sm whitespace-pre-wrap text-red-800'>
              {result}
            </div>
          )
        ) : (
          <div className='animate-pulse text-gray-600'>AI 분석 중입니다...</div>
        )}
      </div>
    </div>
  );
}
