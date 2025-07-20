'use client';

import Dropdown from '@/src/shared/ui/Dropdown';
import Modal from '@/src/shared/ui/Modal';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaHome, FaRegHospital } from 'react-icons/fa';
import { MdGTranslate } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';
import { MENU_ITEMS, SYMPTOMS } from '../data/BottomNavigateBarData';
import { useSymptomStore } from '@/src/features/firstAid/store/useSymptomStore';
import { useRouter } from 'next/navigation';
import Chatbot from '@/src/features/chatbot/ui/Chatbot';
import Contact from './Contact';
import EmergencyCall from './EmergencyCall';

const linkClassName =
  'flex items-center cursor-pointer justify-center rounded-full p-2 hover:scale-110 hover:bg-gray-200 transition-transform transition-colors duration-200 ease-in-out';

export default function BottomNavigateBar() {
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [symptomType, setSymptomType] = useState('');
  const [symptomDetail, setSymptomDetail] = useState('');
  const [infoModalCode, setInfoModalCode] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (infoModalCode || isSymptomModalOpen) return;

      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [infoModalCode, isSymptomModalOpen]);

  const { setSymptomData } = useSymptomStore();
  const router = useRouter();

  const handleModal = () => setIsSymptomModalOpen((prev) => !prev);
  const closeModal = () => {
    setIsSymptomModalOpen(false);
  };
  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSymptomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSymptomType(e.target.value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSymptomDetail(e.target.value);
  };

  const handleSubmit = () => {
    setSymptomData(symptomType, symptomDetail);
    closeModal();
    router.push('/first-aid');
  };

  const handleInfoModalOpen = (code: string) => {
    setInfoModalCode(code);
  };

  const handleInfoModalClose = () => {
    setInfoModalCode(null);
  };

  const isDisabled = !symptomType || !symptomDetail;

  return (
    <>
      <div className='fixed bottom-2 left-1/2 z-10 flex h-[60px] w-[98%] -translate-x-1/2 items-center justify-evenly gap-2 rounded-t-xl bg-white shadow-xl'>
        <Link href='/' className={linkClassName}>
          <FaHome size={25} />
        </Link>
        <Link href='/translate' className={linkClassName}>
          <MdGTranslate size={25} />
        </Link>
        <button onClick={handleModal} className={linkClassName}>
          <FaRegHospital size={25} />
        </button>
        <div className='relative'>
          <button onClick={handleMenu} className={linkClassName}>
            <TiThMenu size={25} />
          </button>

          {isMenuOpen && (
            <Dropdown ref={modalRef} direction='top'>
              <ul className='p-2'>
                {MENU_ITEMS.map((item) => (
                  <li key={item.code} className='flex flex-col items-center'>
                    {item.code === 'ABOUT_US' ? (
                      <Link
                        href='/about'
                        className='mb-2 hover:cursor-pointer hover:text-blue-500'
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleInfoModalOpen(item.code)}
                        className='mb-2 hover:cursor-pointer hover:text-blue-500'
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </Dropdown>
          )}
        </div>
        <Chatbot />
      </div>

      {isSymptomModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className='mb-4 text-center text-xl font-bold'>Describe your symptom</h2>
          <select
            className='mb-4 w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
            onChange={handleSymptomChange}
            value={symptomType}
          >
            <option value='' disabled>
              Select symptom
            </option>
            {SYMPTOMS.map((symptom) => (
              <option key={symptom.code} value={symptom.code}>
                {symptom.label}
              </option>
            ))}
          </select>
          <textarea
            className='mb-4 h-32 w-full resize-none rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
            placeholder='Describe your symptoms in detail'
            value={symptomDetail}
            onChange={handleTextareaChange}
          />
          <button
            disabled={isDisabled}
            onClick={handleSubmit}
            className={`w-full rounded-md px-4 py-2 text-white transition-colors duration-200 ${
              isDisabled
                ? 'cursor-not-allowed bg-gray-300'
                : 'cursor-pointer bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Submit
          </button>
        </Modal>
      )}
      {infoModalCode === 'EMERGENCY' && (
        <Modal onClose={handleInfoModalClose}>
          <EmergencyCall />
        </Modal>
      )}
      {infoModalCode === 'CONTACT' && (
        <Modal onClose={handleInfoModalClose}>
          <Contact />
        </Modal>
      )}
    </>
  );
}
