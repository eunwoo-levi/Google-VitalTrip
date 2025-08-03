import { useState } from 'react';
import { useCheckEmailMutation } from '../api/useCheckEmailMutation';

export const useCheckEmail = () => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const { mutateAsync: checkEmailMutation, isPending, error } = useCheckEmailMutation();

  const checkEmail = async (email: string) => {
    try {
      const { available } = await checkEmailMutation(email);
      if (available) {
        setIsAvailable(true);
        setMessage('This email is available.');
      } else if (!available) {
        setIsAvailable(false);
        setMessage('This email is already in use.');
      }
    } catch {
      setIsAvailable(false);
      setMessage(error?.message || 'Failed to check email availability');
    }
  };

  return { message, isAvailable, checkEmail, isLoading: isPending };
};
