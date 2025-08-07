import { APIError } from '@/src/shared/utils/apiError';
import { httpClient } from '@/src/shared/utils/httpClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['me'] });
      router.push('/');
    },
    onError: (error) => {
      if (error instanceof APIError) {
        console.error('Logout failed:', error.message);
      }
    },
  });
};

const logoutUser = async () => {
  return await httpClient.post('/api/auth/logout');
};
