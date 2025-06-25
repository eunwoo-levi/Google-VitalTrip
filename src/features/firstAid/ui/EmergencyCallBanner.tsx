'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MdLocalPolice, MdLocalHospital, MdLocalFireDepartment, MdWarning } from 'react-icons/md';
import { FaGlobeAmericas } from 'react-icons/fa';

interface EmergencyNumbers {
  country: string;
  police: string;
  ambulance: string;
  fire: string;
}

export default function EmergencyCallBanner() {
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyNumbers | null>(null);

  useEffect(() => {
    // 필리핀 정보 하드코딩
    setEmergencyInfo({
      country: 'Philippines',
      police: '911',
      ambulance: '911',
      fire: '911',
    });
  }, []);

  return (
    <motion.div
      className='mx-auto my-6 flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 상단 타이틀 */}
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

      {/* 내용 */}
      {!emergencyInfo ? (
        <div className='py-4 text-center font-medium text-gray-400'>
          Loading emergency numbers...
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {/* 경찰 */}
          <div className='flex items-center gap-4 rounded-xl bg-blue-50 p-4'>
            <MdLocalPolice className='text-2xl text-blue-600' />
            <div className='flex-1'>
              <div className='text-base font-bold text-blue-700'>Police</div>
              <div className='font-mono text-lg text-gray-800'>{emergencyInfo.police}</div>
            </div>
            <a
              href={`tel:${emergencyInfo.police}`}
              className='rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-blue-700'
            >
              Call
            </a>
          </div>

          {/* 구급차 */}
          <div className='flex items-center gap-4 rounded-xl bg-green-50 p-4'>
            <MdLocalHospital className='text-2xl text-green-600' />
            <div className='flex-1'>
              <div className='text-base font-bold text-green-700'>Ambulance</div>
              <div className='font-mono text-lg text-gray-800'>{emergencyInfo.ambulance}</div>
            </div>
            <a
              href={`tel:${emergencyInfo.ambulance}`}
              className='rounded-full bg-green-600 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-green-700'
            >
              Call
            </a>
          </div>

          {/* 소방서 */}
          <div className='flex items-center gap-4 rounded-xl bg-orange-50 p-4'>
            <MdLocalFireDepartment className='text-2xl text-orange-500' />
            <div className='flex-1'>
              <div className='text-base font-bold text-orange-600'>Fire</div>
              <div className='font-mono text-lg text-gray-800'>{emergencyInfo.fire}</div>
            </div>
            <a
              href={`tel:${emergencyInfo.fire}`}
              className='rounded-full bg-orange-500 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-orange-600'
            >
              Call
            </a>
          </div>
        </div>
      )}

      {/* 하단 안내 */}
      <div className='pt-2 text-center text-sm text-gray-500'>
        Tip: In many countries, dialing{' '}
        <span className='rounded bg-yellow-200 px-2 py-0.5 font-mono'>112</span> connects you to all
        emergency services.
      </div>
    </motion.div>
  );
}
