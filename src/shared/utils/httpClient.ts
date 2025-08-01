import { FetchConfig } from '../types/http';

async function request<T = unknown>(url: string, config: FetchConfig = {}): Promise<T> {
  const { method = 'GET', headers = {}, body } = config;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const httpClient = {
  get<T = unknown>(url: string, config?: Omit<FetchConfig, 'method'>): Promise<T> {
    return request<T>(url, { ...config, method: 'GET' });
  },

  post<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<FetchConfig, 'method' | 'body'>,
  ): Promise<T> {
    return request<T>(url, { ...config, method: 'POST', body });
  },

  put<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<FetchConfig, 'method' | 'body'>,
  ): Promise<T> {
    return request<T>(url, { ...config, method: 'PUT', body });
  },

  patch<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<FetchConfig, 'method' | 'body'>,
  ): Promise<T> {
    return request<T>(url, { ...config, method: 'PATCH', body });
  },

  delete<T = unknown>(url: string, config?: Omit<FetchConfig, 'method'>): Promise<T> {
    return request<T>(url, { ...config, method: 'DELETE' });
  },

  safeGet(url: string, config?: Omit<FetchConfig, 'method'>): Promise<Response> {
    return safeRequest(url, { ...config, method: 'GET' });
  },
};

async function safeRequest(url: string, config: FetchConfig = {}): Promise<Response> {
  const { method = 'GET', headers = {}, body } = config;

  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
