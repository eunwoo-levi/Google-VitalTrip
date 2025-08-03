import { httpClient } from '@/src/shared/utils/httpClient';
import { useQuery } from '@tanstack/react-query';
import { Profile } from '../types/auth';

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
  });
};

const getProfile = async (): Promise<ProfileResponse> => {
  return await httpClient.get('/api/auth/profile');
};
