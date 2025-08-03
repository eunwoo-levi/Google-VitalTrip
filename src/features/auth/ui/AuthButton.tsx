import { APIError } from '@/src/shared/utils/apiError';
import Link from 'next/link';
import { logoutUser } from '../api/logoutUser';
import { useAuth } from '../hooks/useAuth';

export const AuthButton = ({ closeMenu }: { closeMenu: () => void }) => {
  const { isAuthenticated, profile } = useAuth();

  // 프로필 모달 구현 필요
  console.log('profile', profile);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      if (error instanceof APIError) {
        console.error('Logout error:', error.message, error.status);
      }
    }
  };

  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        className='mx-2 hidden items-center justify-center space-x-2 rounded-md bg-red-600 px-3 py-2 text-white transition-colors duration-200 hover:bg-red-700 md:flex'
      >
        <span>LOGOUT</span>
      </button>
    );
  }

  return (
    <Link
      href='/login'
      onClick={closeMenu}
      className='mx-2 hidden items-center justify-center space-x-2 rounded-md bg-blue-600 px-3 py-2 text-white transition-colors duration-200 hover:bg-blue-700 md:flex'
    >
      <span>LOGIN</span>
    </Link>
  );
};
