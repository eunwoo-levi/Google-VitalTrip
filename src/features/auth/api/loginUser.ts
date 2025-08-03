import { httpClient } from '@/src/shared/utils/httpClient';
import { Profile } from '../types/auth';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: Profile;
}

export const loginUser = async (formData: LoginData): Promise<LoginResponse> => {
  return await httpClient.post<LoginResponse>('/api/auth/login', formData);
};
