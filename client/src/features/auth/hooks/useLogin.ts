import { useState } from 'react';
import { useLoginMutation } from '../api/useLoginMutation';
import type { LoginErrors } from '../types/signup';
import { isLoginFormValid, validateEmail, validatePassword } from '../utils/validateAuth';

export const useLogin = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [invalidErrors, setInvalidErrors] = useState<LoginErrors>({
    email: '',
    password: '',
  });
  const { mutateAsync: loginUser, isPending, isError, error } = useLoginMutation();

  const updateLoginForm = (field: string, value: string) => {
    if (field === 'email') {
      setInvalidErrors((prev) => {
        return {
          ...prev,
          email: validateEmail(value),
        };
      });
    } else if (field === 'password') {
      setInvalidErrors((prev) => {
        return {
          ...prev,
          password: validatePassword(value),
        };
      });
    }

    setLoginForm((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginUser(loginForm);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const isValid = isLoginFormValid(invalidErrors) && loginForm.email && loginForm.password;

  return {
    loginForm,
    updateLoginForm,
    handleLoginSubmit,
    isPending,
    isError,
    error,
    isValid,
    invalidErrors,
  };
};
