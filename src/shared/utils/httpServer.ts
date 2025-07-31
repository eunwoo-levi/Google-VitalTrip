import { FetchConfig } from '../types/http';

const BASE_URL = process.env.API_BASE_URL;

export const httpServer = {
  async request<T = unknown>(url: string, config: FetchConfig = {}): Promise<T> {
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
  },

  async get<T = unknown>(url: string, config?: Omit<FetchConfig, 'method'>): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  },

  async post<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<FetchConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: 'POST', body });
  },

  async put<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<FetchConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PUT', body });
  },

  async delete<T = unknown>(url: string, config?: Omit<FetchConfig, 'method'>): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  },

  async patch<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<FetchConfig, 'method' | 'body'>,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PATCH', body });
  },
};
