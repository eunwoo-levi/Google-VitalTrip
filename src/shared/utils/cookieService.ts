import { cookies } from 'next/headers';

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  if (!accessToken) {
    return null;
  }
  return accessToken?.value;
};

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
