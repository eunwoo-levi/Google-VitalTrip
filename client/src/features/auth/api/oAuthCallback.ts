import { httpClient } from '@/src/shared/utils/httpClient';

export const oAuthCallback = async () => {
  try {
    const response = await httpClient.get(`/api/auth/callback${window.location.search}`);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('OAuth Callback Error');
  }
};
