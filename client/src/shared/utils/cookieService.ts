import { cookies } from 'next/headers';
import { httpServer } from './httpServer';

interface ValidAccessTokenResponse {
  message: string;
  data: {
    accessToken: string;
  };
}

export async function getValidAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && refreshToken) {
    try {
      const response: ValidAccessTokenResponse = await httpServer.post('/auth/refresh', {
        refreshToken,
      });

      accessToken = response.data.accessToken;
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60,
      });

      return accessToken;
    } catch (error) {
      console.error('accessToken 재발급 실패', error);
      return null;
    }
  }

  return accessToken ?? null;
}

export const getTempToken = async () => {
  const cookieStore = await cookies();
  const tempToken = cookieStore.get('tempToken');
  if (!tempToken) {
    return null;
  }
  return tempToken?.value;
};

export const deleteTokens = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
};
