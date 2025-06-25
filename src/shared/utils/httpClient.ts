const API_BASE_URL = process.env.API_BASE_URL || '';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

interface RequestOptions {
  headers?: HeadersInit;
  signal?: AbortSignal;
}

export const httpClient = {
  get: async <T>({ path, headers, signal }: { path: string } & RequestOptions): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: { ...defaultHeaders, ...headers },
      signal,
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  },

  post: async <T>({
    path,
    body,
    headers,
    signal,
  }: { path: string; body?: unknown } & RequestOptions): Promise<T | void> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { ...defaultHeaders, ...headers },
      body: JSON.stringify(body),
      signal,
    });
    if (!response.ok) throw new Error(response.statusText);

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    return;
  },

  delete: async ({ path, headers, signal }: { path: string } & RequestOptions): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: { ...defaultHeaders, ...headers },
      signal,
    });
    if (!response.ok) throw new Error(response.statusText);
  },

  put: async <T>({
    path,
    body,
    headers,
    signal,
  }: { path: string; body: unknown } & RequestOptions): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: { ...defaultHeaders, ...headers },
      body: JSON.stringify(body),
      signal,
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  },

  patch: async <T>({
    path,
    body,
    headers,
    signal,
  }: { path: string; body: unknown } & RequestOptions): Promise<T | void> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PATCH',
      headers: { ...defaultHeaders, ...headers },
      body: JSON.stringify(body),
      signal,
    });
    if (!response.ok) throw new Error(response.statusText);

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }
    return;
  },
};
