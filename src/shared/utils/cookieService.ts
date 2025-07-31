import { cookies } from 'next/headers';

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  if (!accessToken) {
    return null;
  }
  return accessToken?.value;
};

export const deleteTokens = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
};
