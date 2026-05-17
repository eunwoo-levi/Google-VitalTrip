import { toast } from '@/src/shared/lib/toast/toastStore';
import { APIError } from '@/src/shared/utils/apiError';
import { httpClient } from '@/src/shared/utils/httpClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditProfile } from '../types/editProfile';

export const useEditProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editProfile,
    onError: (error) => {
      if (error instanceof APIError) {
        console.error('API Error:', error.message);
      }
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

const editProfile = async (profileData: EditProfile) => {
  return await httpClient.put('/api/profile/edit', profileData);
};
