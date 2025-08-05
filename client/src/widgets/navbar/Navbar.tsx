'use client';

import { useProfileQuery } from '@/src/features/auth/api/useProfileQuery';
import { AuthButton } from '@/src/features/auth/ui/AuthButton';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const { data, isError, error } = useProfileQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isError) {
    console.error('Error fetching profile:', error.message);
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className='fixed top-0 right-0 left-0 z-50 bg-white font-semibold shadow-lg'>
      <div className='mx-auto px-6 md:px-10'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center space-x-2'>
              <Image
                src='/VitalTrip.svg'
                alt='VitalTrip Logo'
                className='h-12 w-auto'
                width={48}
                height={48}
              />
            </Link>
          </div>

          <div className='hidden items-center space-x-8 font-bold md:flex'>
            <Link
              href='/'
              className='flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
            >
              <span>Home</span>
            </Link>
            <Link
              href='/translate'
              className='flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
            >
              <span>Translate</span>
            </Link>
            <Link
              href='/first-aid'
              className='flex items-center space-x-1 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
            >
              <span>First Aid</span>
            </Link>
          </div>

          <div className='flex items-center justify-center md:space-x-2'>
            <span className='text-lg font-semibold'>{data?.data?.data.name}</span>
            <AuthButton data={data} closeMenu={closeMenu} mobileHidden={true} />
          </div>

          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='rounded-md p-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className='border-t border-gray-200 md:hidden'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ overflow: 'hidden' }}
            >
              <motion.div
                className='space-y-1 px-2 pt-2 pb-3'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link
                  href='/'
                  onClick={closeMenu}
                  className='flex items-center justify-center space-x-2 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
                >
                  <span>Hospital & Pharmacy Nearby</span>
                </Link>
                <Link
                  href='/translate'
                  onClick={closeMenu}
                  className='flex items-center justify-center space-x-2 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
                >
                  <span>Translate</span>
                </Link>
                <Link
                  href='/first-aid'
                  onClick={closeMenu}
                  className='flex items-center justify-center space-x-2 rounded-md px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600'
                >
                  <span>First Aid</span>
                </Link>
                <Link
                  href='/login'
                  onClick={closeMenu}
                  className='mx-2 mt-2 flex items-center justify-center space-x-2 rounded-md bg-blue-600 px-3 py-2 text-white transition-colors duration-200 hover:bg-blue-700'
                >
                  <span>로그인</span>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
