import { httpClient } from '@/src/shared/utils/httpClient';
import { useQuery } from '@tanstack/react-query';
import { Profile } from '../types/profile';

interface ProfileResponse {
  isAuthenticated: boolean;
  data: {
    data: Profile;
  };
}

export const useProfileQuery = () => {
  return useQuery<ProfileResponse>({
    queryKey: ['me'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const getProfile = async (): Promise<ProfileResponse> => {
  return await httpClient.get('/api/profile/profile');
};
