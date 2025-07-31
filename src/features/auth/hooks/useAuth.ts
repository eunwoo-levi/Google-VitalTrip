import { useCallback, useEffect, useState } from 'react';
import { getProfile } from '../api/getProfile';
import { Profile } from '../types/auth';

export const useAuth = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await getProfile();
      if (response.isAuthenticated) {
        setProfile(response.data.data);
        setIsAuthenticated(true);
      } else {
        setProfile(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('프로필 조회 실패', error);
      setProfile(null);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return { profile, isAuthenticated, checkAuthStatus };
};
