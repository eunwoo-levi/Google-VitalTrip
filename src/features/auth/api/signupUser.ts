import { httpClient } from '@/src/shared/utils/httpClient';
import { SignupFormData } from '../types/signup';

export const signupUser = async (formData: SignupFormData) => {
  try {
    await httpClient.post('/api/auth/signup', formData);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('회원가입에 실패했습니다.');
  }
};
