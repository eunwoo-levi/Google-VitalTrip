'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';

import { AiOutlineFileText, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheckCircle, BsExclamationTriangle } from 'react-icons/bs';
import { HiOutlineChartBar } from 'react-icons/hi';
import { FaRegLightbulb, FaArrowRight } from 'react-icons/fa';
import {
  MdMedicalServices,
  MdArrowBack,
  MdCheckCircle as MdCheckCircleIcon,
  MdErrorOutline,
  MdInfoOutline,
  MdArrowForward,
} from 'react-icons/md';
import useFirstAidResult from '../hooks/useFirstAidResult';
import EmergencyCallBanner from '@/src/features/firstAid/ui/EmergencyCallBanner';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
} as const satisfies Variants;

function ProgressCircle({ percent }: { percent: number }) {
  return (
    <div className='relative flex h-20 w-20 items-center justify-center'>
      <svg className='absolute top-0 left-0' width='80' height='80'>
        <circle cx='40' cy='40' r='34' stroke='#e5e7eb' strokeWidth='8' fill='none' />
        <circle
          cx='40'
          cy='40'
          r='34'
          stroke='#ef4444'
          strokeWidth='8'
          fill='none'
          strokeDasharray={2 * Math.PI * 34}
          strokeDashoffset={2 * Math.PI * 34 * (1 - percent / 100)}
          strokeLinecap='round'
          style={{ transition: 'stroke-dashoffset 1s' }}
        />
      </svg>
      <span className='absolute text-xl font-bold text-red-600'>{percent}%</span>
    </div>
  );
}

export default function FirstAidResult() {
  const { hydrated, symptomType, symptomDetail, result, loading, contentRef } = useFirstAidResult();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!hydrated) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
        <AiOutlineLoading3Quarters className='mb-4 animate-spin text-4xl text-red-500' />
        <p className='text-lg font-semibold text-gray-600'>Loading...</p>
      </div>
    );
  }

  if (!symptomType || !symptomDetail) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4'>
        <MdErrorOutline className='mb-4 text-5xl text-red-500' />
        <h2 className='mb-2 text-2xl font-bold text-gray-800'>Missing Information</h2>
        <p className='mb-6 text-center text-gray-600'>
          We couldn't find your symptom information.
          <br />
          Please go back and provide the necessary details.
        </p>
        <button
          className='flex items-center gap-2 rounded-full bg-red-600 px-6 py-2 font-bold text-white shadow transition hover:bg-red-700'
          onClick={() => window.history.back()}
        >
          <MdArrowBack className='text-lg' /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col items-center bg-gradient-to-br from-white via-red-50 to-blue-50 px-2 py-10'>
      <div className='mb-8 flex justify-center'>
        <img src='/VitalTrip.svg' alt='VitalTrip Logo' className='h-16 w-auto' />
      </div>

      <div ref={contentRef} className='w-full max-w-2xl'>
        {/* Hero Section */}
        <div className='mb-8 flex flex-col items-center rounded-3xl border-t-8 border-red-500 bg-white p-8 shadow-2xl'>
          <MdMedicalServices className='mb-2 text-5xl text-red-600 drop-shadow' />
          <h1 className='mb-2 text-3xl font-extrabold tracking-tight text-gray-900'>
            First Aid Guide
          </h1>
          <div className='mb-4 text-base font-medium text-gray-500'>
            Symptom: <span className='font-bold text-red-600'>{symptomType}</span>
          </div>
          {result && typeof result === 'object' && (
            <ProgressCircle percent={Math.round((result.confidence || 0) * 100)} />
          )}
        </div>

        <EmergencyCallBanner />

        {/* Main Content */}
        <div className='flex flex-col gap-8'>
          {loading ? (
            <div className='flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-lg'>
              <AiOutlineLoading3Quarters className='mb-4 animate-spin text-4xl text-red-500' />
              <p className='text-lg font-semibold text-gray-700'>Analyzing your symptoms...</p>
              <p className='text-sm text-gray-400'>This may take a moment</p>
            </div>
          ) : result ? (
            typeof result === 'object' ? (
              <>
                {/* Stepper Guide */}
                <div className='rounded-2xl border-l-8 border-blue-500 bg-white p-8 shadow-lg'>
                  <h2 className='mb-6 flex items-center gap-2 text-xl font-bold text-blue-700'>
                    <BsCheckCircle className='text-2xl text-blue-500' /> Step-by-step First Aid
                  </h2>
                  <ol className='relative ml-4 border-l-2 border-blue-200'>
                    {result.content.split(/(?<=[.!?])\s+/).map((sentence, idx) => (
                      <li key={idx} className='mb-8 ml-6'>
                        <span className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white'>
                          <span className='font-bold text-blue-600'>{idx + 1}</span>
                        </span>
                        <span className='text-base font-medium text-gray-800'>{sentence}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                {/* Recommended Action */}
                <div className='flex items-center gap-4 rounded-2xl border-l-8 border-green-500 bg-white p-8 shadow-lg'>
                  <HiOutlineChartBar className='text-3xl text-green-500' />
                  <div>
                    <h2 className='mb-1 text-lg font-bold text-green-700'>Recommended Action</h2>
                    <div className='rounded-lg bg-green-50 p-3 font-semibold text-gray-800'>
                      {result.recommendedAction}
                    </div>
                  </div>
                </div>
                {/* Additional Resources */}
                <div className='rounded-2xl border-l-8 border-purple-500 bg-white p-8 shadow-lg'>
                  <h2 className='mb-3 flex items-center gap-2 text-lg font-bold text-purple-700'>
                    <FaRegLightbulb className='text-2xl text-purple-500' /> Additional Resources
                  </h2>
                  {result.blogLinks && result.blogLinks.length > 0 ? (
                    <ul className='space-y-2'>
                      {result.blogLinks.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center justify-between rounded-lg bg-purple-50 p-3 font-medium text-purple-700 shadow-sm transition hover:bg-purple-100'
                          >
                            <span className='truncate'>
                              {decodeURIComponent(link).replace(/^https?:\/\//, '')}
                            </span>
                            <MdArrowForward className='text-purple-400' />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className='text-sm text-gray-400'>No additional resources found.</div>
                  )}
                </div>
                {/* CTA */}
                <div className='mt-8 flex flex-col items-center'>
                  <div className='mb-16 flex items-center gap-2 text-xs text-gray-400'>
                    <MdErrorOutline className='text-lg' />
                    <span>
                      This is a preliminary assessment. Always consult a medical professional.
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className='flex flex-col items-center rounded-2xl border-l-8 border-red-500 bg-white p-8 shadow-lg'>
                <MdErrorOutline className='mb-2 text-3xl text-red-600' />
                <h2 className='mb-2 font-bold text-red-700'>Error</h2>
                <p className='mb-4 text-gray-700'>{result}</p>
                <button
                  className='rounded-full bg-red-600 px-5 py-2 font-bold text-white shadow transition hover:bg-red-700'
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
