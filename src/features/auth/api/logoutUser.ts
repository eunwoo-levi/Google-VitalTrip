import { httpClient } from '@/src/shared/utils/httpClient';

export const logoutUser = async () => {
  return await httpClient.post('/api/auth/logout');
};
