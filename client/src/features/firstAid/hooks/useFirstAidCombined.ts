import { useCurrentLocation } from '@/src/shared/hooks/useCurrentLocation';
import { httpClient } from '@/src/shared/utils/httpClient';
import { useQuery } from '@tanstack/react-query';
import { useSymptomStore } from '../store/useSymptomStore';
import { FirstAidCombinedResponse } from '../type/firstAid';

export const useFirstAidCombined = () => {
  const { symptomType, symptomDetail } = useSymptomStore();
  const { coords, isLoading: isLocationLoading, error: locationError } = useCurrentLocation();

  const defaultCoords = { latitude: 37.5665, longitude: 126.978 };
  const latitude = coords?.latitude ?? defaultCoords.latitude;
  const longitude = coords?.longitude ?? defaultCoords.longitude;
  const radius = 5000;
  const language = 'ko';

  const enabled =
    !isLocationLoading && !!coords && !locationError && !!symptomType && !!symptomDetail;

  const {
    data: combined,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: [
      'firstAidCombined',
      {
        symptomType,
        symptomDetail,
        latitude,
        longitude,
        radius,
        language,
      },
    ],
    enabled,
    queryFn: async (): Promise<FirstAidCombinedResponse> => {
      const response = await httpClient.post<{ message: string; data: FirstAidCombinedResponse }>(
        '/api/first-aid/combined',
        {
          symptomType,
          symptomDetail,
          latitude,
          longitude,
          radius,
          language,
        },
      );

      return response.data;
    },
  });

  return {
    combined,
    isPending: isPending || isLocationLoading,
    isError: isError || !!locationError,
    error: error || locationError,
    locationError,
  };
};
