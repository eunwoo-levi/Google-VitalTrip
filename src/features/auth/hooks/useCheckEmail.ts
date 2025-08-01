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
        setMessage('This email is available.');
      } else if (!available) {
        setIsAvailable(false);
        setMessage('This email is already in use.');
      }
    } catch {
      setIsAvailable(false);
      setMessage('Failed to check email availability.');
    } finally {
      setIsLoading(false);
    }
  };

  return { message, isAvailable, checkEmail, isLoading };
};
