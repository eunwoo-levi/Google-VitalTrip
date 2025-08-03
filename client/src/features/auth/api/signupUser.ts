import { httpClient } from '@/src/shared/utils/httpClient';
import { SignupFormData } from '../types/signup';

export const signupUser = async (formData: SignupFormData) => {
  return await httpClient.post('/api/auth/signup', formData);
};
