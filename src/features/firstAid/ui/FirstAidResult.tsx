'use client';

import { useEffect } from 'react';
import { Variants, motion } from 'motion/react';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { HiOutlineChartBar } from 'react-icons/hi';
import { FaRegLightbulb } from 'react-icons/fa';
import {
  MdMedicalServices,
  MdArrowBack,
  MdCheckCircle,
  MdErrorOutline,
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
} as const satisfies Variants;

const pulse = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
} as const satisfies Variants;

const slideIn = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
} as const satisfies Variants;

function ProgressCircle({ percent }: { percent: number }) {
  return (
    <motion.div
      className='relative flex h-20 w-20 items-center justify-center'
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 100 }}
    >
      <svg className='absolute top-0 left-0' width='80' height='80'>
        <circle cx='40' cy='40' r='34' stroke='#e5e7eb' strokeWidth='8' fill='none' />
        <motion.circle
          cx='40'
          cy='40'
          r='34'
          stroke='#ef4444'
          strokeWidth='8'
          fill='none'
          strokeDasharray={2 * Math.PI * 34}
          initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - percent / 100) }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          strokeLinecap='round'
        />
      </svg>
      <motion.span
        className='absolute text-xl font-bold text-red-600'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        {percent}%
      </motion.span>
    </motion.div>
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
      <motion.div
        className='flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center'
        >
          <MdErrorOutline className='mb-4 text-5xl text-red-500' />
          <h2 className='mb-2 text-2xl font-bold text-gray-800'>Missing Information</h2>
          <p className='mb-6 text-center text-gray-600'>
            We couldn't find your symptom information.
            <br />
            Please go back and provide the necessary details.
          </p>
          <motion.button
            className='flex items-center gap-2 rounded-full bg-red-600 px-6 py-2 font-bold text-white shadow transition hover:bg-red-700'
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdArrowBack className='text-lg' /> Go Back
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className='flex min-h-screen flex-col items-center bg-gradient-to-br from-white via-red-50 to-blue-50 px-2 py-10'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className='mb-8 flex justify-center'
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
      >
        <img src='/VitalTrip.svg' alt='VitalTrip Logo' className='h-16 w-auto' />
      </motion.div>

      <div ref={contentRef} className='w-full max-w-2xl'>
        <motion.div
          className='mb-8 flex flex-col items-center rounded-3xl border-t-8 border-red-500 bg-white p-8 shadow-2xl'
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
          >
            <MdMedicalServices className='mb-2 text-5xl text-red-600 drop-shadow' />
          </motion.div>
          <motion.h1
            className='mb-2 text-3xl font-extrabold tracking-tight text-gray-900'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            First Aid Guide
          </motion.h1>
          <motion.div
            className='mb-4 text-base font-medium text-gray-500'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Symptom: <span className='font-bold text-red-600'>{symptomType}</span>
          </motion.div>
          {result && typeof result === 'object' && (
            <ProgressCircle percent={Math.round((result.confidence || 0) * 100)} />
          )}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <EmergencyCallBanner />
        </motion.div>

        <motion.div
          className='flex flex-col gap-8'
          variants={staggerContainer}
          initial='hidden'
          animate='visible'
        >
          {loading ? (
            <motion.div
              className='flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-lg'
              animate={{
                boxShadow: [
                  '0px 4px 16px rgba(0,0,0,0.1)',
                  '0px 8px 24px rgba(255,100,100,0.2)',
                  '0px 4px 16px rgba(0,0,0,0.1)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AiOutlineLoading3Quarters className='mb-4 animate-spin text-4xl text-red-500' />
              <motion.p
                className='text-lg font-semibold text-gray-700'
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Analyzing your symptoms...
              </motion.p>
              <p className='text-sm text-gray-400'>This may take a moment</p>
            </motion.div>
          ) : result ? (
            typeof result === 'object' ? (
              <>
                <motion.div
                  className='rounded-2xl border-l-8 border-blue-500 bg-white p-8 shadow-lg'
                  variants={slideIn}
                >
                  <h2 className='mb-6 flex items-center gap-2 text-xl font-bold text-blue-700'>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <BsCheckCircle className='text-2xl text-blue-500' />
                    </motion.div>
                    Step-by-step First Aid
                  </h2>
                  <motion.ol
                    className='relative ml-4 border-l-2 border-blue-200'
                    variants={staggerContainer}
                    initial='hidden'
                    animate='visible'
                  >
                    {result.content.split(/(?<=[.!?])\s+/).map((sentence, idx) => (
                      <motion.li key={idx} className='mb-8 ml-6' variants={fadeInUp} custom={idx}>
                        <motion.span
                          className='absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white'
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                        >
                          <span className='font-bold text-blue-600'>{idx + 1}</span>
                        </motion.span>
                        <span className='text-base font-medium text-gray-800'>{sentence}</span>
                      </motion.li>
                    ))}
                  </motion.ol>
                </motion.div>
                <motion.div
                  className='flex items-center gap-4 rounded-2xl border-l-8 border-green-500 bg-white p-8 shadow-lg'
                  variants={pulse}
                >
                  <motion.div
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <HiOutlineChartBar className='text-3xl text-green-500' />
                  </motion.div>
                  <div>
                    <h2 className='mb-1 text-lg font-bold text-green-700'>Recommended Action</h2>
                    <motion.div
                      className='rounded-lg bg-green-50 p-3 font-semibold text-gray-800'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {result.recommendedAction}
                    </motion.div>
                  </div>
                </motion.div>
                {/* Additional Resources */}
                <motion.div
                  className='rounded-2xl border-l-8 border-purple-500 bg-white p-8 shadow-lg'
                  variants={fadeInUp}
                  custom={3}
                >
                  <h2 className='mb-3 flex items-center gap-2 text-lg font-bold text-purple-700'>
                    <motion.div
                      animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <FaRegLightbulb className='text-2xl text-purple-500' />
                    </motion.div>
                    Additional Resources
                  </h2>
                  {result.blogLinks && result.blogLinks.length > 0 ? (
                    <motion.ul
                      className='space-y-2'
                      variants={staggerContainer}
                      initial='hidden'
                      animate='visible'
                    >
                      {result.blogLinks.map((link, index) => (
                        <motion.li key={index} variants={fadeInUp} custom={index}>
                          <motion.a
                            href={link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center justify-between rounded-lg bg-purple-50 p-3 font-medium text-purple-700 shadow-sm transition hover:bg-purple-100'
                            whileHover={{ x: 5, backgroundColor: '#f3e8ff' }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className='truncate'>
                              {decodeURIComponent(link).replace(/^https?:\/\//, '')}
                            </span>
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                            >
                              <MdArrowForward className='text-purple-400' />
                            </motion.div>
                          </motion.a>
                        </motion.li>
                      ))}
                    </motion.ul>
                  ) : (
                    <div className='text-sm text-gray-400'>No additional resources found.</div>
                  )}
                </motion.div>
                <motion.div
                  className='mt-8 flex flex-col items-center'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  <div className='mb-16 flex items-center gap-2 text-xs text-gray-400'>
                    <MdErrorOutline className='text-lg' />
                    <span>
                      This is a preliminary assessment. Always consult a medical professional.
                    </span>
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                className='flex flex-col items-center rounded-2xl border-l-8 border-red-500 bg-white p-8 shadow-lg'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: [0.5, 1.1, 1] }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <MdErrorOutline className='mb-2 text-3xl text-red-600' />
                </motion.div>
                <h2 className='mb-2 font-bold text-red-700'>Error</h2>
                <p className='mb-4 text-gray-700'>{result}</p>
                <motion.button
                  className='rounded-full bg-red-600 px-5 py-2 font-bold text-white shadow transition hover:bg-red-700'
                  onClick={() => window.location.reload()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again
                </motion.button>
              </motion.div>
            )
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  );
}
