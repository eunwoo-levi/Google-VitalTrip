import { httpClient } from '@/src/shared/utils/httpClient';
import { useQuery } from '@tanstack/react-query';
import { useCheckIfLoggedInQuery } from '../../auth/api/checkIfLoggedIn';
import { Profile } from '../types/profile';

export const useProfileQuery = () => {
  const { data: isLoggedIn, isLoading: isCheckingLoggedIn } = useCheckIfLoggedInQuery();

  console.log('isLoggedIn', isLoggedIn);
  console.log('isCheckingLoggedIn', isCheckingLoggedIn);
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: isLoggedIn && !isCheckingLoggedIn,
    staleTime: 1000 * 60 * 10, // 10분
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const getProfile = async (): Promise<Profile> => {
  return await httpClient.get<Profile>('/api/profile/profile');
};
