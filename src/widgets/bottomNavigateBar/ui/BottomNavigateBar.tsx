import Dropdown from '@/src/shared/ui/Dropdown';
import Modal from '@/src/shared/ui/Modal';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaHome, FaRegHospital } from 'react-icons/fa';
import { MdGTranslate } from 'react-icons/md';
import { RiRobot3Line } from 'react-icons/ri';
import { TiThMenu } from 'react-icons/ti';

const linkClassName =
  'flex items-center justify-center rounded-full p-2 hover:scale-110 hover:bg-gray-200 transition-transform transition-colors duration-200 ease-in-out';

export default function BottomNavigateBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleModal = () => setIsModalOpen((prev) => !prev);
  const closeModal = () => setIsModalOpen(false);
  const handleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <div className='fixed bottom-2 left-1/2 z-10 flex h-[80px] w-[95%] -translate-x-1/2 items-center justify-evenly gap-2 rounded-t-xl bg-white shadow-xl'>
        <Link href='/' className={linkClassName}>
          <FaHome size={25} />
        </Link>
        <Link href='/translate' className={linkClassName}>
          <MdGTranslate size={25} />
        </Link>
        <button onClick={handleModal} className={linkClassName}>
          <FaRegHospital size={25} />
        </button>
        <Link href='/ai' className={linkClassName}>
          <RiRobot3Line size={25} />
        </Link>
        <button onClick={handleMenu} className={`relative ${linkClassName}`}>
          <TiThMenu size={25} />
          {isMenuOpen && (
            <Dropdown direction='top'>
              <ul className='p-2'>
                <li className='p-2 hover:bg-gray-100'>돋움말</li>
                <li className='p-2 hover:bg-gray-100'>비상전화</li>
                <li className='p-2 hover:bg-gray-100'>문의하기</li>
              </ul>
            </Dropdown>
          )}
        </button>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className='mb-4 text-center text-xl font-bold'>증상을 설명해주세요.</h2>
          <textarea
            className='mb-4 h-32 w-full resize-none rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
            placeholder='증상을 입력하세요...'
          />
          <button
            onClick={closeModal}
            className='w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600'
          >
            확인
          </button>
        </Modal>
      )}
    </>
  );
}
