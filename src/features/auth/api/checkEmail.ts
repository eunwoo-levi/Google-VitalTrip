import { httpClient } from '@/src/shared/utils/httpClient';

interface CheckEmailResponse {
  available: boolean;
}

export const checkEmail = async (email: string): Promise<CheckEmailResponse> => {
  const response: CheckEmailResponse = await httpClient.get(`/api/auth/check-email?email=${email}`);
  return response;
};
