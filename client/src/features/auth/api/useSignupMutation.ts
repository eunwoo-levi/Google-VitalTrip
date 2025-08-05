import { APIError } from '@/src/shared/utils/apiError';
import { httpClient } from '@/src/shared/utils/httpClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { SignupFormData } from '../types/signup';

export const useSignupMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      if (error instanceof APIError) {
        console.error('Signup failed:', error.message);
      }
    },
  });
};

const signupUser = async (formData: SignupFormData) => {
  return await httpClient.post('/api/auth/signup', formData);
};
