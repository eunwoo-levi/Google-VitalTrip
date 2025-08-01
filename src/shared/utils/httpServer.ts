// utils/httpServer.ts
import { FetchConfig } from '../types/http';

const BASE_URL = process.env.API_BASE_URL;

async function request<T = unknown>(url: string, config: FetchConfig = {}): Promise<T> {
  const { method = 'GET', headers = {}, body } = config;

  const response = await fetch(`${BASE_URL}${url}`, {
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
}

export const httpServer = {
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

  delete<T = unknown>(url: string, config?: Omit<FetchConfig, 'method'>): Promise<T> {
    return request<T>(url, { ...config, method: 'DELETE' });
  },

  patch<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<FetchConfig, 'method' | 'body'>,
  ): Promise<T> {
    return request<T>(url, { ...config, method: 'PATCH', body });
  },
};
