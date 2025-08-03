import { APIError } from '@/src/shared/utils/apiError';
import { httpClient } from '@/src/shared/utils/httpClient';
import { useMutation } from '@tanstack/react-query';

interface CheckEmailResponse {
  available: boolean;
}

export const useCheckEmailMutation = () => {
  return useMutation({
    mutationFn: checkEmail,
    onError: (error) => {
      if (error instanceof APIError) {
        console.error('Check email failed:', error.message);
      }
    },
  });
};

const checkEmail = async (email: string): Promise<CheckEmailResponse> => {
  return await httpClient.get<CheckEmailResponse>(`/api/auth/check-email?email=${email}`);
};
