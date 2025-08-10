import { httpClient } from '@/src/shared/utils/httpClient';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { checkIfLoggedIn } from '../../auth/api/checkIfLoggedIn';
import { Profile } from '../types/profile';

interface ProfileResponse {
  isAuthenticated: boolean;
  data: {
    data: Profile;
  };
}

export const useProfileQuery = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const checkingLoggedin = async () => {
      const result = await checkIfLoggedIn();
      setIsLoggedIn(result);
    };
    checkingLoggedin();
  }, []);

  return useQuery<ProfileResponse>({
    queryKey: ['me'],
    queryFn: getProfile,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 10, // 10분
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const getProfile = async (): Promise<ProfileResponse> => {
  return await httpClient.get('/api/profile/profile');
};
