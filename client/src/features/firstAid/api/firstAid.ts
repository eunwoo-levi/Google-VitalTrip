import { APIError } from '@/src/shared/utils/apiError';
import { httpClient } from '@/src/shared/utils/httpClient';
import { useMutation } from '@tanstack/react-query';
import { FirstAid, Symtoms } from '../type/firstAid';

export const useFirstAidMutation = () => {
  return useMutation({
    mutationFn: postFirstAid,
    onError: (error) => {
      if (error instanceof APIError) {
        console.error(error);
      }
    },
  });
};

const postFirstAid = async (formData: Symtoms): Promise<FirstAid> => {
  return await httpClient.post('/api/first-aid', formData);
};
