'use client';

import EmergencyCallBanner from '@/src/features/firstAid/ui/EmergencyCallBanner';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { FiActivity, FiExternalLink, FiInfo } from 'react-icons/fi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { MdArrowForward, MdErrorOutline, MdMedicalServices } from 'react-icons/md';
import { useFirstAidMutation } from '../api/firstAid';
import { slideInLeft, staggerChildren } from '../data/animationEffect';
import { useSymptomStore } from '../store/useSymptomStore';
import { AnimatedSection } from './AnimatedSection';
import { ConfidenceIndicator } from './ConfidenceIndicator';
import { LoadingSpinner } from './LoadingSpinner';

export const FirstAidResult = () => {
  const { mutateAsync, data: result, isPending, isError } = useFirstAidMutation();
  const { symptomType, symptomDetail } = useSymptomStore();

  useEffect(() => {
    try {
      mutateAsync({ symptomType: symptomType, symptomDetail: symptomDetail });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError || !result) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-50'>
        <motion.div
          className='mx-4 w-full max-w-md rounded-2xl border bg-white p-10 text-center shadow-xl'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <MdErrorOutline className='mx-auto mb-6 text-6xl text-red-500' />
          </motion.div>
          <h2 className='mb-3 text-2xl font-bold text-gray-900'>Analysis Failed</h2>
          <p className='mb-8 text-gray-600'>
            We couldn&apos;t complete the emergency analysis. Please try again.
          </p>
          <motion.button
            onClick={() => window.location.reload()}
            className='rounded-xl bg-red-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-red-600 hover:shadow-xl'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-6xl px-6 py-10 pb-[100px]'>
      <AnimatedSection delay={0.1}>
        <EmergencyCallBanner />
      </AnimatedSection>

      <div className='mt-10 space-y-8'>
        <SymptomSummary
          symptomType={symptomType}
          symptomDetail={symptomDetail}
          confidence={result.confidence}
        />
        <FirstAidSteps firstAidSteps={result.content} />
        <RecommendedAction recommendedAction={result.recommendedAction} />
        <AdditionalResources blogLinks={result.blogLinks} />
        <AlertDisclaimer />
      </div>
    </div>
  );
};

const SymptomSummary = ({
  symptomType,
  symptomDetail,
  confidence,
}: {
  symptomType: string;
  symptomDetail: string;
  confidence: number;
}) => {
  return (
    <AnimatedSection delay={0.2}>
      <div className='rounded-2xl border border-white/50 bg-white/90 p-8 shadow-xl backdrop-blur-sm'>
        <div className='mb-6 flex items-start justify-between'>
          <div className='flex items-center gap-4'>
            <motion.div
              className='rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-pink-50 p-4'
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <MdMedicalServices className='text-2xl text-red-600' />
            </motion.div>
            <div>
              <h2 className='mb-1 text-2xl font-bold text-gray-900'>Symptom Analysis Complete</h2>
              <p className='text-lg font-medium text-gray-700'>{symptomType}</p>
            </div>
          </div>
          <ConfidenceIndicator confidence={Math.round((confidence || 0) * 100)} />
        </div>

        {symptomDetail && (
          <motion.div
            className='rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className='leading-relaxed text-gray-800'>
              <strong className='text-blue-700'>Detailed Symptoms:</strong> {symptomDetail}
            </p>
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
};

const FirstAidSteps = ({ firstAidSteps }: { firstAidSteps: string }) => {
  return (
    <AnimatedSection delay={0.3}>
      <div className='overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-xl backdrop-blur-sm'>
        <div className='bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6 text-white'>
          <div className='flex items-center gap-3'>
            <BsCheckCircle className='text-2xl' />
            <h2 className='text-2xl font-bold'>Emergency First Aid Protocol</h2>
          </div>
          <p className='mt-2 text-blue-100'>Follow these steps carefully and in order</p>
        </div>

        <div className='p-8'>
          <motion.div
            className='space-y-6'
            variants={staggerChildren}
            initial='hidden'
            animate='visible'
          >
            {firstAidSteps
              .split(/(?<=[.!?])\s+/)
              .filter((sentence) => sentence.trim())
              .map((sentence, idx) => (
                <motion.div key={idx} className='group flex gap-6' variants={slideInLeft}>
                  <div className='flex-shrink-0'>
                    <motion.div
                      className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg transition-shadow duration-300 group-hover:shadow-xl'
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span className='text-lg font-bold text-white'>{idx + 1}</span>
                    </motion.div>
                  </div>
                  <div className='flex-1 pt-2'>
                    <p className='text-lg leading-relaxed font-medium text-gray-800'>{sentence}</p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const RecommendedAction = ({ recommendedAction }: { recommendedAction: string }) => {
  return (
    <AnimatedSection delay={0.4}>
      <div className='overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-xl backdrop-blur-sm'>
        <div className='bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-6 text-white'>
          <div className='flex items-center gap-3'>
            <FiActivity className='text-2xl' />
            <h2 className='text-2xl font-bold'>Recommended Next Steps</h2>
          </div>
          <p className='mt-2 text-emerald-100'>Important actions to take immediately</p>
        </div>

        <div className='p-8'>
          <motion.div
            className='rounded-xl border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50 to-green-50 p-6'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className='text-lg leading-relaxed font-semibold text-gray-800'>
              {recommendedAction}
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const AdditionalResources = ({ blogLinks }: { blogLinks: string[] }) => {
  return (
    <AnimatedSection delay={0.5}>
      <div className='overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-xl backdrop-blur-sm'>
        <div className='bg-gradient-to-r from-purple-500 to-violet-600 px-8 py-6 text-white'>
          <div className='flex items-center gap-3'>
            <HiOutlineDocumentText className='text-2xl' />
            <h2 className='text-2xl font-bold'>Additional Medical Resources</h2>
          </div>
          <p className='mt-2 text-purple-100'>Trusted sources for more information</p>
        </div>

        <div className='p-8'>
          <motion.div
            className='grid gap-4'
            variants={staggerChildren}
            initial='hidden'
            animate='visible'
          >
            {blogLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center justify-between rounded-xl border-2 border-gray-100 p-6 transition-all duration-300 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50'
                variants={slideInLeft}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className='flex items-center gap-4'>
                  <div className='rounded-lg bg-purple-100 p-2 transition-colors duration-200 group-hover:bg-purple-200'>
                    <FiExternalLink className='text-lg text-purple-600' />
                  </div>
                  <div>
                    <span className='block text-lg font-semibold text-gray-900'>
                      {
                        decodeURIComponent(link)
                          .replace(/^https?:\/\//, '')
                          .split('/')[0]
                      }
                    </span>
                    <span className='text-sm text-gray-500'>Medical Resource</span>
                  </div>
                </div>
                <MdArrowForward className='text-xl text-gray-400 transition-colors duration-200 group-hover:text-purple-500' />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const AlertDisclaimer = () => {
  return (
    <AnimatedSection delay={0.6}>
      <div className='rounded-2xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-8 shadow-lg'>
        <div className='flex gap-4'>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <FiInfo className='mt-1 flex-shrink-0 text-3xl text-amber-600' />
          </motion.div>
          <div>
            <h3 className='mb-4 text-xl font-bold text-amber-800'>Important Medical Disclaimer</h3>
            <div className='space-y-3 leading-relaxed text-amber-700'>
              <p className='font-medium'>
                • This analysis is provided by AI for preliminary guidance only and cannot replace
                professional medical diagnosis.
              </p>
              <p className='font-medium'>
                • In emergency situations or if symptoms are severe, seek immediate medical
                attention or call emergency services.
              </p>
              <p className='font-medium'>
                • Always consult with qualified healthcare professionals for proper medical advice
                and treatment.
              </p>
              <p className='font-medium'>
                • This tool is designed to supplement, not replace, professional medical judgment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
