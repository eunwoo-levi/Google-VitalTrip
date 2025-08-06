import { APIError } from '@/src/shared/utils/apiError';
import { httpClient } from '@/src/shared/utils/httpClient';
import { useMutation } from '@tanstack/react-query';

interface FirstAidRequest {
  symptomType: string;
  symptomDetail: string;
}

interface FirstAidResponse {
  content: string;
  summary: string;
  recommendedAction: string;
  confidence: number;
  blogLinks: string[];
}

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

const postFirstAid = async (formData: FirstAidRequest): Promise<FirstAidResponse> => {
  return await httpClient.post('/api/first-aid', formData);
};
