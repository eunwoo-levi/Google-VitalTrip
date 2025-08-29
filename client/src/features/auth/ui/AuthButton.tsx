import Link from 'next/link';
import { useCheckIfLoggedInQuery } from '../api/checkIfLoggedIn';
import { useLogoutMutation } from '../api/useLogoutMutation';

interface AuthButtonProps {
  closeMenu?: () => void;
  mobileHidden?: boolean;
}

export const AuthButton = ({ closeMenu, mobileHidden }: AuthButtonProps) => {
  const { data: isAuthenticated } = useCheckIfLoggedInQuery();

  const mobileHiddenClass = mobileHidden ? 'hidden md:flex' : '';

  const { mutateAsync: logoutUser } = useLogoutMutation();

  const handleLogout = async () => {
    await logoutUser();
    closeMenu?.();
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
