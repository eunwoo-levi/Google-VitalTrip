import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { FaGlobeAmericas } from 'react-icons/fa';
import { MdLocalFireDepartment, MdLocalHospital, MdLocalPolice, MdWarning } from 'react-icons/md';

type EmergencyContact = {
  fire: string | null;
  police: string | null;
  medical: string | null;
  general: string | null;
};

export default function EmergencyCallBanner({
  emergencyContact,
  countryName,
}: {
  emergencyContact: EmergencyContact;
  countryName?: string;
}) {
  const { t } = useTranslation('common');
  const { police, medical, fire, general } = emergencyContact || {};

  return (
    <motion.div
      className='mx-auto my-6 flex w-full max-w-2xl flex-col gap-6 rounded-2xl border-2 border-red-500 bg-white p-6 shadow-xl'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='mb-2 flex items-center gap-2'>
        <MdWarning className='animate-pulse text-2xl text-red-500' />
        <span className='text-xl font-extrabold tracking-tight text-gray-900'>
          {t('firstaid.emergency_numbers')}
        </span>
        {countryName && (
          <span className='ml-2 flex items-center gap-1 rounded-full bg-red-100 px-3 py-0.5 text-sm font-bold text-red-600'>
            <FaGlobeAmericas className='text-base' />
            {countryName}
          </span>
        )}
      </div>

      <motion.div
        className='flex flex-col gap-4'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {police && (
          <motion.div
            className='flex items-center gap-4 rounded-xl bg-blue-50 p-4'
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <MdLocalPolice className='text-2xl text-blue-600' />
            <div className='flex-1'>
              <div className='text-base font-bold text-blue-700'>{t('firstaid.police')}</div>
              <div className='font-mono text-lg text-gray-800'>{police}</div>
            </div>
            <a
              href={`tel:${police}`}
              className='rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
            >
              {t('firstaid.call')}
            </a>
          </motion.div>
        )}

        {medical && (
          <motion.div
            className='flex items-center gap-4 rounded-xl bg-green-50 p-4'
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <MdLocalHospital className='text-2xl text-green-600' />
            <div className='flex-1'>
              <div className='text-base font-bold text-green-700'>{t('firstaid.ambulance')}</div>
              <div className='font-mono text-lg text-gray-800'>{medical}</div>
            </div>
            <a
              href={`tel:${medical}`}
              className='rounded-full bg-green-600 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none'
            >
              {t('firstaid.call')}
            </a>
          </motion.div>
        )}

        {fire && (
          <motion.div
            className='flex items-center gap-4 rounded-xl bg-orange-50 p-4'
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <MdLocalFireDepartment className='text-2xl text-orange-500' />
            <div className='flex-1'>
              <div className='text-base font-bold text-orange-600'>{t('firstaid.fire')}</div>
              <div className='font-mono text-lg text-gray-800'>{fire}</div>
            </div>
            <a
              href={`tel:${fire}`}
              className='rounded-full bg-orange-500 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none'
            >
              {t('firstaid.call')}
            </a>
          </motion.div>
        )}

        {general && !police && !medical && !fire && (
          <motion.div
            className='flex items-center gap-4 rounded-xl bg-red-50 p-4'
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className='flex-1'>
              <div className='text-base font-bold text-red-700'>{t('firstaid.emergency')}</div>
              <div className='font-mono text-lg text-gray-800'>{general}</div>
            </div>
            <a
              href={`tel:${general}`}
              className='rounded-full bg-red-600 px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none'
            >
              {t('firstaid.call')}
            </a>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className='pt-2 text-center text-sm text-gray-500'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {t('firstaid.tip_112')}
      </motion.div>
    </motion.div>
  );
}
