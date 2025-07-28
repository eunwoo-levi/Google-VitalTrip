export const loginGoogle = async () => {
  try {
    window.location.href = '/api/auth/loginGoogle';
  } catch {
    throw new Error('Failed to login with Google');
  }
};
