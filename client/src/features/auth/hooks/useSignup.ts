import { APIError } from '@/src/shared/utils/apiError';
import { useState } from 'react';
import { useSignupGoogleMutation } from '../api/useSignupGoogleMutation';
import { useSignupMutation } from '../api/useSignupMutation';
import type { SignupFormData } from '../types/signup';

export const useSignup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    birthDate: '',
    countryCode: '',
    phoneNumber: '',
  });

  const { mutateAsync: signupUser, isPending, error: signupError } = useSignupMutation();
  const {
    mutateAsync: signupGoogleUser,
    isPending: isGooglePending,
    error: signupGoogleError,
  } = useSignupGoogleMutation();

  const handleFormChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (isGoogleSignup?: boolean) => {
    try {
      if (isGoogleSignup) {
        const googleFormData = {
          name: formData.name,
          birthDate: formData.birthDate,
          countryCode: formData.countryCode,
          phoneNumber: formData.phoneNumber,
        };
        await signupGoogleUser(googleFormData);
      } else {
        await signupUser(formData);
      }
    } catch (error) {
      if (error instanceof APIError) {
        console.error('Signup failed:', error.message);
      } else {
        console.error('Signup failed:', error);
      }
    }
  };

  return {
    formData,
    isLoading: isPending || isGooglePending,
    error: signupError || signupGoogleError,
    handleFormChange,
    handleSubmit,
  };
};
