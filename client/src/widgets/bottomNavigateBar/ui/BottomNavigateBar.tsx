'use client';

import Chatbot from '@/src/features/chatbot/ui/Chatbot';
import { useSymptomStore } from '@/src/features/firstAid/store/useSymptomStore';
import { useOutsideClick } from '@/src/shared/hooks/useOutsideClick';
import Dropdown from '@/src/shared/ui/Dropdown';
import Modal from '@/src/shared/ui/Modal';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHome, FaRegHospital } from 'react-icons/fa';
import { MdGTranslate } from 'react-icons/md';
import { TiThMenu } from 'react-icons/ti';
import { MENU_ITEMS, SYMPTOMS } from '../data/BottomNavigateBarData';
import { useBottonNavigateBarModals } from '../hooks/useBottonNavigateBarModals';
import { useTempSymptomData } from '../hooks/useTempSymptomData';
import Contact from './Contact';
import EmergencyCall from './EmergencyCall';

const linkClassName =
  'flex items-center cursor-pointer justify-center rounded-full p-2 hover:scale-110 hover:bg-gray-200 transition-transform transition-colors duration-200 ease-in-out';

export default function BottomNavigateBar() {
  const { setSymptomData } = useSymptomStore();
  const { symptomData, updateSymptomData } = useTempSymptomData();
  const {
    isSymptomModalOpen,
    setIsSymptomModalOpen,
    isProfileModalOpen,
    setIsProfileModalOpen,
    isMenuOpen,
    setIsMenuOpen,
    infoModalCode,
    setInfoModalCode,
    menuRef,
    closeSymptomModal,
  } = useBottonNavigateBarModals();
  const router = useRouter();

  useOutsideClick(menuRef, () => {
    if (infoModalCode || isSymptomModalOpen) return;
    setIsMenuOpen(false);
  });

  const handleSubmit = () => {
    setSymptomData(symptomData.type, symptomData.detail);
    closeSymptomModal();
    router.push('/first-aid');
  };

  const isDisabled = !symptomData.type || !symptomData.detail;

  return (
    <>
      <div className='fixed bottom-2 left-1/2 z-10 flex h-[60px] w-[98%] -translate-x-1/2 items-center justify-evenly gap-2 rounded-t-xl bg-white shadow-xl'>
        <Link href='/about' className={linkClassName}>
          <FaHome size={25} />
        </Link>
        <Link href='/translate' className={linkClassName}>
          <MdGTranslate size={25} />
        </Link>
        <button onClick={() => setIsProfileModalOpen((prev) => !prev)} className={linkClassName}>
          <Image src='/logo.webp' alt='logo' width={25} height={25} className='object-contain' />
        </button>
        <button onClick={() => setIsSymptomModalOpen((prev) => !prev)} className={linkClassName}>
          <FaRegHospital size={25} />
        </button>
        <div className='relative'>
          <button onClick={() => setIsMenuOpen((prev) => !prev)} className={linkClassName}>
            <TiThMenu size={25} />
          </button>
          {isMenuOpen && (
            <Dropdown ref={menuRef} direction='top'>
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
                        onClick={() => setInfoModalCode(item.code)}
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
        <Modal key='symptom-modal' onClose={closeSymptomModal}>
          <h2 className='mb-4 text-center text-xl font-bold'>Describe your symptom</h2>
          <select
            className='mb-4 w-full rounded-md border border-gray-300 p-2 text-sm font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none'
            onChange={(e) => updateSymptomData(e)}
            value={symptomData.type}
          >
            <option value='' disabled>
              Select symptom
            </option>
            {SYMPTOMS.map((symptom) => (
              <option key={symptom.code} value={symptom.code} className='font-semibold'>
                {symptom.label}
              </option>
            ))}
          </select>
          <textarea
            className='mb-4 h-32 w-full resize-none rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
            placeholder='Describe your symptoms in detail'
            value={symptomData.detail}
            onChange={(e) => updateSymptomData(e)}
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
        <Modal key='emergency-modal' onClose={() => setInfoModalCode(null)}>
          <EmergencyCall />
        </Modal>
      )}
      {infoModalCode === 'CONTACT' && (
        <Modal key='contact-modal' onClose={() => setInfoModalCode(null)}>
          <Contact />
        </Modal>
      )}
    </>
  );
}
