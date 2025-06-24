import { motion } from 'motion/react';
import { MdEmail, MdContactSupport } from 'react-icons/md';
import { FaRegSmile } from 'react-icons/fa';
import CopyEmailButton from '@/src/shared/ui/CopyEmailButton';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex flex-col items-center gap-2'>
        <MdEmail className='mb-1 text-5xl text-blue-600 drop-shadow' />
        <h2 className='text-3xl font-extrabold tracking-tight text-blue-700'>Contact Us</h2>
        <span className='text-base font-semibold text-blue-500'>We're here to help you!</span>
      </div>
      <section className='mt-6 text-center text-lg font-medium text-gray-700'>
        <p>
          If you have any questions, feedback, or need support, please don't hesitate to reach out.
          <br />
          We value your input and aim to respond within{' '}
          <span className='font-bold text-blue-700'>24 hours</span>.
        </p>
      </section>
      <section className='mt-8 flex flex-col items-center gap-2'>
        <CopyEmailButton />
        <span className='text-xs text-gray-500'>We usually respond quickly!</span>
      </section>
      <footer className='mt-8 flex flex-col gap-2 border-t pt-6 text-center text-base font-bold text-blue-700'>
        <span className='flex items-center justify-center gap-1'>
          <FaRegSmile className='text-lg' />
          Feel free to share any feedback!
        </span>
      </footer>
    </motion.div>
  );
}
