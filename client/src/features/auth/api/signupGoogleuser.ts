import { httpClient } from '@/src/shared/utils/httpClient';
import { SignupGoogleFormData } from '../types/signup';

export const signupGoogleUser = async (googleProfile: SignupGoogleFormData) => {
  return await httpClient.post('/api/auth/signupGoogle', googleProfile);
};
