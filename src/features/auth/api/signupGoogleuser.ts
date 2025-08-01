import { httpClient } from '@/src/shared/utils/httpClient';
import { SignupGoogleFormData } from '../types/signup';

export const signupGoogleUser = async (googleProfile: SignupGoogleFormData) => {
  try {
    const response = await httpClient.post('/api/auth/signupGoogle', googleProfile);

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to sign up with Google');
  }
};
