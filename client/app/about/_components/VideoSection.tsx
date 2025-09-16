'use client';

import { motion } from 'motion/react';

interface VideoSectionProps {
  translations: ReturnType<typeof import('@/app/about/_utils/translations').getTranslations>;
}

export default function VideoSection({ translations }: VideoSectionProps) {
  const { video } = translations;

  return (
    <section className='bg-white py-20'>
      <div className='mx-auto max-w-4xl px-4 md:px-6'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mb-12 text-center'
        >
          <h2 className='mb-4 text-4xl font-bold text-gray-900'>{video.title}</h2>
          <p className='text-xl text-gray-600'>{video.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl'
        >
          <iframe
            src='https://www.youtube.com/embed/Ikz8brbULTk?rel=0&showinfo=0&modestbranding=1'
            title='VitalTrip Demo'
            className='absolute inset-0 h-full w-full'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            loading='lazy'
          />
        </motion.div>
      </div>
    </section>
  );
}
