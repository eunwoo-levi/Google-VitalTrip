import Link from 'next/link';
import { useLogoutMutation } from '../api/useLogoutMutation';
import { useProfileQuery } from '../api/useProfileQuery';

export const AuthButton = ({ closeMenu }: { closeMenu: () => void }) => {
  const { data, isError, error } = useProfileQuery();
  console.log('data@@@@@@@@@@@@@', data);
  const profile = data?.data?.data;
  const isAuthenticated = data?.isAuthenticated;

  console.log('profile nameeee@@@@@@@@@@@@@', profile?.name);

  const { mutateAsync: logoutUser } = useLogoutMutation();

  if (isError) {
    console.log('Error fetching profile:', error.message);
  }

  const handleLogout = async () => {
    await logoutUser();
  };

  if (isAuthenticated) {
    return (
      <div className='flex items-center justify-center md:space-x-2'>
        <span className='text-lg font-semibold'>{profile?.name}</span>
        <button
          onClick={handleLogout}
          className='mx-2 hidden items-center justify-center space-x-2 rounded-md bg-red-600 px-3 py-2 text-white transition-colors duration-200 hover:bg-red-700 md:flex'
        >
          <span>{'LOGOUT'}</span>
        </button>
      </div>
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
