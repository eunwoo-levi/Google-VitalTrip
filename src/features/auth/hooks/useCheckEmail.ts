import { useState } from 'react';
import { checkEmail as checkEmailApi } from '../api/checkEmail';

export const useCheckEmail = () => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const checkEmail = async (email: string) => {
    setIsLoading(true);
    try {
      const { available } = await checkEmailApi(email);
      if (available) {
        setIsAvailable(true);
        setMessage('사용 가능한 이메일입니다.');
      } else if (!available) {
        setIsAvailable(false);
        setMessage('이미 사용 중인 이메일입니다.');
      }
    } catch (error) {
      setIsAvailable(false);
      setMessage('이메일 중복 확인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { message, isAvailable, checkEmail, isLoading };
};
