import { httpClient } from '@/src/shared/utils/httpClient';

export const getProfile = async () => {
  return await httpClient.getWithoutError('/api/auth/profile');
};
