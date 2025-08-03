export const getFromLocalStorage = (key: string) => {
  const dataFromLocalStorage = localStorage.getItem(key);
  if (!dataFromLocalStorage) {
    throw new Error('Local storage not found');
  }
  return JSON.parse(dataFromLocalStorage);
};

export const setToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getFromSessionStorage = (key: string) => {
  const dataFromSessionStoreage = sessionStorage.getItem(key);
  if (!dataFromSessionStoreage) {
    throw new Error('Session storage not found');
  }
  return JSON.parse(dataFromSessionStoreage);
};

export const setToSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const removeFromSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};
