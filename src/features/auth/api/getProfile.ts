import { httpClient } from '@/src/shared/utils/httpClient';
import type { Profile } from '../types/auth';

interface GetProfileResponse {
  isAuthenticated: boolean;
  data: Profile;
}

export const getProfile = async () => {
  try {
    const response = await httpClient.safeGet('/api/auth/profile');
    const data = await response.json();

    if (!response.ok) {
      return { isAuthenticated: false, data: null };
    }

    return data as GetProfileResponse;
  } catch (error) {
    console.error('프로필 조회 실패', error);
    return { isAuthenticated: false, data: null };
  }
};
