import { httpClient } from '@/src/shared/utils/httpClient';
import { Profile } from '../types/auth';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: Profile;
}

export const loginUser = async (formData: LoginData): Promise<LoginResponse> => {
  try {
    const response: LoginResponse = await httpClient.post('/api/auth/login', formData);

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('로그인을 실패했습니다.');
  }
};
