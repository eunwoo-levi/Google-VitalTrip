import { useEffect, useState } from 'react';
import { EMERGENCY_CALL_DB } from '@/src/widgets/bottomNavigateBar/data/emergencyCallData';

interface EmergencyNumbers {
  country: string;
  police: string;
  ambulance: string;
  fire: string;
}

interface useEmergencyNumbersReturn {
  emergencyInfo: EmergencyNumbers | null;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export const useEmergencyNumbers = (): useEmergencyNumbersReturn => {
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyNumbers | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const detectCountryAndSetEmergencyInfo = async (abortController: AbortController) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/location', {
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const locationData = await response.json();
      const countryCode = locationData.country_code?.toUpperCase();

      if (!countryCode) {
        throw new Error('Country code not found in response');
      }

      const emergencyNumbers = EMERGENCY_CALL_DB[countryCode];

      if (!abortController.signal.aborted) {
        if (emergencyNumbers) {
          setEmergencyInfo(emergencyNumbers);
        } else {
          setError('Emergency contact information not available for your country.');
        }
      }
    } catch (err) {
      if (!abortController.signal.aborted) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Emergency number detection failed:', errorMessage);
        setError('Failed to detect your location. Please check your internet connection.');
      }
    } finally {
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    detectCountryAndSetEmergencyInfo(abortController);

    return () => {
      abortController.abort();
    };
  }, [retryCount]);

  const retry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return {
    emergencyInfo,
    isLoading,
    error,
    retry,
  };
};
