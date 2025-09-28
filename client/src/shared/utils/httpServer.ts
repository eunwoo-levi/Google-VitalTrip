import { FetchConfig } from '../types/http';
import { APIError } from './apiError';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

async function request<T = unknown>(url: string, config: FetchConfig = {}): Promise<T> {
  const { method = 'GET', headers = {}, body } = config;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || `HTTP ${response.status}: an unknown error occurred`;
      console.error('백엔드 에러 메시지', data);
      console.error('HTTP 에러 코드: ', response.status);

      throw new APIError(errorMessage, response.status);
    }
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new APIError('Request timeout', 408);
    }
    throw error;
  }
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
