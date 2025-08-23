import { httpClient } from '@/src/shared/utils/httpClient';
import { useQuery } from '@tanstack/react-query';
import { Medical } from '../types/medical';

interface UseMedicalListQueryParams {
  latitude: number;
  longitude: number;
  type?: string;
  radius?: number;
  language?: string;
}

interface UseMedicalListQueryResponse {
  message: string;
  data: Medical[];
}

export const useMedicalListQuery = (params: UseMedicalListQueryParams) => {
  const { latitude, longitude, type, radius, language } = params;
  return useQuery({
    queryKey: ['medicalList', { latitude, longitude, type, radius, language }],
    queryFn: () => getMedicalList({ latitude, longitude, type, radius, language }),
    enabled: !!latitude && !!longitude,
  });
};

const getMedicalList = async (params: UseMedicalListQueryParams) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const response = await httpClient.get<UseMedicalListQueryResponse>(
    `/api/medical?${searchParams.toString()}`,
  );
  return response.data;
};
