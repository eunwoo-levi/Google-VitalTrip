interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (formData: LoginData) => {
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
  } catch (error: any) {
    throw new Error(error.message || '로그인을 실패했습니다.');
  }
};
