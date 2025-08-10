import { httpClient } from '@/src/shared/utils/httpClient';

interface AuthResponse {
  isLoggedIn: boolean;
}

export const checkIfLoggedIn = async (): Promise<boolean> => {
  const response = await httpClient.get<AuthResponse>('/api/auth/isLoggedIn');
  return response.isLoggedIn;
};
