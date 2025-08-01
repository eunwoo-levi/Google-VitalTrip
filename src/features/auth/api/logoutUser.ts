import { httpClient } from '@/src/shared/utils/httpClient';

export const logoutUser = async () => {
  try {
    const response = await httpClient.post('/api/auth/logout');
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('로그아웃 실패');
  }
};
