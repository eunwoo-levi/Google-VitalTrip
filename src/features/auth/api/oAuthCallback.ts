export const oAuthCallback = async () => {
  try {
    const response = await fetch(`/api/auth/callback${window.location.search}`);
    if (!response.ok) {
      throw new Error('OAuth Callback Error');
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('OAuth Callback Error');
  }
};
