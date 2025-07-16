import React from 'react';
import { motion } from 'motion/react';
import { MdLocalPolice, MdLocalHospital, MdLocalFireDepartment, MdWarning } from 'react-icons/md';
import { FaGlobeAmericas } from 'react-icons/fa';
import { useEmergencyNumbers } from '@/src/features/firstAid/hooks/useEmergencyNumbers';

export default function EmergencyCallBanner() {
  const { emergencyInfo, isLoading, error, retry } = useEmergencyNumbers();

  const handleRetry = () => {
    retry();
  };

  return (
    <motion.div
      className='mx-auto my-6 flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className='mb-2 flex items-center gap-2'>
        <MdWarning className='animate-pulse text-2xl text-red-500' />
        <span className='text-xl font-extrabold tracking-tight text-gray-900'>
          Emergency Numbers
        </span>
        {emergencyInfo && (
          <span className='ml-2 flex items-center gap-1 rounded-full bg-red-100 px-3 py-0.5 text-sm font-bold text-red-600'>
            <FaGlobeAmericas className='text-base' />
            {emergencyInfo.country}
          </span>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <motion.div
          className='flex flex-col items-center gap-4 py-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-red-500'></div>
          <div className='text-center font-medium text-gray-600'>
            Detecting your location...
          </div>
        </motion.div>
      ) : error ? (
        <motion.div
          className='flex flex-col items-center gap-4 py-8'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className='text-center text-lg font-bold text-red-600'>
            ⚠️ {error}
          </div>
          <button
            onClick={handleRetry}
            className='rounded-full bg-red-600 px-6 py-2 text-sm font-bold text-white shadow transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          >
            Try Again
          </button>
        </motion.div>
      ) : emergencyInfo ? (
        <motion.div
          className='flex flex-col gap-4'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Police */}
          <motion.div
            className='flex items-center gap-4 rounded-xl bg-blue-50 p-4'
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MdLocalPolice className='text-2xl text-blue-600' />
            <div className='flex-1'>
              <div className='text-base font-bold text-blue-700'>Police</div>
              <div className='font-mono text-lg text-gray-800'>{emergencyInfo.police}</div>
            </div>
            <a
              href={`tel:${emergencyInfo.police}`}
              className='rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Call
            </a>
          </motion.div>

          {/* Ambulance */}
          <motion.div
            className='flex items-center gap-4 rounded-xl bg-green-50 p-4'
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MdLocalHospital className='text-2xl text-green-600' />
            <div className='flex-1'>
              <div className='text-base font-bold text-green-700'>Ambulance</div>
              <div className='font-mono text-lg text-gray-800'>{emergencyInfo.ambulance}</div>
            </div>
            <a
              href={`tel:${emergencyInfo.ambulance}`}
              className='rounded-full bg-green-600 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            >
              Call
            </a>
          </motion.div>

          {/* Fire */}
          <motion.div
            className='flex items-center gap-4 rounded-xl bg-orange-50 p-4'
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MdLocalFireDepartment className='text-2xl text-orange-500' />
            <div className='flex-1'>
              <div className='text-base font-bold text-orange-600'>Fire</div>
              <div className='font-mono text-lg text-gray-800'>{emergencyInfo.fire}</div>
            </div>
            <a
              href={`tel:${emergencyInfo.fire}`}
              className='rounded-full bg-orange-500 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
            >
              Call
            </a>
          </motion.div>
        </motion.div>
      ) : null}

      {/* Footer Tip */}
      <motion.div
        className='pt-2 text-center text-sm text-gray-500'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Tip: In many countries, dialing{' '}
        <span className='rounded bg-yellow-200 px-2 py-0.5 font-mono'>112</span> connects you to all
        emergency services.
      </motion.div>
    </motion.div>
  );
}
