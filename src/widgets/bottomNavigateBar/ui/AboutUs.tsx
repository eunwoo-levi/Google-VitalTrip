import { motion } from 'motion/react';
import {
  FaGlobeAmericas,
  FaHospitalAlt,
  FaLanguage,
  FaRobot,
  FaMapMarkedAlt,
} from 'react-icons/fa';
import { MdHealthAndSafety } from 'react-icons/md';

export default function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex flex-col items-center gap-2'>
        <MdHealthAndSafety className='mb-1 text-5xl text-blue-600 drop-shadow' />
        <h2 className='text-3xl font-extrabold tracking-tight text-blue-800'>About VitalTrip</h2>
        <span className='text-base font-semibold text-blue-500'>
          Your Essential Travel Safety Companion
        </span>
      </div>
      <section className='mt-6 text-center text-lg font-medium text-gray-700'>
        <p>
          <strong>VitalTrip</strong> helps travelers handle medical emergencies abroad — overcoming
          language barriers and quickly locating nearby healthcare facilities.
        </p>
      </section>
      <section className='mt-8'>
        <h3 className='mb-4 flex items-center gap-2 text-xl font-bold text-gray-900'>
          <FaGlobeAmericas className='text-blue-400' /> Key Features
        </h3>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='flex items-center gap-3 rounded-xl bg-blue-50 p-4 shadow-sm'>
            <FaHospitalAlt className='text-2xl text-blue-500' />
            <span>Find nearby hospitals & pharmacies</span>
          </div>
          <div className='flex items-center gap-3 rounded-xl bg-blue-50 p-4 shadow-sm'>
            <FaLanguage className='text-2xl text-blue-500' />
            <span>Translate symptoms for clear communication</span>
          </div>
          <div className='flex items-center gap-3 rounded-xl bg-blue-50 p-4 shadow-sm'>
            <FaRobot className='text-2xl text-blue-500' />
            <span>AI chatbot for emergency response</span>
          </div>
          <div className='flex items-center gap-3 rounded-xl bg-blue-50 p-4 shadow-sm'>
            <FaMapMarkedAlt className='text-2xl text-blue-500' />
            <span>Smart travel info & location-based help</span>
          </div>
        </div>
      </section>
      <footer className='mt-8 border-t pt-6 text-center text-base font-bold text-blue-700'>
        VitalTrip — Stay safe, travel smart.
      </footer>
    </motion.div>
  );
}
