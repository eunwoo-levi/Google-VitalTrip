import { APIError } from '@/src/shared/utils/apiError';
import { httpClient } from '@/src/shared/utils/httpClient';
import { useQuery } from '@tanstack/react-query';
import { useCheckIfLoggedInQuery } from '../../auth/api/checkIfLoggedIn';
import { Profile } from '../types/profile';

export const useProfileQuery = () => {
  const { data: isLoggedIn, isLoading: isCheckingLoggedIn } = useCheckIfLoggedInQuery();

  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: Boolean(isLoggedIn) && !isCheckingLoggedIn,
    staleTime: 1000 * 60 * 10, // 10분
    retry: (failureCount, error: unknown) => {
      if (error instanceof APIError && (error.status === 401 || error.status === 404)) {
        return false;
      }
      return failureCount < 1;
    },
    refetchOnWindowFocus: false,
  });
};

const getProfile = async (): Promise<Profile> => {
  return await httpClient.get<Profile>('/api/profile/profile');
};
