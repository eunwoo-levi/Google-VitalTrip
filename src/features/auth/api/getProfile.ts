export const getProfile = async () => {
  try {
    const response = await fetch('/api/auth/profile');
    if (!response.ok) {
      throw new Error('프로필 조회 실패');
    }
    return await response.json();
  } catch (error) {
    console.error('프로필 조회 실패', error);
    throw error;
  }
};
