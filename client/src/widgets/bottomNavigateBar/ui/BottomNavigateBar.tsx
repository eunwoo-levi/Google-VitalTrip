'use client';

import Chatbot from '@/src/features/chatbot/ui/Chatbot';
import { useSymptomStore } from '@/src/features/firstAid/store/useSymptomStore';
import { UserProfileInfo } from '@/src/features/profile/ui/UserProfileInfo';
import { useOutsideClick } from '@/src/shared/hooks/useOutsideClick';
import Modal from '@/src/shared/ui/Modal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaMapMarkedAlt, FaRegHospital, MdGTranslate, MdOutlineWarningAmber } from '@/src/shared/ui/icons';
import { useBottonNavigateBarModals } from '../hooks/useBottonNavigateBarModals';
import { useTempSymptomData } from '../hooks/useTempSymptomData';
import Contact from './Contact';
import EmergencyCall from './EmergencyCall';
import { MenuDropdown } from './MenuDropdown';
import { SymptomModal } from './SymptomModal';

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
      <div className='fixed bottom-2 left-1/2 z-10 flex h-[60px] w-[98%] -translate-x-1/2 items-center justify-evenly gap-2 rounded-t-xl bg-white shadow-xl will-change-transform'>
        <Link href='/' aria-label='홈으로 이동' className={linkClassName}>
          <FaMapMarkedAlt size={25} className='text-red-500' />
        </Link>

        <Link href='/translate' aria-label='의료 번역 페이지로 이동' className={linkClassName}>
          <MdGTranslate size={25} className='text-red-500' />
        </Link>

        <button aria-label='증상 입력 열기' onClick={() => setIsSymptomModalOpen((prev) => !prev)} className={linkClassName}>
          <FaRegHospital size={25} className='text-red-500' />
        </button>

        <Link href='/alerts' aria-label='여행 경보 페이지로 이동' className={linkClassName}>
          <MdOutlineWarningAmber size={25} className='text-red-500' />
        </Link>

        <MenuDropdown
          isMenuOpen={isMenuOpen}
          menuRef={menuRef}
          setIsMenuOpen={setIsMenuOpen}
          setInfoModalCode={setInfoModalCode}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />
        <Chatbot />
      </div>

      {isSymptomModalOpen && (
        <SymptomModal
          closeSymptomModal={closeSymptomModal}
          updateSymptomData={updateSymptomData}
          symptomData={symptomData}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
        />
      )}
      {isProfileModalOpen && (
        <Modal key='profile-modal' onClose={() => setIsProfileModalOpen(false)}>
          <UserProfileInfo onClose={() => setIsProfileModalOpen(false)} />
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
