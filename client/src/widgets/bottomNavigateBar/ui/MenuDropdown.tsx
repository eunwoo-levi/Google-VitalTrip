import Dropdown from '@/src/shared/ui/Dropdown';
import Link from 'next/link';
import { TiThMenu } from 'react-icons/ti';
import { MENU_ITEMS } from '../data/BottomNavigateBarData';

const linkClassName =
  'flex items-center cursor-pointer justify-center rounded-full p-2 hover:scale-110 hover:bg-gray-200 transition-transform transition-colors duration-200 ease-in-out';

export const MenuDropdown = ({
  isMenuOpen,
  menuRef,
  setIsMenuOpen,
  setInfoModalCode,
}: {
  isMenuOpen: boolean;
  menuRef: React.Ref<HTMLDivElement>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoModalCode: React.Dispatch<React.SetStateAction<string | null>>;
}) => (
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
        <ul className='p-2'>
          {MENU_ITEMS.map((item) => (
            <li key={item.code} className='flex flex-col items-center'>
              {item.code === 'ABOUT_US' ? (
                <Link
                  href='/about'
                  className='mb-2 font-semibold text-blue-500 transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer'
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
);
