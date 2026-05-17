import { toast } from '@/src/shared/lib/toast/toastStore';
import { APIError } from '@/src/shared/utils/apiError';
import { httpClient } from '@/src/shared/utils/httpClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Profile } from '../../profile/types/profile';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: Profile;
}

export const useLoginMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success('Logged in successfully.');
      queryClient.invalidateQueries({ queryKey: ['auth', 'isLoggedIn'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      router.push('/');
    },
    onError: (error) => {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    },
  });
};

const loginUser = async (formData: LoginData): Promise<LoginResponse> => {
  return await httpClient.post<LoginResponse>('/api/auth/login', formData);
};
