import { SignupFormData, SignupResponse } from '../types/signup';

export const signupUser = async (formData: SignupFormData): Promise<SignupResponse> => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage || '회원가입에 실패했습니다.');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('회원가입에 실패했습니다.');
  }
};
