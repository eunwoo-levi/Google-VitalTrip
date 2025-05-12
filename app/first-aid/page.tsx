'use client';

import { useEffect, useState } from 'react';
import { useSymptomStore } from '@/src/features/firstAid/store/useSymptomStore';
import { postFirstAid } from '@/src/features/firstAid/api/firstAid';
import { useHydration } from '@/src/shared/hooks/useHydration';

interface FirstAidResult {
  content: string;
  recommendedAction: string;
  confidence: number;
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
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12'>
      <div className='w-full max-w-xl space-y-6 rounded-2xl bg-white p-6 shadow-xl'>
        <h1 className='text-2xl font-bold text-blue-700'>AI 응급처치 결과</h1>

        {result ? (
          typeof result === 'object' ? (
            <div className='space-y-4'>
              <div className='rounded-lg border bg-blue-50 p-4'>
                <h2 className='mb-1 font-semibold text-gray-700'>내용</h2>
                <p className='text-gray-800'>{result.content}</p>
              </div>

              <div className='rounded-lg border bg-green-50 p-4'>
                <h2 className='mb-1 font-semibold text-gray-700'>추천 행동</h2>
                <p className='font-medium text-green-800'>{result.recommendedAction}</p>
              </div>

              <div>
                <h2 className='mb-2 font-semibold text-gray-700'>신뢰도</h2>
                <div className='h-3 w-full rounded-full bg-gray-200'>
                  <div
                    className='h-3 rounded-full bg-green-500'
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
                <p className='mt-1 text-sm text-gray-600'>
                  {(result.confidence * 100).toFixed(1)}%
                </p>
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
