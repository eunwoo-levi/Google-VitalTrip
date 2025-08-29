'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import Dropdown from '@/src/shared/ui/Dropdown';
import { LanguageSwitcher } from '@/src/widgets/bottomNavigateBar/ui/LanguageSwitcher';
import Link from 'next/link';
import { TiThMenu } from 'react-icons/ti';
import { MENU_ITEMS } from '../data/BottomNavigateBarData';

const linkClassName =
  'flex items-center cursor-pointer justify-center rounded-full p-2 hover:scale-110 hover:bg-gray-200 transition-transform transition-colors duration-200 ease-in-out';

interface MenuDropdownProps {
  isMenuOpen: boolean;
  menuRef: React.Ref<HTMLDivElement>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoModalCode: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MenuDropdown = ({
  isMenuOpen,
  menuRef,
  setIsMenuOpen,
  setInfoModalCode,
}: MenuDropdownProps) => {
  const { t } = useTranslation('common');

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen((prev) => !prev);
        }}
        className={linkClassName}
      >
        <TiThMenu size={25} className='text-blue-500' />
      </button>
      {isMenuOpen && (
        <Dropdown direction='top'>
          <ul className='p-3'>
            {MENU_ITEMS.map((item) => (
              <li key={item.code} className='w-full'>
                {item.code === 'ABOUT_US' ? (
                  <Link
                    href='/about'
                    className='mb-2 block w-full rounded-md p-2 text-center font-semibold text-blue-500 transition-all duration-200 ease-in-out hover:scale-105 hover:bg-blue-50'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(`menu.${item.code.toLowerCase()}`)}
                  </Link>
                ) : (
                  <button
                    onClick={() => setInfoModalCode(item.code)}
                    className='mb-2 w-full rounded-md p-2 transition-all duration-200 hover:bg-gray-100 hover:text-blue-500'
                  >
                    {t(`menu.${item.code.toLowerCase()}`)}
                  </button>
                )}
              </li>
            ))}
            <li className='mt-4 flex flex-col items-center border-t pt-3'>
              <div className='mb-2 text-xs text-gray-500'>Language</div>
              <LanguageSwitcher />
            </li>
          </ul>
        </Dropdown>
      )}
    </div>
  );
};
