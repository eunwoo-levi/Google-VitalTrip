import { useRef, useState } from 'react';

export const useBottonNavigateBarModals = () => {
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [infoModalCode, setInfoModalCode] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const closeSymptomModal = () => {
    setIsSymptomModalOpen(false);
  };

  return {
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
  };
};
