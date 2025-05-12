'use client';

import Dropdown from '@/src/shared/ui/Dropdown';
import Modal from '@/src/shared/ui/Modal';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaHome, FaRegHospital } from 'react-icons/fa';
import { MdGTranslate } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';
import { MENU_ITEMS, SYMPTOMS } from '../model/data';
import { useSymptomStore } from '@/src/features/firstAid/store/useSymptomStore';
import { useRouter } from 'next/navigation';
import Chatbot from '@/src/features/chatbot/ui/Chatbot';
import AboutUs from '../../aboutUs/ui/AboutUs';
import EmergencyCall from '../../emergencyCall/ui/EmergencyCall';
import Contact from '../../contact/ui/Contact';

const linkClassName =
  'flex items-center cursor-pointer justify-center rounded-full p-2 hover:scale-110 hover:bg-gray-200 transition-transform transition-colors duration-200 ease-in-out';

export default function BottomNavigateBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSymptomType, setLocalSymptomType] = useState('');
  const [localSymptomDetail, setLocalSymptomDetail] = useState('');
  const [infoModalCode, setInfoModalCode] = useState<string | null>(null);

  const { setSymptomData } = useSymptomStore();
  const router = useRouter();

  const handleModal = () => setIsModalOpen((prev) => !prev);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSymptomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalSymptomType(e.target.value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalSymptomDetail(e.target.value);
  };

  const handleSubmit = () => {
    setSymptomData(localSymptomType, localSymptomDetail);
    closeModal();
    router.push('/first-aid');
  };

  const handleInfoModalOpen = (code: string) => {
    setInfoModalCode(code);
  };

  const handleInfoModalClose = () => {
    setInfoModalCode(null);
  };

  const isDisabled = !localSymptomType || !localSymptomDetail;

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
        <div className='relative'>
          <button onClick={handleMenu} className={linkClassName}>
            <TiThMenu size={25} />
          </button>

          {isMenuOpen && (
            <Dropdown direction='top'>
              <ul className='p-2'>
                {MENU_ITEMS.map((item) => (
                  <li key={item.code} className='flex flex-col items-center'>
                    <button
                      onClick={() => handleInfoModalOpen(item.code)}
                      className='mb-2 hover:cursor-pointer hover:text-blue-500'
                    >
                      {item.label}
                    </button>
                    {infoModalCode === 'ABOUT_US' && (
                      <Modal onClose={handleInfoModalClose}>
                        <AboutUs />
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
                  </li>
                ))}
              </ul>
            </Dropdown>
          )}
        </div>
        <Chatbot />
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className='mb-4 text-center text-xl font-bold'>Describe your symptom</h2>
          <select
            className='mb-4 w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
            onChange={handleSymptomChange}
            value={localSymptomType}
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
            value={localSymptomDetail}
            onChange={handleTextareaChange}
          />
          <button
            disabled={isDisabled}
            onClick={handleSubmit}
            className={`w-full rounded-md px-4 py-2 text-white transition-colors duration-200 ${
              isDisabled ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Submit
          </button>
        </Modal>
      )}
    </>
  );
}
