import { httpClient } from '@/src/shared/utils/httpClient';

export const checkEmail = async (email: string) => {
  const response = await httpClient.post('/api/auth/check-email', email);
  return response;
};
