import Link from 'next/link';
import { logoutUser } from '../api/logoutUser';
import { useAuth } from '../hooks/useAuth';

export const AuthButton = ({ closeMenu }: { closeMenu: () => void }) => {
  const { isAuthenticated, profile, checkAuthStatus } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      await checkAuthStatus();
    } catch (error) {
      console.error('로그아웃 실패', error);
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
