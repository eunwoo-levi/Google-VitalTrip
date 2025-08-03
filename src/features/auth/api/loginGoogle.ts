export const loginGoogle = async () => {
  try {
    window.location.href = '/api/auth/loginGoogle';
  } catch (error) {
    throw error;
  }
};
