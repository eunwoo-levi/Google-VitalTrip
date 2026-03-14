'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import Dropdown from '@/src/shared/ui/Dropdown';
import { LanguageSwitcher } from '@/src/widgets/bottomNavigateBar/ui/LanguageSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import { TiThMenu } from '@/src/shared/ui/icons';
import { MENU_ITEMS } from '../data/BottomNavigateBarData';

const linkClassName =
  'flex items-center cursor-pointer justify-center rounded-full p-2 hover:scale-110 hover:bg-gray-200 transition-transform transition-colors duration-200 ease-in-out';

interface MenuDropdownProps {
  isMenuOpen: boolean;
  menuRef: React.Ref<HTMLDivElement>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoModalCode: React.Dispatch<React.SetStateAction<string | null>>;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuDropdown = ({
  isMenuOpen,
  menuRef,
  setIsMenuOpen,
  setInfoModalCode,
  setIsProfileModalOpen,
}: MenuDropdownProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen((prev) => !prev);
        }}
        aria-label='메뉴 열기'
        aria-expanded={isMenuOpen}
        className={linkClassName}
      >
        <TiThMenu size={25} className='text-red-500' />
      </button>
      {isMenuOpen && (
        <Dropdown direction='top'>
          <ul className='p-3'>
            <li className='w-full'>
              <button
                onClick={() => {
                  setIsProfileModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className='mb-2 flex w-full items-center justify-center gap-2 rounded-md p-2 transition-all duration-200 hover:bg-gray-100 hover:text-red-500'
              >
                <Image
                  src='/logo.webp'
                  alt='logo'
                  width={18}
                  height={18}
                  className='object-contain'
                />
                {t('menu.mypage')}
              </button>
            </li>
            {MENU_ITEMS.map((item) => (
              <li key={item.code} className='w-full'>
                {item.code === 'ABOUT_US' ? (
                  <Link
                    href='/about'
                    className='mb-2 block w-full rounded-md p-2 text-center font-semibold text-red-500 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-red-50'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(`menu.${item.code.toLowerCase()}`)}
                  </Link>
                ) : (
                  <button
                    onClick={() => setInfoModalCode(item.code)}
                    className='mb-2 w-full rounded-md p-2 transition-all duration-200 hover:bg-gray-100 hover:text-red-500'
                  >
                    {t(`menu.${item.code.toLowerCase()}`)}
                  </button>
                )}
              </li>
            ))}
            <li className='mt-4 flex flex-col items-center border-t pt-3'>
              <div className='mb-2 text-xs text-gray-600'>Language</div>
              <LanguageSwitcher />
            </li>
          </ul>
        </Dropdown>
      )}
    </div>
  );
};
