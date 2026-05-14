import { httpClient } from '@/src/shared/utils/httpClient';

interface AppleLoginPayload {
  identityToken: string;
  fullName?: {
    givenName?: string;
    familyName?: string;
  };
  email?: string;
}

export const loginApple = async (payload: AppleLoginPayload): Promise<void> => {
  await httpClient.post('/api/auth/apple', payload);
};
