'use client';

import { useEffect, useState, useRef } from 'react';
import { useSymptomStore } from '@/src/features/firstAid/store/useSymptomStore';
import { postFirstAid } from '@/src/features/firstAid/api/firstAid';
import { useHydration } from '@/src/shared/hooks/useHydration';
import { motion, AnimatePresence, Variants } from 'motion/react';

import { AiOutlineFileText, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheckCircle, BsExclamationTriangle } from 'react-icons/bs';
import { HiOutlineChartBar } from 'react-icons/hi';
import { FaRegLightbulb, FaArrowRight } from 'react-icons/fa';

interface FirstAidResult {
  content: string;
  recommendedAction: string;
  confidence: number;
  blogLinks: string[];
}

export default function FirstAidResult() {
  const hydrated = useHydration();
  const { symptomType, symptomDetail } = useSymptomStore();
  const [result, setResult] = useState<FirstAidResult | string | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!hydrated || !symptomType || !symptomDetail) return;

    const postData = async () => {
      setLoading(true);
      try {
        const res = await postFirstAid({ symptomType, symptomDetail });

        setResult(res.result);
      } catch (e) {
        setResult('An error occurred while processing your request. Please try again later.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    postData();
  }, [hydrated, symptomType, symptomDetail]);

  useEffect(() => {
    if (result && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  if (!hydrated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex min-h-screen items-center justify-center text-lg text-gray-600'
      >
        <div className='flex flex-col items-center gap-3'>
          <AiOutlineLoading3Quarters className='animate-spin text-3xl text-blue-600' />
          <p className='font-medium'>Loading...</p>
        </div>
      </motion.div>
    );
  }

  if (!symptomType || !symptomDetail) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex min-h-screen flex-col items-center justify-center px-4 text-center'
      >
        <BsExclamationTriangle className='mb-4 text-5xl text-amber-500' />
        <h2 className='mb-2 text-2xl font-semibold text-gray-800'>Missing Information</h2>
        <p className='text-gray-600'>
          We couldn't find your symptom information.
          <br />
          Please go back and provide the necessary details.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='mt-6 flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700'
          onClick={() => window.history.back()}
        >
          Go Back <FaArrowRight />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-12'>
      <div ref={contentRef} className='mx-auto w-full max-w-2xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-20 overflow-hidden rounded-2xl bg-white shadow-xl'
        >
          <div className='bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white'>
            <h1 className='text-center text-2xl font-bold sm:text-3xl'>
              First Aid Assessment Results
            </h1>
            <div className='mt-2 text-center text-sm text-blue-100'>
              Based on your symptoms: <span className='font-medium'>{symptomType}</span>
            </div>
          </div>

          <div className='p-6 sm:p-8'>
            <AnimatePresence mode='wait'>
              {loading ? (
                <motion.div
                  key='loading'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='flex flex-col items-center justify-center py-10'
                >
                  <div className='flex flex-col items-center space-y-4'>
                    <div className='relative h-16 w-16'>
                      <div className='absolute inset-0 animate-spin rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent'></div>
                      <div className='animation-delay-150 absolute inset-2 animate-spin rounded-full border-4 border-t-blue-400 border-r-transparent border-b-transparent border-l-transparent'></div>
                    </div>
                    <p className='text-lg font-medium text-gray-700'>Analyzing your symptoms...</p>
                    <p className='text-sm text-gray-500'>This may take a moment</p>
                  </div>
                </motion.div>
              ) : result ? (
                typeof result === 'object' ? (
                  <motion.div key='result' initial='hidden' animate='visible' className='space-y-8'>
                    <motion.div
                      variants={fadeInUp}
                      custom={0}
                      className='rounded-xl border-l-4 border-blue-500 bg-blue-50 p-6 shadow-sm'
                    >
                      <h2 className='mb-4 flex items-center gap-3 text-lg font-bold text-blue-800'>
                        <AiOutlineFileText className='text-2xl' />
                        First Aid Instructions
                      </h2>
                      <ul className='space-y-3 text-gray-700'>
                        {result.content.split(/(?<=[.!?])\s+/).map((sentence, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                            className='flex items-start rounded-lg bg-white p-3 shadow-sm'
                          >
                            <span className='mr-2 pt-0.5 text-blue-600'>•</span>
                            <span>{sentence}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      custom={1}
                      className='rounded-xl border-l-4 border-green-500 bg-green-50 p-6 shadow-sm'
                    >
                      <h2 className='mb-4 flex items-center gap-3 text-lg font-bold text-green-800'>
                        <BsCheckCircle className='text-2xl' />
                        Recommended Action
                      </h2>
                      <div className='rounded-lg bg-white p-4 shadow-sm'>
                        <p className='font-medium text-gray-700'>{result.recommendedAction}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      custom={2}
                      className='rounded-xl border-l-4 border-amber-500 bg-amber-50 p-6 shadow-sm'
                    >
                      <h2 className='mb-4 flex items-center gap-3 text-lg font-bold text-amber-800'>
                        <HiOutlineChartBar className='text-2xl' />
                        Assessment Confidence
                      </h2>
                      <div className='rounded-lg bg-white p-4 shadow-sm'>
                        <div className='relative h-6 w-full overflow-hidden rounded-full bg-gray-200'>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidence * 100}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`absolute top-0 left-0 h-full ${
                              result.confidence > 0.7
                                ? 'bg-green-500'
                                : result.confidence > 0.4
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                            }`}
                          />
                        </div>
                        <div className='mt-2 flex items-center justify-between'>
                          <p className='text-sm font-medium text-gray-500'>
                            Based on your symptoms
                          </p>
                          <p className='font-bold text-gray-700'>
                            {(result.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      custom={3}
                      className='rounded-xl border-l-4 border-purple-500 bg-purple-50 p-6 shadow-sm'
                    >
                      <h2 className='mb-4 flex items-center gap-3 text-lg font-bold text-purple-800'>
                        <FaRegLightbulb className='text-2xl' />
                        Additional Resources
                      </h2>
                      {result.blogLinks && result.blogLinks.length > 0 ? (
                        <ul className='space-y-3'>
                          {result.blogLinks.map((link, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                            >
                              <a
                                href={link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center justify-between rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-purple-100 hover:shadow-md'
                              >
                                <span className='truncate text-purple-700'>
                                  {decodeURIComponent(link).replace(/^https?:\/\//, '')}
                                </span>
                                <FaArrowRight className='flex-shrink-0 text-purple-500' />
                              </a>
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <div className='rounded-lg bg-white p-4 text-center text-sm text-gray-500 shadow-sm'>
                          No additional resources found for this condition.
                        </div>
                      )}
                    </motion.div>

                    <motion.div variants={fadeInUp} custom={4} className='mt-8 text-center'>
                      <p className='mb-4 text-xs text-gray-500'>
                        This is a preliminary assessment based on your symptoms. Always consult with
                        a healthcare professional for proper medical advice.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='rounded-full bg-blue-600 px-6 py-2 font-medium text-white shadow-md transition-all hover:bg-blue-700'
                        onClick={() => window.history.back()}
                      >
                        Back to Symptoms
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key='error'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='rounded-lg border-l-4 border-red-500 bg-red-50 p-6 text-gray-800 shadow-sm'
                  >
                    <div className='mb-4 flex items-center gap-3'>
                      <BsExclamationTriangle className='text-2xl text-red-600' />
                      <h2 className='font-bold text-red-700'>Error</h2>
                    </div>
                    <p>{result}</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className='mt-4 rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-sm'
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </motion.button>
                  </motion.div>
                )
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
