import { httpClient } from '@/src/shared/utils/httpClient';

interface CheckEmailResponse {
  available: boolean;
}

export const checkEmail = async (email: string): Promise<CheckEmailResponse> => {
  return await httpClient.get<CheckEmailResponse>(`/api/auth/check-email?email=${email}`);
};
