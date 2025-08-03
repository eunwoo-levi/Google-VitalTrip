import { APIError } from '@/src/shared/utils/apiError';
import { useCallback, useEffect, useState } from 'react';
import { getProfile } from '../api/getProfile';
import { Profile } from '../types/auth';

interface GetProfileResponse {
  isAuthenticated: boolean;
  data: Profile;
}
export const useAuth = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await getProfile();
      const profileResponse: GetProfileResponse = await response.json();

      if (profileResponse.isAuthenticated && profileResponse.data) {
        setProfile(profileResponse.data);
        setIsAuthenticated(true);
      } else {
        setProfile(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      if (error instanceof APIError && error.status === 401) {
        console.error('Profile error:', error.message, error.status);
      }
      setProfile(null);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return { profile, isAuthenticated };
};
