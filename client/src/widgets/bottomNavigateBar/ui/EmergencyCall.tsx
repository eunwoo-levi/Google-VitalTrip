import React from 'react';
import { motion } from 'motion/react';
import { MdLocalPolice, MdLocalHospital, MdLocalFireDepartment, MdWarning } from 'react-icons/md';
import { FaGlobeAmericas } from 'react-icons/fa';
import { useEmergencyNumbers } from '@/src/features/firstAid/hooks/useEmergencyNumbers';

export default function EmergencyCall() {
  const { emergencyInfo, isLoading, error } = useEmergencyNumbers();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex flex-col items-center gap-2'>
        <MdWarning className='mb-1 animate-pulse text-5xl text-red-600 drop-shadow' />
        <h2 className='text-3xl font-extrabold tracking-tight text-red-700'>Emergency Numbers</h2>
        <span className='flex items-center gap-1 text-base font-semibold text-red-500'>
          <FaGlobeAmericas className='text-lg' />
          {emergencyInfo ? emergencyInfo.country : 'Detecting country...'}
        </span>
      </div>
      {error ? (
        <div className='p-6 text-center text-lg font-bold text-red-600'>⚠️ {error}</div>
      ) : isLoading || !emergencyInfo ? (
        <div className='p-6 text-center text-lg font-semibold text-gray-600'>
          🔍 Detecting your emergency contact info...
        </div>
      ) : (
        <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div className='flex flex-col items-center rounded-xl bg-red-50 p-5 shadow-md'>
            <MdLocalPolice className='mb-2 text-3xl text-blue-700' />
            <span className='font-bold text-blue-700'>Police</span>
            <span className='mb-2 font-mono text-lg text-gray-800'>{emergencyInfo.police}</span>
            <a
              href={`tel:${emergencyInfo.police}`}
              className='mt-2 w-full rounded-full bg-blue-600 py-1.5 text-center font-bold text-white transition hover:bg-blue-700'
            >
              Call
            </a>
          </div>
          <div className='flex flex-col items-center rounded-xl bg-red-50 p-5 shadow-md'>
            <MdLocalHospital className='mb-2 text-3xl text-green-700' />
            <span className='font-bold text-green-700'>Ambulance</span>
            <span className='mb-2 font-mono text-lg text-gray-800'>{emergencyInfo.ambulance}</span>
            <a
              href={`tel:${emergencyInfo.ambulance}`}
              className='mt-2 w-full rounded-full bg-green-600 py-1.5 text-center font-bold text-white transition hover:bg-green-700'
            >
              Call
            </a>
          </div>
          <div className='flex flex-col items-center rounded-xl bg-red-50 p-5 shadow-md'>
            <MdLocalFireDepartment className='mb-2 text-3xl text-orange-600' />
            <span className='font-bold text-orange-600'>Fire</span>
            <span className='mb-2 font-mono text-lg text-gray-800'>{emergencyInfo.fire}</span>
            <a
              href={`tel:${emergencyInfo.fire}`}
              className='mt-2 w-full rounded-full bg-orange-500 py-1.5 text-center font-bold text-white transition hover:bg-orange-600'
            >
              Call
            </a>
          </div>
        </div>
      )}
      <footer className='mt-8 flex flex-col gap-2 border-t pt-6 text-center text-base font-bold text-red-700'>
        <span>
          Tip: In many countries, dialing{' '}
          <span className='rounded bg-yellow-200 px-2 py-0.5 font-mono'>112</span> connects you to
          all emergency services.
        </span>
        <span className='text-xs text-gray-500'>
          Stay calm and provide clear information to responders.
        </span>
      </footer>
    </motion.div>
  );
}
