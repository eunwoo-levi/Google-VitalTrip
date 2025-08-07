import { APIError } from '@/src/shared/utils/apiError';
import { useState } from 'react';
import { useSignupGoogleMutation } from '../api/useSignupGoogleMutation';
import { useSignupMutation } from '../api/useSignupMutation';
import type { SignupErrors, SignupForm } from '../types/signup';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirm,
} from '../utils/validateAuth';

export const useSignup = () => {
  const [signupForm, setSignupForm] = useState<SignupForm>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    birthDate: '',
    countryCode: '',
    phoneNumber: '',
  });
  const [invalidErrors, setInvalidErrors] = useState<SignupErrors>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });
  const { mutateAsync: signupUser, isPending, error: signupError } = useSignupMutation();
  const {
    mutateAsync: signupGoogleUser,
    isPending: isGooglePending,
    error: signupGoogleError,
  } = useSignupGoogleMutation();

  const handleFormChange = (field: keyof SignupForm, value: string) => {
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
    } else if (field === 'passwordConfirm') {
      setInvalidErrors((prev) => {
        return {
          ...prev,
          passwordConfirm: validatePasswordConfirm(signupForm.password, value),
        };
      });
    } else if (field === 'name') {
      setInvalidErrors((prev) => {
        return {
          ...prev,
          name: validateName(value),
        };
      });
    }

    setSignupForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (isGoogleSignup?: boolean) => {
    try {
      if (isGoogleSignup) {
        const googleFormData = {
          name: signupForm.name,
          birthDate: signupForm.birthDate,
          countryCode: signupForm.countryCode,
          phoneNumber: signupForm.phoneNumber,
        };
        await signupGoogleUser(googleFormData);
      } else {
        await signupUser(signupForm);
      }
    } catch (error) {
      if (error instanceof APIError) {
        console.error('Signup failed:', error.message);
      } else {
        console.error('Signup failed:', error);
      }
    }
  };

  const isFirstStepValid =
    invalidErrors.email === '' &&
    invalidErrors.password === '' &&
    invalidErrors.passwordConfirm === '' &&
    signupForm.email !== '' &&
    signupForm.password !== '' &&
    signupForm.passwordConfirm !== '';

  const isSecondStepValid =
    invalidErrors.name === '' &&
    signupForm.name !== '' &&
    signupForm.birthDate !== '' &&
    signupForm.countryCode !== '' &&
    signupForm.phoneNumber !== '';

  return {
    signupForm,
    isLoading: isPending || isGooglePending,
    error: signupError || signupGoogleError,
    handleFormChange,
    handleSubmit,
    isFirstStepValid,
    isSecondStepValid,
    invalidErrors,
  };
};
