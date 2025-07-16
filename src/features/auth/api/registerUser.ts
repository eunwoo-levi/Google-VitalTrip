interface RegisterUser {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
}

export const registerUser = async (formData: RegisterUser): Promise<RegisterResponse> => {
  try {
    const response = await fetch('/api/auth/register', {
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

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('회원가입에 실패했습니다.');
  }
};
