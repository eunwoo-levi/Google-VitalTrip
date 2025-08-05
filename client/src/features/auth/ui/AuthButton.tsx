import Link from 'next/link';
import { ProfileResponse } from '../../profile/types/profile';
import { useLogoutMutation } from '../api/useLogoutMutation';

interface AuthButtonProps {
  data: ProfileResponse | undefined;
  closeMenu?: () => void;
  mobileHidden?: boolean;
}

export const AuthButton = ({ data, closeMenu, mobileHidden }: AuthButtonProps) => {
  const isAuthenticated = data?.isAuthenticated ?? false;

  const mobileHiddenClass = mobileHidden ? 'hidden md:flex' : '';

  const { mutateAsync: logoutUser } = useLogoutMutation();

  const handleLogout = async () => {
    await logoutUser();
  };

  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        className={`${mobileHiddenClass} items-center justify-center rounded-md bg-red-600 px-3 py-2 font-semibold text-white transition-colors duration-200 hover:bg-red-700`}
      >
        LOGOUT
      </button>
    );
  }

  return (
    <Link
      href='/login'
      onClick={closeMenu}
      className={`${mobileHiddenClass} items-center justify-center rounded-md bg-blue-600 px-3 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 md:flex`}
    >
      LOGIN
    </Link>
  );
};
