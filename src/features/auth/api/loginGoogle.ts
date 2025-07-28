export const loginGoogle = async () => {
  try {
    const response = await fetch('/api/auth/google');

    if (!response.ok) {
      throw new Error('Failed to login with Google');
    }

    return await response.json();
  } catch {
    throw new Error('Failed to login with Google');
  }
};
