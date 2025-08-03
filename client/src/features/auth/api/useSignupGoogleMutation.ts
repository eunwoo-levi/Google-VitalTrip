import { APIError } from '@/src/shared/utils/apiError';
import { httpClient } from '@/src/shared/utils/httpClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface SignupGoogleFormData {
  name: string;
  birthDate: string;
  countryCode: string;
  phoneNumber: string;
}

export const useSignupGoogleMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signupGoogleUser,
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      if (error instanceof APIError) {
        console.error('Signup failed:', error.message);
      }
    },
  });
};

const signupGoogleUser = async (googleProfile: SignupGoogleFormData) => {
  return await httpClient.post('/api/auth/signupGoogle', googleProfile);
};
