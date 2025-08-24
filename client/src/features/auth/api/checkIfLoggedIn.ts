import { httpClient } from '@/src/shared/utils/httpClient';
import { useQuery } from '@tanstack/react-query';

interface AuthResponse {
  isLoggedIn: boolean;
}

export const useCheckIfLoggedInQuery = () => {
  return useQuery({
    queryKey: ['auth', 'isLoggedIn'],
    queryFn: checkIfLoggedIn,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
    refetchOnWindowFocus: false,
    // 에러 시 false로 처리 (로그아웃 상태로 간주)
    select: (data) => Boolean(data),
  });
};

const checkIfLoggedIn = async (): Promise<boolean> => {
  try {
    const response = await httpClient.get<AuthResponse>('/api/auth/isLoggedIn');
    return response.isLoggedIn;
  } catch (error) {
    console.warn('checkIfLoggedIn error', error);
    return false;
  }
};
