import { FirstAidResult } from '@/src/features/firstAid/ui';
import { motion } from 'motion/react';
import Image from 'next/image';
import { FiActivity } from 'react-icons/fi';

export default function FirstAidPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <FirstAidHeader />

      <FirstAidResult />
    </div>
  );
}

const FirstAidHeader = () => {
  return (
    <motion.header
      className='sticky top-0 z-50 border-b bg-white/80 shadow-sm backdrop-blur-lg'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className='mx-auto max-w-6xl px-6 py-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            >
              <Image
                src='/VitalTrip.svg'
                alt='VitalTrip'
                width={48}
                height={48}
                className='h-12 w-auto'
              />
            </motion.div>
            <div>
              <motion.h1
                className='text-2xl font-bold text-gray-900'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Emergency AI Analysis
              </motion.h1>
            </div>
          </div>
          <motion.div
            className='flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <FiActivity className='text-base' />
            <span>Analysis Complete</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
