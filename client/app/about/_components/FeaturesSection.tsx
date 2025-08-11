'use client';

import { motion } from 'motion/react';
import { FaMapMarkedAlt, FaLanguage, FaRobot, FaHospitalAlt } from 'react-icons/fa';

export default function FeaturesSection() {
  return (
    <section className='bg-white py-20'>
      <div className='mx-auto max-w-6xl px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mb-16 text-center'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='mb-6'
          >
            <div className='mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 text-white shadow-lg'>
              <span className='text-lg font-bold'>🏆</span>
              <span className='ml-2 text-sm font-semibold md:text-base'>
                2025 Google Asia-Pacific Solution Challenge - Top 10 Finalists
              </span>
            </div>
          </motion.div>
          <h2 className='mb-4 text-4xl font-bold text-gray-900'>Why Choose VitalTrip?</h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>
            Overcoming language barriers and quickly locating healthcare facilities worldwide
          </p>
        </motion.div>

        <div className='mb-16'>
          <div className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-500 to-pink-500 p-8 text-center text-white md:p-12'>
            <div className='absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10'></div>
            <div className='relative z-10'>
              <FaRobot className='mx-auto mb-6 text-5xl' />
              <h3 className='mb-4 text-3xl font-bold'>AI First Aid</h3>
              <p className='text-xl text-red-100'>
                Get AI-powered emergency response advice and first aid guidance
              </p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='border-l-4 border-green-500 bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl'
          >
            <FaLanguage className='mx-auto mb-4 text-3xl text-green-500' />
            <h3 className='mb-2 text-lg font-bold text-gray-900'>Smart Translation</h3>
            <p className='text-sm text-gray-600'>
              Translate symptoms and communicate clearly with medical staff
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className='rounded-2xl bg-blue-500 p-6 text-center text-white shadow-lg transition-shadow hover:shadow-xl'
          >
            <FaHospitalAlt className='mx-auto mb-4 text-3xl' />
            <h3 className='mb-2 text-lg font-bold'>Emergency Locations</h3>
            <p className='text-sm text-blue-100'>
              Find nearby hospitals & pharmacies with real-time location data
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='relative rounded-xl border border-purple-200 bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl'
          >
            <div className='absolute top-2 right-2 h-3 w-3 rounded-full bg-purple-500'></div>
            <FaMapMarkedAlt className='mx-auto mb-4 text-3xl text-purple-500' />
            <h3 className='mb-2 text-lg font-bold text-gray-900'>24/7 Support</h3>
            <p className='text-sm text-gray-600'>
              Access travel chatbot and emergency contacts anytime, anywhere
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
