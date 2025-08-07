import { motion } from 'motion/react';
import { MdLocalHospital } from 'react-icons/md';

export const LoadingSpinner = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <motion.div
        className='mx-4 w-full max-w-md rounded-2xl border bg-white p-10 shadow-xl'
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className='text-center'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className='mb-6 inline-block'
          >
            <MdLocalHospital className='text-5xl text-red-500' />
          </motion.div>
          <motion.h2
            className='mb-3 text-2xl font-bold text-gray-900'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Analyzing Emergency Response
          </motion.h2>
          <motion.p
            className='mb-4 text-gray-600'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Our AI is processing your symptoms...
          </motion.p>
          <motion.div
            className='flex items-center justify-center gap-1'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className='h-2 w-2 rounded-full bg-red-500'
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
