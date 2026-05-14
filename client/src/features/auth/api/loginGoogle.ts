declare global {
  interface Window {
    ReactNativeWebView?: { postMessage: (msg: string) => void };
  }
}

export const loginGoogle = () => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'GOOGLE_SIGN_IN' }));
  } else {
    window.location.href = '/api/auth/loginGoogle';
  }
};
