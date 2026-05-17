import { toast } from '@/src/shared/lib/toast/toastStore';
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
      toast.success('Logged out successfully.');
      queryClient.removeQueries({ queryKey: ['auth', 'isLoggedIn'] });
      queryClient.removeQueries({ queryKey: ['profile'] });
      router.push('/');
    },
    onError: (error) => {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    },
  });
};

const logoutUser = async () => {
  return await httpClient.post('/api/auth/logout');
};
