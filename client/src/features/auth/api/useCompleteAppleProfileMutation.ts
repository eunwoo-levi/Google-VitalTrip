import { APIError } from '@/src/shared/utils/apiError';
import { httpClient } from '@/src/shared/utils/httpClient';
import { removeFromSessionStorage } from '@/src/shared/utils/sessionService';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface AppleProfileFormData {
  name: string;
  birthDate: string;
  countryCode: string;
  phoneNumber: string;
}

export const useCompleteAppleProfileMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: completeAppleProfile,
    onSuccess: () => {
      removeFromSessionStorage('apple-profile');
      router.push('/');
    },
    onError: (error) => {
      if (error instanceof APIError) {
        console.error('Profile update failed:', error.message);
      }
    },
  });
};

const completeAppleProfile = async (profile: AppleProfileFormData) => {
  return await httpClient.patch('/api/users/profile', profile);
};
