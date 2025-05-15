'use client';

import { useEffect, useState } from 'react';
import { useSymptomStore } from '@/src/features/firstAid/store/useSymptomStore';
import { postFirstAid } from '@/src/features/firstAid/api/firstAid';
import { useHydration } from '@/src/shared/hooks/useHydration';

import { AiOutlineFileText } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { HiOutlineChartBar } from 'react-icons/hi';
import { FaRegLightbulb } from 'react-icons/fa';

interface FirstAidResult {
  content: string;
  recommendedAction: string;
  confidence: number;
  blogLinks: string[];
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
        console.log(res.result);
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
        Loading...
      </div>
    );
  }

  if (!symptomType || !symptomDetail) {
    return (
      <div className='flex min-h-screen items-center justify-center px-4 text-center text-red-500'>
        There is no symptom information. <br /> Please re-enter from the beginning.
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-12'>
      <div className='mb-20 w-full max-w-2xl space-y-6 rounded-2xl bg-white p-8 shadow-2xl transition-all'>
        <h1 className='text-center text-3xl font-bold text-blue-700'>AI First Aid Results</h1>

        {result ? (
          typeof result === 'object' ? (
            <div className='space-y-6'>
              <div className='rounded-xl border border-blue-200 bg-blue-50 p-5'>
                <h2 className='mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-blue-800'>
                  <AiOutlineFileText className='text-xl' />
                  First Aid Details
                </h2>
                <ul className='list-disc space-y-1 pl-5 text-gray-800'>
                  {result.content.split(/(?<=[.!?])\s+/).map((sentence, idx) => (
                    <li key={idx}>{sentence}</li>
                  ))}
                </ul>
              </div>

              <div className='rounded-xl border border-green-200 bg-green-50 p-5'>
                <h2 className='mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-green-800'>
                  <BsCheckCircle className='text-xl' />
                  Recommended Action
                </h2>
                <p className='font-medium text-green-900'>{result.recommendedAction}</p>
              </div>

              <div className='rounded-xl border border-gray-200 bg-gray-50 p-5'>
                <h2 className='mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-gray-700'>
                  <HiOutlineChartBar className='text-xl' />
                  Reliability
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
                <h2 className='mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-purple-800'>
                  <FaRegLightbulb className='text-xl' />
                  Recommended Helpful Blog Posts
                </h2>
                {result.blogLinks && result.blogLinks.length > 0 ? (
                  <ul className='space-y-2'>
                    {result.blogLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='block rounded-lg border border-purple-300 bg-white px-4 py-2 break-words whitespace-pre-wrap text-purple-700 transition hover:bg-purple-100 hover:underline'
                        >
                          {decodeURIComponent(link).replace(/^https?:\/\//, '')}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-sm text-gray-600'>추천 블로그 링크가 없습니다.</p>
                )}
              </div>
            </div>
          ) : (
            <div className='rounded-lg border border-red-300 bg-red-100 p-4 text-sm whitespace-pre-wrap text-red-800'>
              {result}
            </div>
          )
        ) : (
          <div className='animate-pulse text-gray-600'>AI is analyzing...</div>
        )}
      </div>
    </div>
  );
}
