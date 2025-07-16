interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  userInfo?: any; // TODO: 사용자 정보 타입 정의 필요
}

export const loginUser = async (formData: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage || '로그인을 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('로그인을 실패했습니다.');
  }
};
