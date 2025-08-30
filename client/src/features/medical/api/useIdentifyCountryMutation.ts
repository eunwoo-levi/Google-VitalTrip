import { httpClient } from '@/src/shared/utils/httpClient';
import { useMutation } from '@tanstack/react-query';
import { IdentifyCountryRequest, IdentifyCountryResponse } from '../types/location';

export const useIdentifyCountryMutation = () => {
  return useMutation({
    mutationFn: identifyCountry,
    onError: (error) => {
      console.error('국가 식별 오류:', error);
    },
  });
};

const identifyCountry = async (
  request: IdentifyCountryRequest,
): Promise<IdentifyCountryResponse> => {
  return await httpClient.post<IdentifyCountryResponse>('/api/identify-country', request);
};
