import { FetchConfig } from '../types/http';
import { APIError } from './apiError';

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

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || `HTTP ${response.status}`;
      throw new APIError(errorMessage, response.status);
    }

    return data;
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

  getWithoutError(url: string, config?: Omit<FetchConfig, 'method'>): Promise<Response> {
    return requestWithoutError(url, { ...config, method: 'GET' });
  },
};

async function requestWithoutError(url: string, config: FetchConfig = {}): Promise<Response> {
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
