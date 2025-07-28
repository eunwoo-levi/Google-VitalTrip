import { SignupGoogleFormData } from '../types/signup';

export const signupGoogleUser = async (googleProfile: SignupGoogleFormData) => {
  try {
    const response = await fetch('/api/auth/signupGoogle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(googleProfile),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage || 'Failed to sign up with Google');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to sign up with Google');
  }
};
