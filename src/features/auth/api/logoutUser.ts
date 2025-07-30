export const logoutUser = async () => {
  try {
    const response = await fetch('/api/auth/logout');
    if (!response.ok) {
      throw new Error('로그아웃 실패');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('로그아웃 실패');
  }
};
