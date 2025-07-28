import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signupGoogleUser } from '../api/signupGoogleuser';
import { signupUser } from '../api/signupUser';
import { SignupFormData } from '../types/signup';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleFormChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (isGoogleSignup?: boolean) => {
    setIsLoading(true);
    setError(null);

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

      setFormData({
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        birthDate: '',
        countryCode: '',
        phoneNumber: '',
      });

      router.push('/login');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleFormChange,
    handleSubmit,
  };
};
