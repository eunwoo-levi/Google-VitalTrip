import { httpClient } from '@/src/shared/utils/httpClient';

export const oAuthCallback = async () => {
  return await httpClient.get(`/api/auth/callback${window.location.search}`);
};
